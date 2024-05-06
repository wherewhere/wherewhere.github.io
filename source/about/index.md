---
title: 关于
---
<div id="readme">如果这里什么也没有，请<a href="javascript:location.reload();">刷新</a>页面，或者前往这个<a href="https://wherewhere.github.io/wherewhere"><b>页面</b></a>查看</div>
<script>
 async function loadReadme() {
   var response = await fetch("https://api.github.com/repos/wherewhere/wherewhere/readme", {
     headers: {
       "Accept": "application/vnd.github.html+json",
     }
   });
   if (response.ok) {
     var text = await response.text();
     if (text != "") {
       document.getElementById('readme').innerHTML = text;
       return;
     }
   }
   location.href = "https://wherewhere.github.io/wherewhere"
 }
 loadReadme();
</script>
