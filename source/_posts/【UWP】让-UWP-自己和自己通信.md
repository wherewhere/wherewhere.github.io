---
title: 【UWP】让 UWP 自己和自己通信
date: 2025-04-01 14:04:00
updated: 2025-04-01 14:22:00
tags: [UWP, .NET, C#, WinRT, 开发, 教程]
categories: 开发
---
众所周知，UWP 一般是运行在沙盒里面的，当我们需要访问沙盒外资源的时候，就需要通过沙盒外的代理服务器来获取。一般情况下我们都是利用 WinRT API 通过 Runtime Broker 来和沙盒外互通，遇到要自定义的情况则是手动开一个 Win32 服务器来互通，但是有没有可能我们可以直接拿 UWP 本体当服务器呢？

UWP 本体实际上就是一个普通的 Win32 EXE 程序，只是想要以 UWP 状态运行只能通过系统托管，但是如果我们不需要它以 UWP 状态执行的时候完全可以直接双击打开它，这时候它就是一个很普通的散装 Win32 程序了。

利用这个特性，我们可以制作一种假装双击打开的方法，只需要在发现是 Win32 状态下启动就去用 API 唤起 UWP 形态的自己就行了

```cs
private static unsafe bool IsPackagedApp
{
    get
    {
        uint length = 0;
        PWSTR str = new();
        _ = PInvoke.GetCurrentPackageFullName(ref length, str);
 
        char* ptr = stackalloc char[(int)length];
        str = new(ptr);
        WIN32_ERROR result = PInvoke.GetCurrentPackageFullName(ref length, str);
        return result != WIN32_ERROR.APPMODEL_ERROR_NO_PACKAGE;
    }
}
 
private static void Main()
{
    if (IsPackagedApp)
    {
        Application.Start(static p =>
        {
            DispatcherQueueSynchronizationContext context = new(DispatcherQueue.GetForCurrentThread());
            SynchronizationContext.SetSynchronizationContext(context);
            _ = new App();
        });
    }
    else
    {
        StartCoreApplicationAsync().Wait();
    }
}
 
private static async Task StartCoreApplicationAsync()
{
    PackageManager manager = new();
    string basePath = AppDomain.CurrentDomain.BaseDirectory;
    XmlDocument manifest = await XmlDocument.LoadFromFileAsync(await StorageFile.GetFileFromPathAsync(Path.Combine(basePath, "AppxManifest.xml")));
    IXmlNode identity = manifest.GetElementsByTagName("Identity")?[0];
    string name = identity.Attributes.FirstOrDefault(x => x.NodeName == "Name")?.InnerText;
    IXmlNode application = manifest.GetElementsByTagName("Application")?[0];
    string id = application.Attributes.FirstOrDefault(x => x.NodeName == "Id")?.InnerText;
    IEnumerable<Package> packages = manager.FindPackagesForUser(string.Empty).Where(x => x.Id.FamilyName.StartsWith(name));
    if (packages.FirstOrDefault() is Package package)
    {
        IReadOnlyList<AppListEntry> entries = await package.GetAppListEntriesAsync();
        if (entries?[0] is AppListEntry entry)
        {
            _ = await entry.LaunchAsync();
        }
    }
}
```

既然我们可以让自己唤起自己，那么自己和自己通信也不是什么难事了，我们只需要在 UWP 形态下唤起一个 Win32 的自己，就可以自己利用自己滥权(bushi)了。<!--more-->

既然知道了原理可行，那么我们就来尝试把它造出来，众所周知，通信的方法有很多，比如 UWP 扩展通信、TCP 通信、管道通信甚至是写文件通信，但是这些用起来都太复杂了，既然我们已经用了 WinRT，那么我们直接用 WinRT 通信就是了。

不过真正的 OOP/WinRT 通信的例子并不多，我到目前为止也没有成功实现，所以就先用 COM 通信凑数了。现在微软到处都是 OOP/COM 通信，比如小组件和 Dev Home，自从微软疯狂用 OOP/COM 造插件之后这方面的示例已经非常多了，这里就展示一下如何用 C# 实现基于 OOP/COM 的 WinRT 通信。

既然是通信，肯定要有服务器和客户端，这里这两个都是自己，所以我们就只需要创建一个 UWP 项目就行了。由于 C#/WinRT 并不能实现 WinRT 类与非 WinRT 类混编，所以我们还需要创建一个 C++/WinRT 项目来生成 winmd 清单，这个 C++ 项目可以精简一下，只需要能编译 IDL 文件就行了，当然不修改也可以，只是看起来不太清爽罢了。

由于 C++/WinRT 项目只负责生成清单，如果直接引用该项目会报找不到 dll 实现，所以我们需要把 winmd 文件单独拿出来，在 vcxprj 中添加任务：

```xml
<Target Name="OutputWinMD" BeforeTargets="BuildCompile">
  <PropertyGroup>
    <PlatformName Condition="'$(Platform)' == 'Win32'">x86</PlatformName>
    <PlatformName Condition="'$(Platform)' == 'ARM64EC'">ARM64</PlatformName>
    <PlatformName Condition="'$(PlatformName)' == ''">$(Platform)</PlatformName>
  </PropertyGroup>
  <Copy SourceFiles="$(OutDir)\$(ProjectName).winmd" DestinationFolder="..\WinMD\$(PlatformName)\$(Configuration)\" />
  <Message Text="Copied output metadata file to '..\WinMD\$(PlatformName)\$(Configuration)\'." />
</Target>
```

接下来我们就可以开始写 COM 类了，首先我们要实现一个负责服务器管理的类，这个类用来管理服务器的声明周期和远程类的获取方法。

其中我们需要先实现一种让服务器可以在客户端关闭后自动关闭的方法，让客户端通知是很不合理的，因为客户端可能会突然暴毙，这样就会导致服务器永远也不会释放了，所以我们必须让服务器去感知客户端不再需要服务器了。在 C++，我们可以通过观察引用计数的方法来知道远程类是否被客户端释放了，但是在 C#，远程类被客户端释放后并不会真的释放，我暂时不清楚其中的原因，表现出来就是解构方法并不会被执行，所以我们就无法通过类释放来关闭服务器了。于是我们还有一种方法，当通信断开后，我们执行远程方法就会报错，这样我们就知道通信已经断开了，于是我们可以让客户端给服务器发送一个保活委托，服务器每隔一段时间就去执行一次，这样通信断开后再执行委托就会直接报错了。当然我们还可以让这个保活委托变成一个永远也不会结束的异步，让 WinRT 自己去等待，这样服务器在通信断开的一瞬间知道通信结束了，不过由于我们并不需要瞬间就反应，有时候我们还需要考虑应用被关闭后马上就又打开的情况，所以我还是选择自己开个间隔比较长的定时器自己喂狗了。

实现很简单，开个定时器喂狗就行了：

```cs
/// <summary>
/// Represents a monitor that checks if a remote object is alive.
/// </summary>
public sealed partial class RemoteMonitor : IDisposable
{
    private bool disposed;
    private readonly Timer _timer;
    private readonly Action _dispose;

    /// <summary>
    /// Initializes a new instance of the <see cref="RemoteMonitor"/> class.
    /// </summary>
    /// <param name="handler">The handler to check if the remote object is alive.</param>
    /// <param name="dispose">The action to dispose the remote object.</param>
    /// <param name="period">The period to check if the remote object is alive.</param>
    public RemoteMonitor(IsAliveHandler handler, Action dispose, TimeSpan period)
    {
        _dispose = dispose;
        _timer = new(_ =>
        {
            bool isAlive = false;
            try
            {
                isAlive = handler.Invoke();
            }
            catch
            {
                isAlive = false;
            }
            finally
            {
                if (!isAlive)
                {
                    Dispose();
                }
            }
        }, null, TimeSpan.Zero, period);
    }

    /// <summary>
    /// Finalizes the instance of the <see cref="RemoteMonitor"/> class.
    /// </summary>
    ~RemoteMonitor() => Dispose();

    /// <inheritdoc/>
    public void Dispose()
    {
        if (!disposed)
        {
            disposed = true;
            _timer.Dispose();
            _dispose?.Invoke();
            GC.SuppressFinalize(this);
        }
    }
}
```

同时在 IDL 定义 `IsAliveHandler` 委托：

```cs
delegate Boolean IsAliveHandler();
```

接下来我们就可以写服务器管理类了，我们只需要让它能正确释放服务器就行了，分别写 IDL 定义和 C# 实现：

```cs
interface ISetMonitor
{
    void SetMonitor(IsAliveHandler handler, Windows.Foundation.TimeSpan period);
}

interface IRemoteThing requires ISetMonitor, Windows.Foundation.IClosable, Windows.Foundation.IStringable
{
    // 其他远程操作
}
```

```cs
/// <summary>
/// The manage class for remote object.
/// </summary>
public sealed partial class RemoteThing : IRemoteThing
{
    private bool disposed;
    private RemoteMonitor _monitor;

    /// <summary>
    /// Initializes a new instance of the <see cref="RemoteThing"/> class.
    /// </summary>
    public RemoteThing() => Program.RefCount++;

    /// <summary>
    /// Finalizes the instance of the <see cref="RemoteThing"/> class.
    /// </summary>
    ~RemoteThing() => Dispose();

    /// <summary>
    /// Sets the monitor to check if the remote object is alive.
    /// </summary>
    /// <param name="handler">The handler to check if the remote object is alive.</param>
    /// <param name="period">The period to check if the remote object is alive.</param>
    public void SetMonitor(IsAliveHandler handler, TimeSpan period) => _monitor = new RemoteMonitor(handler, Dispose, period);

    #region 其他远程操作

    #endregion

    /// <inheritdoc/>
    public void Dispose()
    {
        if (!disposed)
        {
            disposed = true;
            _monitor?.Dispose();
            GC.SuppressFinalize(this);
            if (--Program.RefCount == 0)
            {
                _ = Program.CheckComRefAsync();
            }
        }
    }

    /// <summary>
    /// 随便写点什么作为测试。
    /// </summary>
    public override string ToString() =>
        new StringBuilder()
            .AppendLine("Information")
            .AppendLine($"Framework: {RuntimeInformation.FrameworkDescription}")
            .AppendLine($"OSPlatform: {Environment.OSVersion}")
            .Append($"OSArchitecture: {RuntimeInformation.OSArchitecture}")
            .ToString();
}
```

有了服务器管理类，我们就可以把它注册到 COM 服务器了。想要注册 COM 类，我们需要一个  Factory 工厂类来让 COM 服务器可以在通信时初始化 COM 类。首先我们需要导入 COM 相关 API，定义 `IClassFactory` 接口，其中 `Factory.CLSID_IRemoteThing` 为远程类的 `CLSID`。

```cs
public static partial class Factory
{
    public static readonly Guid CLSID_IRemoteThing = new("01153FC5-2F29-4F60-93AD-EFFB97CC9E20");
    public static readonly Guid CLSID_IUnknown = new("00000000-0000-0000-C000-000000000046");

    [LibraryImport("api-ms-win-core-com-l1-1-0.dll")]
    internal static partial int CoRegisterClassObject(in Guid rclsid, IClassFactory pUnk, uint dwClsContext, int flags, out uint lpdwRegister);

    [LibraryImport("api-ms-win-core-com-l1-1-0.dll")]
    internal static partial int CoRevokeClassObject(uint dwRegister);
}

// https://docs.microsoft.com/windows/win32/api/unknwn/nn-unknwn-iclassfactory
[GeneratedComInterface]
[Guid("00000001-0000-0000-C000-000000000046")]
public partial interface IClassFactory
{
    void CreateInstance(nint pUnkOuter, in Guid riid, out nint ppvObject);

    void LockServer([MarshalAs(UnmanagedType.Bool)] bool fLock);
}
```

接下来我们可以制作一个抽象的工厂类，然后就可以直接继承这个工厂类来实现对应类的工厂类，不过由于 COM 源生成暂时不支持泛型，所以这个抽象的工厂类不能加 `GeneratedComClass`。

```cs
public abstract partial class Factory<T, TInterface> : IActivationFactory, IClassFactory where T : TInterface, new()
{
    private const int E_NOINTERFACE = unchecked((int)0x80004002);
    private const int CLASS_E_NOAGGREGATION = unchecked((int)0x80040110);

    private readonly Guid _iid = typeof(TInterface).GUID;

    public nint ActivateInstance() => MarshalInspectable<TInterface>.FromManaged(new T());

    public void CreateInstance(nint pUnkOuter, in Guid riid, out nint ppvObject)
    {
        ppvObject = 0;

        if (pUnkOuter != 0)
        {
            Marshal.ThrowExceptionForHR(CLASS_E_NOAGGREGATION);
        }

        if (riid == _iid || riid == Factory.CLSID_IUnknown)
        {
            // Create the instance of the .NET object
            ppvObject = MarshalInspectable<TInterface>.FromManaged(new T());
        }
        else
        {
            // The object that ppvObject points to does not support the
            // interface identified by riid.
            Marshal.ThrowExceptionForHR(E_NOINTERFACE);
        }
    }

    public void LockServer([MarshalAs(UnmanagedType.Bool)] bool fLock)
    {
    }

    public abstract void RegisterClassObject();
    public abstract void RevokeClassObject();
}
```

然后我们继承这个抽象的工厂类来实现我们需要的工厂类：

```cs
[GeneratedComClass]
public partial class RemoteThingFactory : Factory<RemoteThing, IRemoteThing>
{
    private uint cookie;

    public override void RegisterClassObject()
    {
        int hresult = Factory.CoRegisterClassObject(
            Factory.CLSID_IRemoteThing,
            this,
            (uint)CLSCTX.CLSCTX_LOCAL_SERVER,
            (int)REGCLS.REGCLS_MULTIPLEUSE,
            out cookie);
        if (hresult < 0)
        {
            Marshal.ThrowExceptionForHR(hresult);
        }
    }

    public override void RevokeClassObject()
    {
        int hresult = Factory.CoRevokeClassObject(cookie);
        if (hresult < 0)
        {
            Marshal.ThrowExceptionForHR(hresult);
        }
    }
}
```

然后我们就可以在程序入口点注册这个 COM 类了：

```cs
public static class Program
{
    private static ManualResetEventSlim comServerExitEvent;

    public static int RefCount { get; set; }

    private static void Main(string[] args)
    {
        if (args is ["-RegisterProcessAsComServer", ..])
        {
            comServerExitEvent = new ManualResetEventSlim(false);
            comServerExitEvent.Reset();
            RemoteThingFactory factory = new();
            factory.RegisterClassObject();
            _ = CheckComRefAsync();
            comServerExitEvent.Wait();
            factory.RevokeClassObject();
        }
        else
        {
            Application.Start(static p =>
            {
                DispatcherQueueSynchronizationContext context = new(DispatcherQueue.GetForCurrentThread());
                SynchronizationContext.SetSynchronizationContext(context);
                _ = new App();
            });
        }
    }

    public static async Task CheckComRefAsync()
    {
        await Task.Delay(100);
        if (RefCount == 0)
        {
            comServerExitEvent?.Set();
        }
    }
}
```

最后我们需要在清单声明 COM 服务器，其中`SelfCOMServer.exe`为服务器所在的可执行文件，Class ID 填远程类的`CLSID`。

```xml
<Applications>
  <Application>
    ...
    <Extensions>
      <com:Extension Category="windows.comServer">
        <com:ComServer>
          <com:ExeServer
            Executable="SelfCOMServer.exe"
            Arguments="-RegisterProcessAsComServer"
            DisplayName="COM Server"
            LaunchAndActivationPermission="O:SYG:SYD:(A;;11;;;WD)(A;;11;;;RC)(A;;11;;;AC)(A;;11;;;AN)S:P(ML;;NX;;;S-1-16-0)">
            <com:Class Id="01153FC5-2F29-4F60-93AD-EFFB97CC9E20" DisplayName="COM Server" />
          </com:ExeServer>
        </com:ComServer>
      </com:Extension>
    </Extensions>
  </Application>
</Applications>
```

现在我们已经完成了服务端的制作，接下来我们就可以让客户端调用服务器远程类了。

在 `Factory` 类继续添加获取远程类的相关内容：

```cs
public static partial class Factory
{
    private static bool IsAlive() => true;

    public static IRemoteThing CreateRemoteThing() =>
        CreateInstance<IRemoteThing>(CLSID_IRemoteThing, CLSCTX.CLSCTX_ALL, TimeSpan.FromMinutes(1));

    internal static T CreateInstance<T>(Guid rclsid, CLSCTX dwClsContext = CLSCTX.CLSCTX_INPROC_SERVER)
    {
        int hresult = CoCreateInstance(rclsid, 0, (uint)dwClsContext, CLSID_IUnknown, out nint result);
        if (hresult < 0)
        {
            Marshal.ThrowExceptionForHR(hresult);
        }
        return Marshaler<T>.FromAbi(result);
    }

    internal static T CreateInstance<T>(Guid rclsid, CLSCTX dwClsContext, TimeSpan period) where T : ISetMonitor
    {
        T results = CreateInstance<T>(rclsid, dwClsContext);
        results.SetMonitor(IsAlive, period);
        return results;
    }

    [LibraryImport("api-ms-win-core-com-l1-1-0.dll")]
    private static partial int CoCreateInstance(in Guid rclsid, nint pUnkOuter, uint dwClsContext, in Guid riid, out nint ppv);
}
```

现在我们只需要执行 `IRemoteThing remote = Factory.CreateRemoteThing();` 就能获取远程类了。

到这里我们已经完成了 OOP COM 的全部流程，我们想要实现什么内容就可以按照构建服务器管理类的方法来制作 COM 远程类，然后通过在服务器管理类添加一个构造方法来获取这个远程类，这样我们就不需要单独分配 CLSID 和注册 COM 类了。

比如我们可以给 `Process` 套个壳：

```cs
/// <inheritdoc cref="Process"/>
public partial class RemoteProcess(Process inner) : IProcess
{
    /// <inheritdoc cref="Process.ProcessName"/>
    public string ProcessName => inner.ProcessName;

    /// <inheritdoc cref="Process.StandardError"/>
    public ITextReader StandardError => new RemoteTextReader(inner.StandardError);

    /// <inheritdoc cref="Process.ProcessName"/>
    public ITextWriter StandardInput => new RemoteTextWriter(inner.StandardInput);

    /// <inheritdoc cref="Process.StandardOutput"/>
    public ITextReader StandardOutput => new RemoteTextReader(inner.StandardOutput);

    /// <inheritdoc cref="Process.StartInfo"/>
    public IProcessStartInfo StartInfo
    {
        get => new RemoteProcessStartInfo(inner.StartInfo);
        set => value.ToProcessStartInfo();
    }

    private readonly ConditionalWeakTable<CoDataReceivedEventHandler, DataReceivedEventHandler> errorDataReceived = [];
    /// <inheritdoc cref="Process.ErrorDataReceived"/>
    public event CoDataReceivedEventHandler ErrorDataReceived
    {
        add
        {
            void wrapper(object sender, DataReceivedEventArgs e) => value(this, new CoDataReceivedEventArgs(e.Data));
            DataReceivedEventHandler handler = wrapper;
            inner.ErrorDataReceived += handler;
            errorDataReceived.Add(value, handler);
        }
        remove
        {
            if (errorDataReceived.TryGetValue(value, out DataReceivedEventHandler handler))
            {
                inner.ErrorDataReceived -= handler;
                errorDataReceived.Remove(value);
            }
        }
    }

    private readonly ConditionalWeakTable<CoDataReceivedEventHandler, DataReceivedEventHandler> outputDataReceived = [];
    /// <inheritdoc cref="Process.OutputDataReceived"/>
    public event CoDataReceivedEventHandler OutputDataReceived
    {
        add
        {
            void wrapper(object sender, DataReceivedEventArgs e) => value(this, new CoDataReceivedEventArgs(e.Data));
            DataReceivedEventHandler handler = wrapper;
            inner.OutputDataReceived += handler;
            outputDataReceived.Add(value, handler);
        }
        remove
        {
            if (outputDataReceived.TryGetValue(value, out DataReceivedEventHandler handler))
            {
                inner.OutputDataReceived -= handler;
                outputDataReceived.Remove(value);
            }
        }
    }

    /// <inheritdoc cref="Process.BeginErrorReadLine"/>
    public void BeginErrorReadLine() => inner.BeginErrorReadLine();

    /// <inheritdoc cref="Process.BeginOutputReadLine"/>
    public void BeginOutputReadLine() => inner.BeginOutputReadLine();

    /// <inheritdoc cref="Process.CancelErrorRead"/>
    public void CancelErrorRead() => inner.CancelErrorRead();

    /// <inheritdoc cref="Process.CancelOutputRead"/>
    public void CancelOutputRead() => inner.CancelOutputRead();

    /// <inheritdoc cref="Component.Dispose"/>
    public void Dispose()
    {
        inner.Dispose();
        GC.SuppressFinalize(this);
    }

    /// <inheritdoc cref="Process.ToString"/>
    public override string ToString() => inner.ToString();
}
```

静态部分可以弄一个假装的静态类：

```cs
/// <inheritdoc cref="Process"/>
public sealed partial class ProcessStatic : IProcessStatic
{
    /// <inheritdoc cref="Process.GetProcesses()"/>
    public IProcess[] GetProcesses() => Process.GetProcesses().Select(x => new RemoteProcess(x)).ToArray();

    public IProcess Start(IProcessStartInfo startInfo) =>
        Process.Start(startInfo.ToProcessStartInfo()) is Process process
            ? new RemoteProcess(process) : null;
}
```

然后我们在服务器管理类里增加构造方法：

```cs
public IProcessStatic CreateProcessStatic() => new ProcessStatic();
```

这样我们就可以在 UWP 里使用 Process 创建一个 cmd 进程了：

```cs
IRemoteThing remote = Factory.CreateRemoteThing();
process = remote.CreateProcessStatic().Start(new RemoteProcessStartInfo
{
    FileName = "cmd",
    CreateNoWindow = true,
    RedirectStandardError = true,
    RedirectStandardInput = true,
    RedirectStandardOutput = true,
    UseShellExecute = false
});
AppTitle.Text = process.ProcessName;
process.OutputDataReceived += OnOutputDataReceived;
process.ErrorDataReceived += OnErrorDataReceived;
process.BeginOutputReadLine();
process.BeginErrorReadLine();
```

具体实现可以查看：[SelfCOMServer/SelfCOMServer/Common/RemoteProcess.cs at main · wherewhere/SelfCOMServer](https://github.com/wherewhere/SelfCOMServer/blob/main/SelfCOMServer/Common/RemoteProcess.cs)

![Snipaste_2025-03-15_15-58-42](https://github.com/user-attachments/assets/e7c49bcf-4535-4b25-abdd-bbfb07d454d1)

最后附上示例应用：[https://github.com/wherewhere/SelfCOMServer](https://github.com/wherewhere/SelfCOMServer)

> [【UWP】让 UWP 自己和自己通信](https://www.cnblogs.com/wherewhere/p/18677329) 作者 [@where-where](https://home.cnblogs.com/u/wherewhere) 2025年4月1日 发表于 [博客园](https://www.cnblogs.com "CNBlogs")，转载请注明出处
