---
title: 【UWP】让 UWP 自己托管自己 —— Windows App SDK 篇
date: 2024-11-03 16:10:00
updated: 2025-01-17 16:08:00
tags: [UWP, WAS, .NET, C#, XAML岛, 开发, 教程]
categories: 开发
---
众所周知，UWP 使用的窗口模型是 CoreWindow，但是 UWP 本身只是一个应用模型，所以完全可以创建 win32 窗口，那么我们可以不可以创建一个 win32 窗口，然后像 XAML 岛 (XAML Islands) 一样把 XAML 托管上去呢？本篇将讲述如何利用 WAS (Windows App SDK，俗称 WinUI3) 在 UWP 创建一个 XAML 岛窗口。

![示例](https://github.com/user-attachments/assets/a47b9647-37fe-4301-b27a-bc681aab4f93)

演示视频：https://x.com/wherewhere7/status/1721570411388039587

由于 WAS 在 win32 应用模型下本身就是个 XAML 岛，所以 WAS 对 XAML 岛的支持要比 WUXC (Windows.UI.Xaml.Controls) 要好多了，接下来的内容大多是将 WAS 中实现窗口的方法迁移到 C#。

首先，不管是 WUXC 还是 WAS 的 XAML 岛都会判断当前的应用模型是否为`ClassicDesktop`，所以我们需要利用Detours劫持`AppPolicyGetWindowingModel`方法。具体内容如下：<!--more-->

```cs
#r "nuget:Detours.Win32Metadata"
#r "nuget:Microsoft.Windows.CsWin32"

using System;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using Windows.Win32;
using Windows.Win32.Foundation;
using Windows.Win32.Storage.Packaging.Appx;
using Detours = Microsoft.Detours.PInvoke;

/// <summary>
/// Represents a hook for the <see cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/> function.
/// </summary>
public sealed partial class HookWindowingModel : IDisposable
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
    /// The value that represents the current process token.
    /// </summary>
    private const int currentProcessToken = -6;

    /// <remarks>The original <see cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/> function.</remarks>
    /// <inheritdoc cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/>
    private static unsafe delegate* unmanaged[Stdcall]<HANDLE, AppPolicyWindowingModel*, WIN32_ERROR> AppPolicyGetWindowingModel;

    /// <summary>
    /// Initializes a new instance of the <see cref="HookWindowingModel"/> class.
    /// </summary>
    public HookWindowingModel()
    {
        refCount++;
        StartHook();
    }

    /// <summary>
    /// Finalizes this instance of the <see cref="HookWindowingModel"/> class.
    /// </summary>
    ~HookWindowingModel()
    {
        Dispose();
    }

    /// <summary>
    /// Gets the value that indicates whether the hook is active.
    /// </summary>
    public static bool IsHooked { get; private set; }

    /// <summary>
    /// Gets or sets the windowing model to use when the hooked <see cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/> function is called.
    /// </summary>
    internal static AppPolicyWindowingModel WindowingModel { get; set; } = AppPolicyWindowingModel.AppPolicyWindowingModel_ClassicDesktop;

    /// <summary>
    /// Starts the hook for the <see cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/> function.
    /// </summary>
    private static unsafe void StartHook()
    {
        if (!IsHooked)
        {
            using FreeLibrarySafeHandle library = PInvoke.GetModuleHandle("KERNEL32.dll");
            if (!library.IsInvalid && NativeLibrary.TryGetExport(library.DangerousGetHandle(), nameof(PInvoke.AppPolicyGetWindowingModel), out nint appPolicyGetWindowingModel))
            {
                void* appPolicyGetWindowingModelPtr = (void*)appPolicyGetWindowingModel;
                delegate* unmanaged[Stdcall]<HANDLE, AppPolicyWindowingModel*, WIN32_ERROR> overrideAppPolicyGetWindowingModel = &OverrideAppPolicyGetWindowingModel;

                _ = Detours.DetourRestoreAfterWith();

                _ = Detours.DetourTransactionBegin();
                _ = Detours.DetourUpdateThread(PInvoke.GetCurrentThread());
                _ = Detours.DetourAttach(ref appPolicyGetWindowingModelPtr, overrideAppPolicyGetWindowingModel);
                _ = Detours.DetourTransactionCommit();

                AppPolicyGetWindowingModel = (delegate* unmanaged[Stdcall]<HANDLE, AppPolicyWindowingModel*, WIN32_ERROR>)appPolicyGetWindowingModelPtr;
                IsHooked = true;
            }
        }
    }

    /// <summary>
    /// Ends the hook for the <see cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/> function.
    /// </summary>
    private static unsafe void EndHook()
    {
        if (--refCount == 0 && IsHooked)
        {
            void* appPolicyGetWindowingModelPtr = AppPolicyGetWindowingModel;
            delegate* unmanaged[Stdcall]<HANDLE, AppPolicyWindowingModel*, WIN32_ERROR> overrideAppPolicyGetWindowingModel = &OverrideAppPolicyGetWindowingModel;

            _ = Detours.DetourTransactionBegin();
            _ = Detours.DetourUpdateThread(PInvoke.GetCurrentThread());
            _ = Detours.DetourDetach(&appPolicyGetWindowingModelPtr, overrideAppPolicyGetWindowingModel);
            _ = Detours.DetourTransactionCommit();

            AppPolicyGetWindowingModel = null;
            IsHooked = false;
        }
    }

    /// <param name="policy">A pointer to a variable of the <a href="https://docs.microsoft.com/windows/win32/api/appmodel/ne-appmodel-apppolicywindowingmodel">AppPolicyWindowingModel</a> enumerated type.
    /// When the function returns successfully, the variable contains the <see cref="WindowingModel"/> when the identified process is current; otherwise, the windowing model of the identified process.</param>
    /// <remarks>The overridden <see cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/> function.</remarks>
    /// <inheritdoc cref="PInvoke.AppPolicyGetWindowingModel(HANDLE, AppPolicyWindowingModel*)"/>
    [UnmanagedCallersOnly(CallConvs = [typeof(CallConvStdcall)])]
    private static unsafe WIN32_ERROR OverrideAppPolicyGetWindowingModel(HANDLE processToken, AppPolicyWindowingModel* policy)
    {
        if ((int)processToken.Value == currentProcessToken)
        {
            *policy = WindowingModel;
            return WIN32_ERROR.ERROR_SUCCESS;
        }
        return AppPolicyGetWindowingModel(processToken, policy);
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

准备工作完成，接下来我们就可以创建窗口了，如果顺利的话我们只需要`new Microsoft.UI.Xaml.Window()`就行了，但是很遗憾，经过测试在 UWP 并不能正常初始化这个类，有可能是我使用的方法不太正确，或许以后可能能找到正常使用的办法，不过现在我们只能去手动创建一个 Win32 窗口了。

首先我们需要新创建一个线程，CoreWindow 线程无法新建 XAML 岛，不过在 XAML 岛线程可以，新建线程只需要用`Thread`就行了。

```cs
new Thread(() => { ... });
```

WAS 提供了`AppWindow`来管理 win32 窗口，我们只需要使用它创建一个窗口就行了。

```cs
AppWindow window = AppWindow.Create();
```

接下来我们需要创建 XAML 岛，这时我们就需要利用上面劫持器来劫持获取应用模型的方法了

```cs
DispatcherQueueController controller;
DesktopWindowXamlSource source;

using (HookWindowingModel hook = new())
{
    controller = DispatcherQueueController.CreateOnCurrentThread();
    source = new DesktopWindowXamlSource();
}
```

然后我们就可以把 XAML 岛糊到之前创建的 AppWindow 上了。

```cs
source.Initialize(window.Id);
DesktopChildSiteBridge bridge = source.SiteBridge;
bridge.ResizePolicy = ContentSizePolicy.ResizeContentToParentWindow;
bridge.Show();

DispatcherQueue dispatcherQueue = controller.DispatcherQueue;
window.AssociateWithDispatcherQueue(dispatcherQueue);
```

由于 XAML 岛存在的一些特性，当窗口扩展标题栏或者全屏化的时候窗口内容并不会跟着变化，所以我们需要一些小魔法来让它在变化时调整大小。

```cs
window.Changed += (sender, args) =>
{
    if (args.DidPresenterChange)
    {
        bridge.ResizePolicy = ContentSizePolicy.None;
        bridge.ResizePolicy = ContentSizePolicy.ResizeContentToParentWindow;
    }
};
```

最后不要忘了保持当前线程，不然这里跑完了窗口就退出了。

```cs
dispatcherQueue.RunEventLoop();
await controller.ShutdownQueueAsync();
```

当窗口关闭后记得执行`DispatcherQueue.EnqueueEventLoopExit()`来释放保持的线程。

最后把之前的东西组合起来，再加点东西：

```cs
/// <summary>
/// Create a new <see cref="DesktopWindow"/> instance.
/// </summary>
/// <param name="launched">Do something after <see cref="DesktopWindowXamlSource"/> created.</param>
/// <returns>The new instance of <see cref="DesktopWindow"/>.</returns>
public static Task<DesktopWindow> CreateAsync(Action<DesktopWindowXamlSource> launched)
{
    TaskCompletionSource<DesktopWindow> taskCompletionSource = new();

    new Thread(async () =>
    {
        try
        {
            DispatcherQueueController controller;
            DesktopWindowXamlSource source;
            AppWindow window = AppWindow.Create();

            using (HookWindowingModel hook = new())
            {
                controller = DispatcherQueueController.CreateOnCurrentThread();
                source = new DesktopWindowXamlSource();
            }

            source.Initialize(window.Id);
            DesktopChildSiteBridge bridge = source.SiteBridge;
            bridge.ResizePolicy = ContentSizePolicy.ResizeContentToParentWindow;
            bridge.Show();

            window.Changed += (sender, args) =>
            {
                if (args.DidPresenterChange)
                {
                    bridge.ResizePolicy = ContentSizePolicy.None;
                    bridge.ResizePolicy = ContentSizePolicy.ResizeContentToParentWindow;
                }
            };

            DispatcherQueue dispatcherQueue = controller.DispatcherQueue;
            window.AssociateWithDispatcherQueue(dispatcherQueue);
            TrackWindow(window);

            launched(source);
            DesktopWindow desktopWindow = new()
            {
                AppWindow = window,
                WindowXamlSource = source
            };
            taskCompletionSource.SetResult(desktopWindow);

            dispatcherQueue.RunEventLoop();
            await controller.ShutdownQueueAsync();
        }
        catch (Exception e)
        {
            taskCompletionSource.SetException(e);
        }
    })
    {
        Name = nameof(DesktopWindowXamlSource)
    }.Start();

    return taskCompletionSource.Task;
}

/// <summary>
/// Create a new <see cref="DesktopWindow"/> instance.
/// </summary>
/// <param name="dispatcherQueue">The <see cref="DispatcherQueue"/> to provide thread.</param>
/// <param name="launched">Do something after <see cref="DesktopWindowXamlSource"/> created.</param>
/// <returns>The new instance of <see cref="DesktopWindow"/>.</returns>
public static Task<DesktopWindow> CreateAsync(DispatcherQueue dispatcherQueue, Action<DesktopWindowXamlSource> launched)
{
    TaskCompletionSource<DesktopWindow> taskCompletionSource = new();

    _ = dispatcherQueue.TryEnqueue(() =>
    {
        try
        {
            DesktopWindowXamlSource source;
            AppWindow window = AppWindow.Create();
            window.AssociateWithDispatcherQueue(dispatcherQueue);
            TrackWindow(window);

            using (HookWindowingModel hook = new())
            {
                source = new DesktopWindowXamlSource();
            }

            source.Initialize(window.Id);
            DesktopChildSiteBridge bridge = source.SiteBridge;
            bridge.ResizePolicy = ContentSizePolicy.ResizeContentToParentWindow;
            bridge.Show();

            window.Changed += (sender, args) =>
            {
                if (args.DidPresenterChange)
                {
                    bridge.ResizePolicy = ContentSizePolicy.None;
                    bridge.ResizePolicy = ContentSizePolicy.ResizeContentToParentWindow;
                }
            };

            launched(source);
            DesktopWindow desktopWindow = new()
            {
                AppWindow = window,
                WindowXamlSource = source
            };
            taskCompletionSource.SetResult(desktopWindow);
        }
        catch (Exception e)
        {
            taskCompletionSource.SetException(e);
        }
    });

    return taskCompletionSource.Task;
}

private static void TrackWindow(AppWindow window)
{
    if (ActiveDesktopWindows.ContainsKey(window.DispatcherQueue))
    {
        ActiveDesktopWindows[window.DispatcherQueue] += 1;
    }
    else
    {
        ActiveDesktopWindows[window.DispatcherQueue] = 1;
    }
    window.Destroying -= AppWindow_Destroying;
    window.Destroying += AppWindow_Destroying;
}

private static void AppWindow_Destroying(AppWindow sender, object args)
{
    if (ActiveDesktopWindows.TryGetValue(sender.DispatcherQueue, out ulong num))
    {
        num--;
        if (num == 0)
        {
            ActiveDesktopWindows.Remove(sender.DispatcherQueue);
            sender.DispatcherQueue.EnqueueEventLoopExit();
            return;
        }
        ActiveDesktopWindows[sender.DispatcherQueue] = num;
    }
}

private static Dictionary<DispatcherQueue, ulong> ActiveDesktopWindows { get; } = [];
```

其中`DesktopWindow`是用来存放`AppWindow`和`DesktopWindowXamlSource`的类，如果不嫌麻烦的话可以包裹成一个和`Microsoft.UI.Xaml.Window`一样的东西。

最后附上示例应用：https://github.com/wherewhere/CoreAppUWP/tree/muxc

WUXC 篇：[【UWP】让 UWP 自己托管自己 —— Windows SDK 篇](/2025/01/17/【UWP】让-UWP-自己托管自己-——-Windows-SDK-篇)

> [【UWP】让 UWP 自己托管自己 —— Windows App SDK 篇](https://www.cnblogs.com/wherewhere/p/18446822) 作者 [@where-where](https://home.cnblogs.com/u/wherewhere) 2024年11月3日 发表于 [博客园](https://home.cnblogs.com "CNBlogs")，转载请注明出处
