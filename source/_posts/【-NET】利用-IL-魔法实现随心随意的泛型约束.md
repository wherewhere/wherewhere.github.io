---
title: 【.NET】利用 IL 魔法实现随心随意的泛型约束
date: 2024-04-17 17:10:00
updated: 2024-05-04 14:59:00
tags: [.NET, IL, 开发, 逆向, 魔法]
categories: 开发
---
众所周知，C# 只支持对 `基类/接口/class/struct/new()` 以及一些 IDE 魔法的约束，比如这样

```cs
public static string Test<T>(T value) where T : ITest
{
    return value.Test();
}

public interface ITest
{
    string Test();
}
```

但是如果我们想要随心所欲的约束就不行了

```cs
public static string Test<T>(T value) where T : { string Test(); }
{
    return value.Test();
}
```

最近无聊乱折腾 `MSIL`，弄出来好多不能跑的魔法，虽然不能跑但是反编译出的 C# 看着很神奇，其中正好就有想看看能不能弄个神奇的泛型出来，于是我胡写了一段代码<!--more-->

```msil
.assembly _
{
}

.class public Test
{
    .method public void .ctor()
    {
        ldarg.0
        call instance void object::.ctor()
        ret
    }

    .method public static void Main()
    {
        .entrypoint
        newobj instance void Test::.ctor()
        call string Test::Test<class Test>(!!0)
        call void [mscorlib]System.Console::WriteLine(string)
        ret
    }

    .method public static string Test<T>(!!T t)
    {
        ldarg.s t
        callvirt instance string !!T::Test()
        ret
    }

    .method public string Test()
    {
        ldstr "Call instance string Test::Test()"
        ret
    }
}
```

反编译出来是这样的

```cs
public class Test
{
    public static void Main()
    {
        Console.WriteLine(Test(new Test()));
    }

    public unsafe static string Test<T>(T t)
    {
        return ((T*)t)->Test();
    }

    public string Test()
    {
        return "Call instance string Test::Test()";
    }
}
```

这段代码是无法运行的，在 .NET Framework 会直接无返回，而在 Mono 会报错

> [ERROR] FATAL UNHANDLED EXCEPTION: System.MissingMethodException: Method not found: string .T_REF.Test()  
> 　　at Test.Main () [0x00005] in &lt;ddf64a5d94ef4722be4197eb692d9478&gt;:0

于是我就当这是 .NET 泛型的局限性了，后来有群友提醒我说约束会影响运行时，于是我就尝试加上约束

```msil
.method public static string Test<(Test) T>(!!T t)
{
    ldarg.s t
    callvirt instance string !!T::Test()
    ret
}
```

发现真的能跑了（Framework 依然无返回。。。），于是我就看看能不能同时约束两个类型

```msil
.method public static string Test<(Test, Test2) T>(!!T t)
{
    ldarg.s t
    callvirt instance string !!T::Test()
    ret
}
```

Mono 成功输出

> Call instance string Test::Test()
> Call instance string Test2::Test()

而 Framework 直接运行时约束了。。。

> 未经处理的异常: System.Security.VerificationException: 方法 Test.Test: 类型参数“Test”与类型参数“T”的约束冲突。  
> 　　在 Test.Main()

很明显 Mono 给泛型开了洞

随后测试发现，只要约束的类有相关成员就可以正常调用，于是我就利用抽象类做接口

```msil
.assembly _
{
}

.class public Test
{
    .field string Test

    .method public void .ctor()
    {
        ldarg.0
        ldstr "This is Test"
        stfld string Test::Test
        ldarg.0
        call instance void object::.ctor()
        ret
    }

    .method public static void Main()
    {
        .entrypoint
        .locals init (
            class Test test,
            class Test2 test2
        )
        newobj instance void Test::.ctor()
        stloc.s test
        ldloc.s test
        call void Test::Test<class Test>(!!0)
        ldloc.s test
        call string Test::Test<class Test>(!!0)
        call void [mscorlib]System.Console::WriteLine(string)
        newobj instance void Test2::.ctor()
        stloc.s test2
        ldloc.s test2
        call void Test::Test<class Test2>(!!0)
        ldloc.s test2
        call string Test::Test<class Test2>(!!0)
        call void [mscorlib]System.Console::WriteLine(string)
        ret
    }

    .method public static void Test<(WithTest) T>(!!T t)
    {
        ldarg.s t
        ldfld string !!T::Test
        call void [mscorlib]System.Console::WriteLine(string)
        ret
    }

    .method public static string Test<(WithTest) T>(!!T t)
    {
        ldarg.s t
        callvirt instance string !!T::Test()
        ret
    }

    .method public string Test()
    {
        ldstr "Call instance string Test::Test()"
        ret
    }
}

.class public Test2
{
    .field string Test

    .method public void .ctor()
    {
        ldarg.0
        ldstr "This is Test2"
        stfld string Test2::Test
        ldarg.0
        call instance void object::.ctor()
        ret
    }

    .method public newslot virtual string Test()
    {
        ldstr "Call instance string Test2::Test()"
        ret
    }
}

.class public abstract WithTest
{
    .field string Test

    .method public newslot abstract virtual string Test()
    {
    }
}
```

正确输出

> This is Test  
> Call instance string Test::Test()  
> This is Test2  
> Call instance string Test2::Test()

Framework 自然还是炸的

最后反编译出来长这样

```cs
public class Test
{
    private string m_Test = "This is Test";

    public static void Main()
    {
        Test t = new Test();
        global::Test.Test<Test>(t);
        Console.WriteLine(global::Test.Test<Test>(t));
        Test2 t2 = new Test2();
        global::Test.Test<Test2>(t2);
        Console.WriteLine(global::Test.Test<Test2>(t2));
    }

    public unsafe static void Test<T>(T t) where T : WithTest
    {
        Console.WriteLine(((T*)t)->Test);
    }

    public unsafe static string Test<T>(T t) where T : WithTest
    {
        return ((T*)t)->Test();
    }

    public string Test()
    {
        return "Call instance string Test::Test()";
    }
}

public class Test2
{
    private string m_Test = "This is Test2";

    public virtual string Test()
    {
        return "Call instance string Test2::Test()";
    }
}

public abstract class WithTest
{
    private string m_Test;

    public abstract string Test();
}
```

当然，这种操作仅限娱乐，经测试 .NET Framework 和 .NET Core App 都会卡在约束，所以 .NET 是别想有随意的约束了，不过 C# 题案 ["Roles and extensions"](https://github.com/dotnet/csharplang/discussions/5496 "[Proposal]: Roles and extensions") 倒是给出了曲线实现方案

> [【.NET】利用 IL 魔法实现随心随意的泛型约束](https://www.cnblogs.com/wherewhere/p/18140783) 作者 [@where-where](https://home.cnblogs.com/u/wherewhere) 2024年4月17日 发表于 [博客园](https://www.cnblogs.com "CNBlogs")，转载请注明出处
