---
title: 【UWP】开发小技巧――判断类是否存在
date: 2021-12-19 14:58:37
tags: [UWP, .NET, C#, 开发, 教程]
categories: 开发
banner: https://github.com/wherewhere/wherewhere.github.io/assets/27689196/85655d62-1f07-4889-9191-143ce0be5971
---
![【UWP】开发小技巧――判断类是否存在](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/85655d62-1f07-4889-9191-143ce0be5971)

[#UWP#](https://www.coolapk.com/t/UWP) [#爱编程#](https://www.coolapk.com/t/爱编程) [#电脑玩家#](https://www.coolapk.com/t/电脑玩家)

不要问我这个需求是怎么冒出来的，自己没事找事要支持 10240，结果发现啥都不支持，真是太糟糕了。

一般而言，这类需求都是想办法通过类名新建对象，一开始我也是这么想的，不过网上那些教程都是单纯 .NET 的，不支持 UWP (也可能是我太菜了，不会用)，所以直接白嫖是不可能了。。。

![示例](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/e522a212-019a-48f3-a67c-a5552390a0de)

不过判断是否存在不需要这么复杂，C# 有专门的 GetType 方法来找类，所以事情就简单了，直接 Type.GetType("类名") 就行了，不过真的是这样吗？<!--more-->

![Type.GetType()](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/4b294780-7097-44cc-8df4-aff24c3c66ce)

经过调试，并没有成功找到这个类型，不过不止 Type 有 GetType ，在 C# 中 Assembly 也有 GetType ，我直接找到要找的类的程序集再找类应该就能找到了吧。

![Assembly.GetType()](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/3be76a6a-550b-46d3-9e52-1d9ce08559cc)

很明显，这个方案才是对的。现在知道了方法，就搓个函数出来吧。

```cs
public static bool IsTypePresent(string AssemblyName, string TypeName)
{
    try
    {
        Assembly asmb = Assembly.Load(new AssemblyName(AssemblyName));
        Type supType = asmb.GetType($"{AssemblyName}.{TypeName}");
        return supType != null;
    }
    catch
    {
        return false;
    }
}
```

额，好像不太对，10240 不支持和类在不在程序集里好像没关系吧。。。

![调试](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/47a8f34f-d7b4-4596-91e9-84aa521d7d1d)

我们似乎还是要新建一个对象来判断它到底是不是支持，于是函数就变成这样了。。。

```cs
public static bool IsTypePresent(string AssemblyName, string TypeName)
{
    try
    {
        Assembly asmb = Assembly.Load(new AssemblyName(AssemblyName));
        Type supType = asmb.GetType($"{AssemblyName}.{TypeName}");
      	if (supType != null)
        {
            try { Activator.CreateInstance(supType); }
            catch (MissingMethodException) { }
       	}
        return supType != null;
    }
    catch
    {
        return false;
    }
}
```

终于正常了。。。

判断 API 是否存在就不要用这个方法了，官方有 ApiInformation，肯定比这个好用

![ApiInformation](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/dcdcfd17-2c17-4d27-8857-8ec2ccd7075b)

哦对了，记得把函数放在要用的项目里，不要问我怎么知道的。。。 

> [【UWP】开发小技巧――判断类是否存在](https://www.coolapk.com/feed/32229068?shareKey=ZTc3NmI0NTc1OGI4NjYzM2UxMTI) 作者 [@wherewhere](https://www.coolapk.com/u/wherewhere) 2021年12月19日 发表于 [酷安](https://www.coolapk.com "Coolapk")，转载请注明出处
