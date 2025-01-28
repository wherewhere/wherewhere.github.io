---
title: Github Pages
description: 所有启用了 Github Pages 的项目
comments: false
---
<span id="github-pages"><span id="pages-message"></span>如果这里什么也没有，请<a id="pages-refresh"
    href="./">刷新</a>页面，或者前往这个[页面](https://github.com/wherewhere?tab=repositories)查看</span>
<script data-pjax>
  (function () {
    var isLoading = false;
    var results = document.getElementById("github-pages");
    var message = document.getElementById("pages-message");
    function loadReadmeAsync() {
      if (isLoading) {
        return;
      }
      isLoading = true;
      message.innerHTML = "正在从 GitHub 拉取信息，请坐和放宽<br>";
      function onError() {
        message.innerHTML = "拉取失败，即将跳转到 GitHub 页面<br>";
        location.href = "https://github.com/wherewhere?tab=repositories";
        isLoading = false;
      }
      var pages = [];
      function fetchData(page) {
        var request = typeof XDomainRequest === "undefined" ? new XMLHttpRequest() : new XDomainRequest();
        try {
          request.open("GET", "https://api.github.com/users/wherewhere/repos?type=owner&sort=updated&page=" + page, true);
        }
        catch (_) {
          onError();
          return;
        }
        request.onload = function () {
          try {
            message.innerHTML = "拉取成功第" + page + "页<br>";
            var data = typeof JSON === "undefined" ? eval('(' + request.responseText + ')') : JSON.parse(request.responseText);
            if (data.length) {
              for (var i = 0; i < data.length; i++) {
                var repo = data[i];
                if (repo.has_pages) {
                  pages.push(repo);
                }
              }
              fetchData(page + 1);
            }
            else {
              message.innerHTML = "拉取成功，正在解析<br>";
              var list = document.createElement("ul");
              for (var i = 0; i < pages.length; i++) {
                var repo = pages[i];
                var item = document.createElement("li");
                list.appendChild(item);
                var link = document.createElement('a');
                link.href = "https://wherewhere.github.io/" + (repo.name === "wherewhere.github.io" ? '' : repo.name);
                link.innerText = repo.name;
                item.appendChild(link);
              }
              results.innerHTML = '';
              results.appendChild(list);
              if (typeof pjax !== "undefined") {
                pjax.refresh(results);
              }
            }
          }
          catch (_) {
            onError();
            return;
          }
          finally {
            isLoading = false;
          }
        };
        request.onerror = onError;
        request.ontimeout = onError;
        request.send();
      }
      fetchData(1);
    }
    loadReadmeAsync();
    var refresh = document.getElementById("pages-refresh");
    if (typeof refresh === "object") {
      refresh.href = "javascript:void(0)";
      refresh.onclick = loadReadmeAsync;
    }
  })();
</script>