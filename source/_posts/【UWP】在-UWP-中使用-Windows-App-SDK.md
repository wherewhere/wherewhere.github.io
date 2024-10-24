---
title: 【UWP】在 UWP 中使用 Windows App SDK
date: 2024-10-18 15:49:00
tags: [UWP, WAS, .NET, C#, 开发, 教程]
categories: 开发
---
众所周知，WAS (Windows App SDK，俗称 WinUI3)在刚开始是支持 UWP 的，甚至最早[只支持 UWP](https://blogs.windows.com/windowsdeveloper/2020/05/19/introducing-winui-3-preview-1 'Introducing WinUI 3 Preview 1')，但是微软在正式版发布前删除了对 UWP 的支持，不过真的删除了吗？[初生之鸟](https://x.com/driver1998 '@driver1998')在[2023年10月发现](https://x.com/driver1998/status/1716388306144137260)在 VS 调试下无视报错继续运行可以正常在 UWP 加载 WAS。随着 WAS 的开源，WAS 阻止在 UWP 上运行的原因也被找到，至此大家终于找到在 UWP 上使用 WAS 的方法了。

WAS 阻止在 UWP 上运行的方法很简单，就是检查注册表`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WinUI\Xaml\EnableUWPWindow`是否为`00000001`，如果不是就直接报错。

<details open>
<summary><a href="https://github.com/microsoft/microsoft-ui-xaml/blob/main/src/dxaml/xcp/dxaml/lib/Window_Partial.cpp#L80-L114" target="_blank" rel="noopener nofollow">Window_Partial.cpp#L80-L114</a></summary>

```cpp
// ----------------------------------------------------------------------
//                               IWindow
// ----------------------------------------------------------------------
Window::Window()
{
    // The first window created internally by DXamlCore _must_ be a UWP Window.  DXamlCore
    // requires and controls the lifetime of a hidden UWP Microsoft.UI.Xaml.Window.
    // note that this Window instance will be the 'real' window for UWP instances, but
    // serves as a dummy for all other instances. dummy behavior is deprecated and being removed.
    auto dxamlCore = DXamlCore::GetCurrent();
    Window* window = dxamlCore->GetDummyWindowNoRef();
 
    if (!window)
    {
        // Do a runtime check to see if UWP should be enabled
        static auto runtimeEnabledFeatureDetector = RuntimeFeatureBehavior::GetRuntimeEnabledFeatureDetector();
        auto UWPWindowEnabled = runtimeEnabledFeatureDetector->IsFeatureEnabled(RuntimeEnabledFeature::EnableUWPWindow);
 
        // WinUI UWP
        if (!UWPWindowEnabled && DXamlCore::GetCurrent()->GetHandle()->GetInitializationType() != InitializationType::IslandsOnly)
        {
            ::RoOriginateError(
                E_NOT_SUPPORTED,
                wrl_wrappers::HStringReference(
                L"WinUI: Error creating an UWP Window. Creating an UWP window is not allowed."
                ).Get());
            XAML_FAIL_FAST();
        }
        m_spWindowImpl = std::make_shared<UWPWindowImpl>(this);
    }
    else
    {
        m_spWindowImpl = std::make_shared<DesktopWindowImpl>(this);
    }
}
```

</details>
<!--more-->
<details open>
<summary><a href="https://github.com/microsoft/microsoft-ui-xaml/blob/main/src/dxaml/xcp/dxaml/lib/Window_Partial.cpp#L80-L114" target="_blank" rel="noopener nofollow">Window_Partial.cpp#L80-L114</a></summary>

```cpp
{ L"EnableUWPWindow", RuntimeEnabledFeature::EnableUWPWindow, false, 0, 0 }
```

</details>

所以我们只需要修改注册表就行了。

```ini
Windows Registry Editor Version 5.00
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WinUI\Xaml]
"EnableUWPWindow"=dword:00000001
```

但是到处修改注册表并不是一个好主意，于是[初生之鸟](https://github.com/driver1998 '@driver1998')便提出利用`Detours`来劫持读取注册表的方法：[HookCoreAppWinUI](https://github.com/driver1998/HookCoreAppWinUI 'HookCoreAppWinUI')。

我们将其翻译成 C#，再加一些小修改，便能得出如下内容：

```cs
#r "nuget:Detours.Win32Metadata"
#r "nuget:Microsoft.Windows.CsWin32"
 
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using Windows.Win32;
using Windows.Win32.Foundation;
using Windows.Win32.System.Registry;
using Detours = Microsoft.Detours.PInvoke;
 
/// <summary>
/// Represents a hook for getting the value of the <c>HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WinUI\Xaml\EnableUWPWindow</c> registry key always returning <see langword="00000001"/>.
/// </summary>
public partial class HookRegistry : IDisposable
{
    /// <summary>
    /// The value that indicates whether the class has been disposed.
    /// </summary>
    private bool disposed;
 
    /// <summary>
    /// The reference count for the hook.
    /// </summary>
    private static int refCount;
 
    /// <summary>
    /// The dictionary that maps the <see cref="HKEY"/> to a value that indicates whether the key is a real key.
    /// </summary>
    private static readonly Dictionary<HKEY, bool> xamlKeyMap = [];
 
    /// <summary>
    /// The object used to synchronize access to the <see cref="xamlKeyMap"/> dictionary.
    /// </summary>
    private static readonly object locker = new();
 
    /// <remarks>The original <see cref="PInvoke.RegOpenKeyEx(HKEY, PCWSTR, uint, REG_SAM_FLAGS, HKEY*)"/> function.</remarks>
    /// <inheritdoc cref="PInvoke.RegOpenKeyEx(HKEY, PCWSTR, uint, REG_SAM_FLAGS, HKEY*)"/>
    private static unsafe delegate* unmanaged[Stdcall]<HKEY, PCWSTR, uint, REG_SAM_FLAGS, HKEY*, WIN32_ERROR> RegOpenKeyExW;
 
    /// <remarks>The original <see cref="PInvoke.RegCloseKey(HKEY)"/> function.</remarks>
    /// <inheritdoc cref="PInvoke.RegCloseKey(HKEY)"/>
    private static unsafe delegate* unmanaged[Stdcall]<HKEY, WIN32_ERROR> RegCloseKey;
 
    /// <remarks>The original <see cref="PInvoke.RegQueryValueEx(HKEY, PCWSTR, uint*, REG_VALUE_TYPE*, byte*, uint*)"/> function.</remarks>
    /// <inheritdoc cref="PInvoke.RegQueryValueEx(HKEY, PCWSTR, uint*, REG_VALUE_TYPE*, byte*, uint*)"/>
    private static unsafe delegate* unmanaged[Stdcall]<HKEY, PCWSTR, uint*, REG_VALUE_TYPE*, byte*, uint*, WIN32_ERROR> RegQueryValueExW;
 
    /// <summary>
    /// Initializes a new instance of the <see cref="HookRegistry"/> class.
    /// </summary>
    public HookRegistry()
    {
        refCount++;
        StartHook();
    }
 
    /// <summary>
    /// Finalizes this instance of the <see cref="HookRegistry"/> class.
    /// </summary>
    ~HookRegistry()
    {
        Dispose();
    }
 
    /// <summary>
    /// Gets the value that indicates whether the hook is active.
    /// </summary>
    public static bool IsHooked { get; private set; }
 
    /// <summary>
    /// Starts the hook for the <see cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/> function.
    /// </summary>
    private static unsafe void StartHook()
    {
        if (!IsHooked)
        {
            using FreeLibrarySafeHandle library = PInvoke.GetModuleHandle("ADVAPI32.dll");
            if (!library.IsInvalid
                && NativeLibrary.TryGetExport(library.DangerousGetHandle(), "RegOpenKeyExW", out nint regOpenKeyExW)
                && NativeLibrary.TryGetExport(library.DangerousGetHandle(), nameof(PInvoke.RegCloseKey), out nint regCloseKey)
                && NativeLibrary.TryGetExport(library.DangerousGetHandle(), "RegQueryValueExW", out nint regQueryValueExW))
            {
                void* regOpenKeyExWPtr = (void*)regOpenKeyExW;
                void* regCloseKeyPtr = (void*)regCloseKey;
                void* regQueryValueExWPtr = (void*)regQueryValueExW;
 
                delegate* unmanaged[Stdcall]<HKEY, PCWSTR, uint, REG_SAM_FLAGS, HKEY*, WIN32_ERROR> overrideRegOpenKeyExW = &OverrideRegOpenKeyExW;
                delegate* unmanaged[Stdcall]<HKEY, WIN32_ERROR> overrideRegCloseKey = &OverrideRegCloseKey;
                delegate* unmanaged[Stdcall]<HKEY, PCWSTR, uint*, REG_VALUE_TYPE*, byte*, uint*, WIN32_ERROR> overrideRegQueryValueExW = &OverrideRegQueryValueExW;
 
                _ = Detours.DetourRestoreAfterWith();
 
                _ = Detours.DetourTransactionBegin();
                _ = Detours.DetourUpdateThread(PInvoke.GetCurrentThread());
                _ = Detours.DetourAttach(ref regOpenKeyExWPtr, overrideRegOpenKeyExW);
                _ = Detours.DetourAttach(ref regCloseKeyPtr, overrideRegCloseKey);
                _ = Detours.DetourAttach(ref regQueryValueExWPtr, overrideRegQueryValueExW);
                _ = Detours.DetourTransactionCommit();
 
                RegOpenKeyExW = (delegate* unmanaged[Stdcall]<HKEY, PCWSTR, uint, REG_SAM_FLAGS, HKEY*, WIN32_ERROR>)regOpenKeyExWPtr;
                RegCloseKey = (delegate* unmanaged[Stdcall]<HKEY, WIN32_ERROR>)regCloseKeyPtr;
                RegQueryValueExW = (delegate* unmanaged[Stdcall]<HKEY, PCWSTR, uint*, REG_VALUE_TYPE*, byte*, uint*, WIN32_ERROR>)regQueryValueExWPtr;
 
                IsHooked = true;
            }
        }
    }
 
    /// <summary>
    /// Ends the hook for the <see cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/> function.
    /// </summary>
    public static unsafe void EndHook()
    {
        if (--refCount == 0 && IsHooked)
        {
            void* regOpenKeyExWPtr = RegOpenKeyExW;
            void* regCloseKeyPtr = RegCloseKey;
            void* regQueryValueExWPtr = RegQueryValueExW;
 
            delegate* unmanaged[Stdcall]<HKEY, PCWSTR, uint, REG_SAM_FLAGS, HKEY*, WIN32_ERROR> overrideRegOpenKeyExW = &OverrideRegOpenKeyExW;
            delegate* unmanaged[Stdcall]<HKEY, WIN32_ERROR> overrideRegCloseKey = &OverrideRegCloseKey;
            delegate* unmanaged[Stdcall]<HKEY, PCWSTR, uint*, REG_VALUE_TYPE*, byte*, uint*, WIN32_ERROR> overrideRegQueryValueExW = &OverrideRegQueryValueExW;
 
            _ = Detours.DetourTransactionBegin();
            _ = Detours.DetourUpdateThread(PInvoke.GetCurrentThread());
            _ = Detours.DetourDetach(&regOpenKeyExWPtr, overrideRegOpenKeyExW);
            _ = Detours.DetourDetach(&regCloseKeyPtr, overrideRegCloseKey);
            _ = Detours.DetourDetach(&regQueryValueExWPtr, overrideRegQueryValueExW);
            _ = Detours.DetourTransactionCommit();
 
            RegOpenKeyExW = null;
            RegCloseKey = null;
            RegQueryValueExW = null;
 
            IsHooked = false;
        }
    }
 
    /// <remarks>The overridden <see cref="PInvoke.RegOpenKeyEx(HKEY, PCWSTR, uint, REG_SAM_FLAGS, HKEY*)"/> function.</remarks>
    /// <inheritdoc cref="PInvoke.RegOpenKeyEx(HKEY, PCWSTR, uint, REG_SAM_FLAGS, HKEY*)"/>
    [UnmanagedCallersOnly(CallConvs = [typeof(CallConvStdcall)])]
    private static unsafe WIN32_ERROR OverrideRegOpenKeyExW(HKEY hKey, PCWSTR lpSubKey, uint ulOptions, REG_SAM_FLAGS samDesired, HKEY* phkResult)
    {
        WIN32_ERROR result = RegOpenKeyExW(hKey, lpSubKey, ulOptions, samDesired, phkResult);
        if (hKey == HKEY.HKEY_LOCAL_MACHINE && lpSubKey.ToString().Equals(@"Software\Microsoft\WinUI\Xaml", StringComparison.OrdinalIgnoreCase))
        {
            if (result == WIN32_ERROR.ERROR_FILE_NOT_FOUND)
            {
                HKEY key = new(HANDLE.INVALID_HANDLE_VALUE);
                xamlKeyMap[key] = false;
                *phkResult = key;
                result = WIN32_ERROR.ERROR_SUCCESS;
            }
            else if (result == WIN32_ERROR.ERROR_SUCCESS)
            {
                xamlKeyMap[*phkResult] = true;
            }
        }
        return result;
    }
 
    /// <remarks>The overridden <see cref="PInvoke.RegCloseKey(HKEY)"/> function.</remarks>
    /// <inheritdoc cref="PInvoke.RegCloseKey(HKEY)"/>
    [UnmanagedCallersOnly(CallConvs = [typeof(CallConvStdcall)])]
    private static unsafe WIN32_ERROR OverrideRegCloseKey(HKEY hKey)
    {
        bool isXamlKey;
        lock (locker)
        {
            if (isXamlKey = xamlKeyMap.TryGetValue(hKey, out bool isRealKey))
            {
                xamlKeyMap.Remove(hKey);
            }
            return isXamlKey
                ? isRealKey
                    ? RegCloseKey(hKey) // real key
                    : WIN32_ERROR.ERROR_SUCCESS // simulated key
                : hKey == HANDLE.INVALID_HANDLE_VALUE
                    ? WIN32_ERROR.ERROR_INVALID_HANDLE
                    : RegCloseKey(hKey);
        }
    }
 
    /// <remarks>The overridden <see cref="PInvoke.RegQueryValueEx(HKEY, PCWSTR, uint*, REG_VALUE_TYPE*, byte*, uint*)"/> function.</remarks>
    /// <inheritdoc cref="PInvoke.RegQueryValueEx(HKEY, PCWSTR, uint*, REG_VALUE_TYPE*, byte*, uint*)"/>
    [UnmanagedCallersOnly(CallConvs = [typeof(CallConvStdcall)])]
    private static unsafe WIN32_ERROR OverrideRegQueryValueExW(HKEY hKey, PCWSTR lpValueName, [Optional] uint* lpReserved, [Optional] REG_VALUE_TYPE* lpType, [Optional] byte* lpData, [Optional] uint* lpcbData)
    {
        if (lpValueName.Value != default && lpValueName.ToString().Equals("EnableUWPWindow", StringComparison.OrdinalIgnoreCase))
        {
            lock (locker)
            {
                if (xamlKeyMap.TryGetValue(hKey, out bool isRealKey))
                {
                    WIN32_ERROR result;
                    if (isRealKey)
                    {
                        // real key
                        result = RegQueryValueExW(hKey, lpValueName, lpReserved, lpType, lpData, lpcbData);
                        if (result == WIN32_ERROR.ERROR_SUCCESS && lpData != default)
                        {
                            *lpData = 1;
                        }
                        else if (result == WIN32_ERROR.ERROR_FILE_NOT_FOUND)
                        {
                            if (lpData == default && lpcbData != default)
                            {
                                *lpcbData = sizeof(int);
                                result = WIN32_ERROR.ERROR_SUCCESS;
                            }
                            else if (lpData != default && lpcbData != default)
                            {
                                if (*lpcbData >= sizeof(int))
                                {
                                    *lpData = 1;
                                    result = WIN32_ERROR.ERROR_SUCCESS;
                                }
                                else
                                {
                                    result = WIN32_ERROR.ERROR_MORE_DATA;
                                }
                            }
                        }
                    }
                    else
                    {
                        // simulated key
                        result = WIN32_ERROR.ERROR_FILE_NOT_FOUND;
                        if (lpData == default && lpcbData != default)
                        {
                            *lpcbData = sizeof(int);
                            result = WIN32_ERROR.ERROR_SUCCESS;
                        }
                        else if (lpData != default && lpcbData != default)
                        {
                            if (*lpcbData >= sizeof(int))
                            {
                                *lpData = 1;
                                result = WIN32_ERROR.ERROR_SUCCESS;
                            }
                            else
                            {
                                result = WIN32_ERROR.ERROR_MORE_DATA;
                            }
                        }
                    }
                    return result;
                }
            }
        }
        return RegQueryValueExW(hKey, lpValueName, lpReserved, lpType, lpData, lpcbData);
    }
 
    /// <inheritdoc/>
    public void Dispose()
    {
        if (!disposed && IsHooked)
        {
            EndHook();
        }
        GC.SuppressFinalize(this);
        disposed = true;
    }
}
```

随后我们只需要在入口点创建`App`时进行劫持就行了。

```cs
private static bool IsSupportCoreWindow
{
    get
    {
        try
        {
            RegistryKey registryKey = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\WinUI\Xaml");
            return registryKey?.GetValue("EnableUWPWindow") is > 0;
        }
        catch
        {
            return false;
        }
    }
}
 
private static void Main()
{
    ComWrappersSupport.InitializeComWrappers();
    HookRegistry hookRegistry = null;
    try
    {
        if (!IsSupportCoreWindow)
        {
            hookRegistry = new HookRegistry();
        }
        XamlCheckProcessRequirements();
        Application.Start(p =>
        {
            DispatcherQueueSynchronizationContext context = new(DispatcherQueue.GetForCurrentThread());
            SynchronizationContext.SetSynchronizationContext(context);
            _ = new App();
        });
    }
    finally
    {
        hookRegistry?.Dispose();
    }
}
```

当然想要自定义入口函数，我们需要在`csproj`加上定义。

```xml
<DefineConstants>$(DefineConstants);DISABLE_XAML_GENERATED_MAIN</DefineConstants>
```

同时还要记得在清单中明确入口点。

```xml
<?xml version="1.0" encoding="utf-8"?>
<Package ...>
  ...
  <Applications>
    <Application ...
      EntryPoint="明确的入口点">
      ...
    </Application>
  </Applications>
  ...
</Package>
```

随后我们就可以正常的使用 UWP/WAS 了。

最后附上示例应用：https://github.com/wherewhere/CoreAppUWP/tree/muxc

> [【UWP】在 UWP 中使用 Windows App SDK](https://www.cnblogs.com/wherewhere/p/18447226) 作者 [@where-where](https://home.cnblogs.com/u/wherewhere) 2024年10月8日 发表于 [博客园](https://home.cnblogs.com "CNBlogs")，转载请注明出处
