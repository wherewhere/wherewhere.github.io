hexo.extend.generator.register("test", async function(locals){
  var result = await hexo.render.render({text: '# Test', engine: 'md'});
  return {
      path: "test.html",
      data: {
        title: "Test",
        content: result
      },
      layout: 'page'
    };
});