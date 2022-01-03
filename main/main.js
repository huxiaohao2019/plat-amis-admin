(function () {
    let amis = amisRequire('amis/embed');
    // 通过替换下面这个配置来生成不同页面
    let amisJSON = {
        type: 'page',
        title: '主页',
        body:   {
            "type": "input-tree",
            "name": "tree",
            "label": "Tree",
            "showOutline": true,
            "options": [
              {
                "label": "Folder A",
                "value": 1,
                "children": [
                  {
                    "label": "file A",
                    "value": 2
                  },
                  {
                    "label": "Folder B",
                    "value": 3,
                    "children": [
                      {
                        "label": "file b1",
                        "value": 3.1
                      },
                      {
                        "label": "file b2",
                        "value": 3.2
                      }
                    ]
                  }
                ]
              },
              {
                "label": "file C",
                "value": 4
              },
              {
                "label": "file D",
                "value": 5
              }
            ]
          }
      };
    let amisScoped = amis.embed('#root', amisJSON);
})();