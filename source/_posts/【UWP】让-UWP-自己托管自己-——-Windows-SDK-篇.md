---
title: 【UWP】让 UWP 自己托管自己 —— Windows SDK 篇
date: 2025-01-17 16:06:00
updated: 2025-01-30 15:52:00
tags: [UWP, .NET, C#, XAML岛, 开发, 教程]
categories: 开发
---
众所周知，UWP 使用的窗口模型是 CoreWindow，但是 UWP 本身只是一个应用模型，所以完全可以创建 win32 窗口，那么我们可以不可以创建一个 win32 窗口，然后像 XAML 岛 (XAML Islands) 一样把 XAML 托管上去呢？本篇将讲述如何在 UWP 创建一个 XAML 岛窗口。

![示例](https://github.com/user-attachments/assets/ecffb39b-e268-4530-b2ca-d01bccad04a7)

首先，XAML 岛会判断当前的应用模型是否为`ClassicDesktop`，所以我们需要利用`Detours`劫持`AppPolicyGetWindowingModel`方法。具体内容如下：<!--more-->

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

准备工作完成，接下来我们就可以创建窗口了，首先我们需要新创建一个线程，CoreWindow 线程无法新建 XAML 岛，新建线程只需要用`Thread`就行了。

```cs
new Thread(() => { ... });
```

首先我们需要创建 XAML 岛，这时我们就需要利用上面劫持器来劫持获取应用模型的方法了。

```cs
DesktopWindowXamlSource source;
using (HookWindowingModel hook = new())
{
    source = new DesktopWindowXamlSource();
}
```

微软并没有单独提供一个 Win32 窗口管理的轮子，如果引用 Windows Forms 就太臃肿了，于是我们需要手动制作一个 Window 类：

由于 C#/Win32 不支持源生成 COM 以支持 AOT，所以我们需要手写`IDesktopWindowXamlSourceNative`定义：

```cs
namespace Windows.Win32.System.WinRT.Xaml
{
    [GeneratedComInterface]
    [Guid("3CBCF1BF-2F76-4E9C-96AB-E84B37972554")]
    internal partial interface IDesktopWindowXamlSourceNative
    {
        /// <summary>
        /// Attaches the current **IDesktopWindowXamlSourceNative** instance to a parent UI element in your desktop app that is associated with a window handle.
        /// </summary>
        /// <param name="parentWnd">
        /// <para>Type: **HWND** The window handle of the parent UI element in which you want to host a WinRT XAML control.</para>
        /// <para><see href="https://learn.microsoft.com/windows/win32/api/windows.ui.xaml.hosting.desktopwindowxamlsource/nf-windows-ui-xaml-hosting-desktopwindowxamlsource-idesktopwindowxamlsourcenative-attachtowindow#parameters">Read more on docs.microsoft.com</see>.</para>
        /// </param>
        /// <returns>If this method succeeds, it returns S_OK. Otherwise, it returns an **HRESULT** error code.</returns>
        /// <remarks>
        /// <para>For a code example that demonstrates how to use this method, see [XamlBridge.cpp](https://github.com/microsoft/Xaml-Islands-Samples/blob/master/Samples/Win32/SampleCppApp/XamlBridge.cpp) in the SampleCppApp sample in the XAML Island samples repo. > [!IMPORTANT] > Make sure that your code calls the **AttachToWindow** method only once per [DesktopWindowXamlSource](/uwp/api/windows.ui.xaml.hosting.desktopwindowxamlsource) object. Calling this method more than once for a **DesktopWindowXamlSource** object could result in a memory leak.</para>
        /// <para><see href="https://learn.microsoft.com/windows/win32/api/windows.ui.xaml.hosting.desktopwindowxamlsource/nf-windows-ui-xaml-hosting-desktopwindowxamlsource-idesktopwindowxamlsourcenative-attachtowindow#">Read more on docs.microsoft.com</see>.</para>
        /// </remarks>
        [PreserveSig]
        [return: MarshalAs(UnmanagedType.Error)]
        int AttachToWindow(nint parentWnd);

        /// <summary>
        /// Gets the window handle of the parent UI element that is associated with the current IDesktopWindowXamlSourceNative instance.
        /// </summary>
        /// <returns>If this method succeeds, it returns S_OK. Otherwise, it returns an **HRESULT** error code.</returns>
        [PreserveSig]
        [return: MarshalAs(UnmanagedType.Error)]
        int get_WindowHandle(out nint hWnd);
    }

    file static class Extensions
    {
        /// <summary>
        /// Gets the window handle of the parent UI element that is associated with the current IDesktopWindowXamlSourceNative instance.
        /// </summary>
        public static HWND WindowHandle(this IDesktopWindowXamlSourceNative source)
        {
            _ = source.get_WindowHandle(out nint hWnd);
            return new HWND(hWnd);
        }
    }
}
```

然后就可以制作 Window 类了：

```cs
/// <summary>
/// Represents a system-managed container for the content of an app.
/// </summary>
public partial class DesktopWindow
{
    private bool m_bIsClosed = false;
    private DesktopWindowXamlSource m_source;
    private IDesktopWindowXamlSourceNative m_native;

    private readonly HWND m_hwnd;
    private readonly WNDCLASSEXW m_wndClassEx;

    /// <summary>
    /// Initializes a new instance of the <see cref="DesktopWindow"/> class.
    /// </summary>
    public DesktopWindow()
    {
        m_wndClassEx = RegisterDesktopWindowClass(WNDPROC);
        m_hwnd = CreateDesktopWindow();
    }

    /// <summary>
    /// Gets the event dispatcher for the window.
    /// </summary>
    public CoreDispatcher Dispatcher { get; private set; }

    /// <summary>
    /// Gets the <see cref="DesktopWindowXamlSource"/> to provide XAML for this window.
    /// </summary>
    public DesktopWindowXamlSource WindowXamlSource
    {
        get => m_source;
        private init
        {
            if (m_source != value)
            {
                m_source = value;
                if (value != null)
                {
                    Dispatcher = CoreWindow.GetForCurrentThread().Dispatcher;
                    m_native = value.As<IDesktopWindowXamlSourceNative>();
                    m_native.AttachToWindow(m_hwnd);
                    ResizeWindowToDesktopWindowXamlSourceWindowDimensions();
                }
                else
                {
                    m_native = null;
                }
            }
        }
    }

    /// <summary>
    /// Shows the window and activates it.
    /// </summary>
    public void Show() => _ = PInvoke.ShowWindow(m_hwnd, SHOW_WINDOW_CMD.SW_NORMAL);

    private LRESULT WNDPROC(HWND hWnd, uint message, WPARAM wParam, LPARAM lParam)
    {
        switch (message)
        {
            case PInvoke.WM_PAINT:
                HDC hdc = PInvoke.BeginPaint(hWnd, out PAINTSTRUCT ps);
                _ = PInvoke.GetClientRect(hWnd, out RECT rect);
                _ = PInvoke.FillRect(hdc, rect, new DefaultSafeHandle(PInvoke.GetStockObject(GET_STOCK_OBJECT_FLAGS.WHITE_BRUSH)));
                _ = PInvoke.EndPaint(hWnd, ps);
                return new LRESULT();
            case PInvoke.WM_CLOSE when m_bIsClosed:
                goto default;
            case PInvoke.WM_CLOSE:
                m_bIsClosed = true;
                goto default;
            case PInvoke.WM_SIZE:
                ResizeWindowToDesktopWindowXamlSourceWindowDimensions();
                return new LRESULT();
            case PInvoke.WM_CREATE:
                return new LRESULT();
            case PInvoke.WM_DESTROY:
                PInvoke.PostQuitMessage(0);
                return new LRESULT();
            default:
                return PInvoke.DefWindowProc(hWnd, message, wParam, lParam);
        }
    }

    private void ResizeWindowToDesktopWindowXamlSourceWindowDimensions()
    {
        if (m_bIsClosed) return;
        _ = PInvoke.GetClientRect(m_hwnd, out RECT rect);
        _ = PInvoke.SetWindowPos(
            m_native.WindowHandle(),
            new HWND(),
            0, 0,
            rect.Width, rect.Height,
            SET_WINDOW_POS_FLAGS.SWP_NOACTIVATE | SET_WINDOW_POS_FLAGS.SWP_NOZORDER | SET_WINDOW_POS_FLAGS.SWP_SHOWWINDOW);
    }
}

public partial class DesktopWindow
{
    private static readonly unsafe HINSTANCE g_hInstance = new((void*)Process.GetCurrentProcess().Handle);

    // win32 window class name for top-level WinUI desktop windows
    private const string s_windowClassName = "WinUIDesktopWin32WindowClass";

    // Default window title for top-level WinUI desktop windows
    private const string s_defaultWindowTitle = "WinUI Desktop";

    private static unsafe WNDCLASSEXW RegisterDesktopWindowClass(WNDPROC lpfnWndProc)
    {
        if (!PInvoke.GetClassInfoEx(new DefaultSafeHandle(g_hInstance), s_windowClassName, out WNDCLASSEXW wndClassEx))
        {
            wndClassEx.cbSize = (uint)Marshal.SizeOf(wndClassEx);
            wndClassEx.style = WNDCLASS_STYLES.CS_HREDRAW | WNDCLASS_STYLES.CS_VREDRAW;
            wndClassEx.cbClsExtra = 0;
            wndClassEx.cbWndExtra = 0;
            wndClassEx.hCursor = PInvoke.LoadCursor(new HINSTANCE(), PInvoke.IDC_ARROW);
            wndClassEx.hbrBackground = (HBRUSH)((nint)SYS_COLOR_INDEX.COLOR_WINDOW + 1);
            wndClassEx.hInstance = g_hInstance;

            fixed (char* lps_windowClassName = s_windowClassName)
            {
                wndClassEx.lpszClassName = lps_windowClassName;
            }

            wndClassEx.lpfnWndProc = lpfnWndProc;
            _ = PInvoke.RegisterClassEx(wndClassEx);

            return wndClassEx;
        }
        return default;
    }

    private static unsafe HWND CreateDesktopWindow() =>
        PInvoke.CreateWindowEx(
            0,                                  // Extended Style
            s_windowClassName,                  // name of window class
            s_defaultWindowTitle,               // title-bar string
            WINDOW_STYLE.WS_OVERLAPPEDWINDOW | WINDOW_STYLE.WS_VISIBLE,  // top-level window
            int.MinValue,                       // default horizontal position
            (int)SHOW_WINDOW_CMD.SW_HIDE,       // If the y parameter is some other value,
                                                // then the window manager calls ShowWindow with that value as the nCmdShow parameter
            int.MinValue,                       // default width
            int.MinValue,                       // default height
            new HWND(),                         // no owner window
            null,                               // use class menu
            new DefaultSafeHandle(g_hInstance),
            null);

    private partial class DefaultSafeHandle(nint invalidHandleValue, bool ownsHandle) : SafeHandle(invalidHandleValue, ownsHandle)
    {
        public DefaultSafeHandle(nint handle) : this(handle, true) => SetHandle(handle);

        public override bool IsInvalid => handle != nint.Zero;

        protected override bool ReleaseHandle() => true;
    }
}
```

然后我们就可以初始化一个窗口了。

```cs
DesktopWindow window = new() { WindowXamlSource = source };
```

最后不要忘了用消息循环保持当前线程，不然这里跑完了窗口就退出了。

```cs
MSG msg = new();
while (msg.message != PInvoke.WM_QUIT)
{
    if (PInvoke.PeekMessage(out msg, new HWND(), 0, 0, PEEK_MESSAGE_REMOVE_TYPE.PM_REMOVE))
    {
        _ = PInvoke.DispatchMessage(msg);
    }
}
```

最后把之前的东西组合起来，再加点东西：

```cs
/// <summary>
/// Represents a system-managed container for the content of an app.
/// </summary>
public partial class DesktopWindow
{
    private bool m_bIsClosed = false;
    private DesktopWindowXamlSource m_source;
    private IDesktopWindowXamlSourceNative m_native;

    private readonly HWND m_hwnd;
    private readonly WNDCLASSEXW m_wndClassEx;

    /// <summary>
    /// Initializes a new instance of the <see cref="DesktopWindow"/> class.
    /// </summary>
    public DesktopWindow()
    {
        m_wndClassEx = RegisterDesktopWindowClass(WNDPROC);
        m_hwnd = CreateDesktopWindow();
    }

    /// <summary>
    /// Get the handle of the window.
    /// </summary>
    public nint Hwnd => m_hwnd;

    /// <summary>
    /// Gets the event dispatcher for the window.
    /// </summary>
    public CoreDispatcher Dispatcher { get; private set; }

    /// <summary>
    /// Gets or sets the visual root of an application window.
    /// </summary>
    public UIElement Content
    {
        get => WindowXamlSource.Content;
        set => WindowXamlSource.Content = value;
    }

    /// <summary>
    /// Gets or sets the XamlRoot in which this element is being viewed.
    /// </summary>
    [SupportedOSPlatform("Windows10.0.18362.0")]
    public XamlRoot XamlRoot
    {
        get => WindowXamlSource.Content.XamlRoot;
        set => WindowXamlSource.Content.XamlRoot = value;
    }

    /// <summary>
    /// Gets or sets a string used for the window title.
    /// </summary>
    public unsafe string Title
    {
        get
        {
            int windowTextLength = PInvoke.GetWindowTextLength(m_hwnd);
            char* windowText = stackalloc char[windowTextLength + 1];
            _ = PInvoke.GetWindowText(m_hwnd, windowText, windowTextLength + 1);
            return new string(windowText);
        }
        set => _ = PInvoke.SetWindowText(m_hwnd, value);
    }

    /// <summary>
    /// Gets the <see cref="DesktopWindowXamlSource"/> to provide XAML for this window.
    /// </summary>
    public DesktopWindowXamlSource WindowXamlSource
    {
        get => m_source;
        private init
        {
            if (m_source != value)
            {
                m_source = value;
                if (value != null)
                {
                    Dispatcher = CoreWindow.GetForCurrentThread().Dispatcher;
                    m_native = value.As<IDesktopWindowXamlSourceNative>();
                    m_native.AttachToWindow(m_hwnd);
                    ResizeWindowToDesktopWindowXamlSourceWindowDimensions();
                }
                else
                {
                    m_native = null;
                }
            }
        }
    }

    /// <summary>
    /// Occurs when the window has closed.
    /// </summary>
    public event TypedEventHandler<DesktopWindow, object> Closed;

    /// <summary>
    /// Shows the window and activates it.
    /// </summary>
    public void Show() => _ = PInvoke.ShowWindow(m_hwnd, SHOW_WINDOW_CMD.SW_NORMAL);

    /// <summary>
    /// Sets the icon for the window, using the specified icon path.
    /// </summary>
    /// <param name="iconPath">The path of the icon.</param>
    public unsafe void SetIcon(string iconPath)
    {
        fixed (char* ptr = iconPath)
        {
            HANDLE icon = PInvoke.LoadImage(new HINSTANCE(), ptr, GDI_IMAGE_TYPE.IMAGE_ICON, 0, 0, IMAGE_FLAGS.LR_LOADFROMFILE);
            _ = PInvoke.SendMessage(m_hwnd, PInvoke.WM_SETICON, PInvoke.ICON_BIG, new LPARAM((nint)icon.Value));
        }
    }

    private LRESULT WNDPROC(HWND hWnd, uint message, WPARAM wParam, LPARAM lParam)
    {
        switch (message)
        {
            case PInvoke.WM_PAINT:
                HDC hdc = PInvoke.BeginPaint(hWnd, out PAINTSTRUCT ps);
                _ = PInvoke.GetClientRect(hWnd, out RECT rect);
                _ = PInvoke.FillRect(hdc, rect, new DefaultSafeHandle(PInvoke.GetStockObject(GET_STOCK_OBJECT_FLAGS.WHITE_BRUSH)));
                _ = PInvoke.EndPaint(hWnd, ps);
                return new LRESULT();
            case PInvoke.WM_CLOSE when m_bIsClosed:
                goto default;
            case PInvoke.WM_CLOSE:
                m_bIsClosed = true;
                Closed?.Invoke(this, null);
                goto default;
            case PInvoke.WM_SIZE:
                ResizeWindowToDesktopWindowXamlSourceWindowDimensions();
                return new LRESULT();
            case PInvoke.WM_CREATE:
                return new LRESULT();
            case PInvoke.WM_DESTROY:
                PInvoke.PostQuitMessage(0);
                return new LRESULT();
            default:
                return PInvoke.DefWindowProc(hWnd, message, wParam, lParam);
        }
    }

    private void ResizeWindowToDesktopWindowXamlSourceWindowDimensions()
    {
        if (m_bIsClosed) return;
        _ = PInvoke.GetClientRect(m_hwnd, out RECT rect);
        _ = PInvoke.SetWindowPos(
            m_native.WindowHandle(),
            new HWND(),
            0, 0,
            rect.Width, rect.Height,
            SET_WINDOW_POS_FLAGS.SWP_NOACTIVATE | SET_WINDOW_POS_FLAGS.SWP_NOZORDER | SET_WINDOW_POS_FLAGS.SWP_SHOWWINDOW);
    }
}

public partial class DesktopWindow
{
    private static readonly unsafe HINSTANCE g_hInstance = new((void*)Process.GetCurrentProcess().Handle);

    // win32 window class name for top-level WinUI desktop windows
    private const string s_windowClassName = "WinUIDesktopWin32WindowClass";

    // Default window title for top-level WinUI desktop windows
    private const string s_defaultWindowTitle = "WinUI Desktop";

    private static unsafe WNDCLASSEXW RegisterDesktopWindowClass(WNDPROC lpfnWndProc)
    {
        if (!PInvoke.GetClassInfoEx(new DefaultSafeHandle(g_hInstance), s_windowClassName, out WNDCLASSEXW wndClassEx))
        {
            wndClassEx.cbSize = (uint)Marshal.SizeOf(wndClassEx);
            wndClassEx.style = WNDCLASS_STYLES.CS_HREDRAW | WNDCLASS_STYLES.CS_VREDRAW;
            wndClassEx.cbClsExtra = 0;
            wndClassEx.cbWndExtra = 0;
            wndClassEx.hCursor = PInvoke.LoadCursor(new HINSTANCE(), PInvoke.IDC_ARROW);
            wndClassEx.hbrBackground = (HBRUSH)((nint)SYS_COLOR_INDEX.COLOR_WINDOW + 1);
            wndClassEx.hInstance = g_hInstance;

            fixed (char* lps_windowClassName = s_windowClassName)
            {
                wndClassEx.lpszClassName = lps_windowClassName;
            }

            wndClassEx.lpfnWndProc = lpfnWndProc;
            _ = PInvoke.RegisterClassEx(wndClassEx);

            return wndClassEx;
        }
        return default;
    }

    private static unsafe HWND CreateDesktopWindow() =>
        PInvoke.CreateWindowEx(
            0,                                  // Extended Style
            s_windowClassName,                  // name of window class
            s_defaultWindowTitle,               // title-bar string
            WINDOW_STYLE.WS_OVERLAPPEDWINDOW | WINDOW_STYLE.WS_VISIBLE,  // top-level window
            int.MinValue,                       // default horizontal position
            (int)SHOW_WINDOW_CMD.SW_HIDE,       // If the y parameter is some other value,
                                                // then the window manager calls ShowWindow with that value as the nCmdShow parameter
            int.MinValue,                       // default width
            int.MinValue,                       // default height
            new HWND(),                         // no owner window
            null,                               // use class menu
            new DefaultSafeHandle(g_hInstance),
            null);

    private partial class DefaultSafeHandle(nint invalidHandleValue, bool ownsHandle) : SafeHandle(invalidHandleValue, ownsHandle)
    {
        public DefaultSafeHandle(nint handle) : this(handle, true) => SetHandle(handle);

        public override bool IsInvalid => handle != nint.Zero;

        protected override bool ReleaseHandle() => true;
    }
}

public partial class DesktopWindow
{
    /// <summary>
    /// Create a new <see cref="DesktopWindow"/> instance.
    /// </summary>
    /// <param name="launched">Do something after <see cref="DesktopWindowXamlSource"/> created.</param>
    /// <returns>The new instance of <see cref="DesktopWindow"/>.</returns>
    public static Task<DesktopWindow> CreateAsync(Action<DesktopWindowXamlSource> launched)
    {
        TaskCompletionSource<DesktopWindow> taskCompletionSource = new();

        new Thread(() =>
        {
            try
            {
                DesktopWindowXamlSource source;
                using (HookWindowingModel hook = new())
                {
                    source = new DesktopWindowXamlSource();
                }

                DesktopWindow window = new() { WindowXamlSource = source };

                launched(source);
                taskCompletionSource.SetResult(window);

                MSG msg = new();
                while (msg.message != PInvoke.WM_QUIT)
                {
                    if (PInvoke.PeekMessage(out msg, new HWND(), 0, 0, PEEK_MESSAGE_REMOVE_TYPE.PM_REMOVE))
                    {
                        _ = PInvoke.DispatchMessage(msg);
                    }
                }
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
}

namespace Windows.Win32.System.WinRT.Xaml
{
    [GeneratedComInterface]
    [Guid("3CBCF1BF-2F76-4E9C-96AB-E84B37972554")]
    internal partial interface IDesktopWindowXamlSourceNative
    {
        /// <summary>
        /// Attaches the current **IDesktopWindowXamlSourceNative** instance to a parent UI element in your desktop app that is associated with a window handle.
        /// </summary>
        /// <param name="parentWnd">
        /// <para>Type: **HWND** The window handle of the parent UI element in which you want to host a WinRT XAML control.</para>
        /// <para><see href="https://learn.microsoft.com/windows/win32/api/windows.ui.xaml.hosting.desktopwindowxamlsource/nf-windows-ui-xaml-hosting-desktopwindowxamlsource-idesktopwindowxamlsourcenative-attachtowindow#parameters">Read more on docs.microsoft.com</see>.</para>
        /// </param>
        /// <returns>If this method succeeds, it returns S_OK. Otherwise, it returns an **HRESULT** error code.</returns>
        /// <remarks>
        /// <para>For a code example that demonstrates how to use this method, see [XamlBridge.cpp](https://github.com/microsoft/Xaml-Islands-Samples/blob/master/Samples/Win32/SampleCppApp/XamlBridge.cpp) in the SampleCppApp sample in the XAML Island samples repo. > [!IMPORTANT] > Make sure that your code calls the **AttachToWindow** method only once per [DesktopWindowXamlSource](/uwp/api/windows.ui.xaml.hosting.desktopwindowxamlsource) object. Calling this method more than once for a **DesktopWindowXamlSource** object could result in a memory leak.</para>
        /// <para><see href="https://learn.microsoft.com/windows/win32/api/windows.ui.xaml.hosting.desktopwindowxamlsource/nf-windows-ui-xaml-hosting-desktopwindowxamlsource-idesktopwindowxamlsourcenative-attachtowindow#">Read more on docs.microsoft.com</see>.</para>
        /// </remarks>
        [PreserveSig]
        [return: MarshalAs(UnmanagedType.Error)]
        int AttachToWindow(nint parentWnd);

        /// <summary>
        /// Gets the window handle of the parent UI element that is associated with the current IDesktopWindowXamlSourceNative instance.
        /// </summary>
        /// <returns>If this method succeeds, it returns S_OK. Otherwise, it returns an **HRESULT** error code.</returns>
        [PreserveSig]
        [return: MarshalAs(UnmanagedType.Error)]
        int get_WindowHandle(out nint hWnd);
    }

    file static class Extensions
    {
        /// <summary>
        /// Gets the window handle of the parent UI element that is associated with the current IDesktopWindowXamlSourceNative instance.
        /// </summary>
        public static HWND WindowHandle(this IDesktopWindowXamlSourceNative source)
        {
            _ = source.get_WindowHandle(out nint hWnd);
            return new HWND(hWnd);
        }
    }
}
```

这样创建的窗口还存在一些问题，但是我不知道该怎么解决，所以该方法还是仅供参考。

最后附上示例应用：https://github.com/wherewhere/CoreAppUWP/tree/wuxc

MUXC 篇：[【UWP】让 UWP 自己托管自己 —— Windows App SDK 篇](/2024/11/03/【UWP】让-UWP-自己托管自己-——-Windows-App-SDK-篇)

> [【UWP】让 UWP 自己托管自己 —— Windows SDK 篇](https://www.cnblogs.com/wherewhere/p/18446824) 作者 [@where-where](https://home.cnblogs.com/u/wherewhere) 2025年1月17日 发表于 [博客园](https://www.cnblogs.com "CNBlogs")，转载请注明出处
