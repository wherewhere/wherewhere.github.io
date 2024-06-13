---
title: 【UWP】开发小技巧――简单的增量加载
date: 2022-01-24 22:46:06
tags: [UWP, .NET, C#, 开发, 教程]
categories: 开发
banner: https://github.com/wherewhere/wherewhere.github.io/assets/27689196/85655d62-1f07-4889-9191-143ce0be5971
---
![【UWP】开发小技巧――简单的增量加载](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/85655d62-1f07-4889-9191-143ce0be5971)

<style>
  figcaption.figure {
    color: #999;
    font-size: 0.875em;
    font-weight: bold;
    line-height: 1;
    margin: -15px auto 15px;
    text-align: center;
  }
</style>

[#UWP#](https://www.coolapk.com/t/UWP) [#爱编程#](https://www.coolapk.com/t/爱编程) [#电脑玩家#](https://www.coolapk.com/t/电脑玩家)

增量加载的原理这里就不多说了，具体是干什么的可以看 CNBlogs 的讲解：[查看链接](https://www.cnblogs.com/ms-uap/p/4155601.html)

这里只讲解如何使用 CNBlogs UAP 中使用的增量加载方案(我硬是看了一天才知道怎么用。。。

首先附上代码(已经被我修改过了)：[查看链接](https://github.com/Coolapk-UWP/Coolapk-Lite/tree/master/CoolapkLite/CoolapkLite.Core/Helpers/DataSource)

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/1530f06c-0be9-4f1e-b915-b0b2175cfaea" alt="部分代码" />
<figcaption>部分代码</figcaption>

引用时不要忘了附上出处(不是我这，是CNBlogs<!--more-->

```cs
/// <summary>
/// Datasource base for Coolapk that enabled incremental loading (page based). <br/>
/// Clone from <see cref="cnblogs UAP" href="https://github.com/MS-UAP/cnblogs-UAP" />.
/// </summary>
```
<figcaption class="figure">引用</figcaption>

接下来就是如何调用增量加载了(同样的，不解释代码

众所周知，UWP 中只有 `ListView` 系列支持增量加载，所以不要拿 `ItemsRepeater` 问我为什么不会自动加载。。。

首先，我们需要一个 `ListView`，光秃秃的，在不会用之前就先光秃秃的。。。

```xml
<Page
    x:Class="CoolapkLite.Pages.BlankPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:CoolapkLite.Pages"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}"
    mc:Ignorable="d">
    <ListView x:Name="ListView" />
</Page>
```

然后，新建一个集合，代码如下

```cs
internal class NewDS : DataSourceBase<string>
{
    private int _loadnum = 0;

    protected async override Task<IList<string>> LoadItemsAsync(uint count)
    {
        List<string> items = new List<string>();
        await Task.Run(() =>
        {
            for (int i = 0; i < count; i++)
            {
                items.Add((i + _loadnum).ToString ());
            }
        });
        _loadnum += items.Count;
        return items;
    }

    protected override void AddItems(IList<string> items)
    {
        if (items != null)
        {
            foreach (string item in items)
            {
                Add(item);
            }
        }
    }
}
```

其中，`LoadItemsAsync` 用来获取更多内容，这里是获取行数，`AddItems` 用来把东西丢进集合里，一般可以用来处理重复项。

接着，新建这个集合，直接把它绑定到 `ListView` 上就行了。

```cs
/// <summary>
/// 可用于自身或导航至 Frane 内部的空白页。
/// <summary>
public sealed partial class BlankPage : Page
{
    public BlankPage()
    {
        this.InitializeComponent();
        ListView.ItemsSource = new NewDS();
    }
}
```
<figcaption class="figure">绑定集合</figcaption>

我们来跑一跑看看

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/e7ac2f2a-334c-4e5e-ba84-5c606ca427b3" alt="运行" />
<figcaption>运行</figcaption>

如果真的要用在非 `ListView` 控件上或者自动加载不生效，可以通过 `LoadMoreItemsAsync` 方法手动来让它加载，所以一般刷新方法会写成这样，第一次加载时 `Refresh(-2)`，之后只要检测到滑到底了就执行一次 `Refresh` (不要问我为什么用数字，要问去问 Tan

```cs
public async Task Refresh(int p = -1)
{
    if (p == -2)
    {
        await Reset();
    }
    else if (p == -1)
    {
        _ = await LoadMoreItemsAsync(20);
    }
}
```
<figcaption class="figure">Tan 祖传的刷新方法</figcaption>

这里的 `Reset` 方法在 CNBlogs UAP 里叫 `Refresh`，内容是清空集合并初始化，我为了不和 Tan 祖传的 `Refresh` 方法冲突就给改掉了，如果直接使用我给的代码的话就不用管了。

`LoadMoreItemsAsync` 方法用来手动加载内容，输入的数字代表要加载的数量，自动加载的时候这个数是会自行计算出来的

好了，本次教程就先说这么多了，更多内容等我下次再说

> [【UWP】开发小技巧――简单的增量加载](https://www.coolapk.com/feed/33071083?shareKey=MGUwNzc1MzBlZGViNjYzZmNhZDA) 作者 [@wherewhere](https://www.coolapk.com/u/wherewhere) 2022年1月24日 发表于 [酷安](https://www.coolapk.com "Coolapk")，转载请注明出处
