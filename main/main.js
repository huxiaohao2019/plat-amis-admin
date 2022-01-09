import rootPage from "./rootPage";

let amis = amisRequire('amis/embed');
// 通过替换下面这个配置来生成不同页面
let amisJSON = {
  type: 'page',
  title: '主页',
  body: rootPage
};

let amisAppJSON={
  "type": "app",
  "brandName": "应用名称",
  "pages": [
    {
      // "label": "分组1",
      "children": [
        {
          // "label": "父页面",
          "url": "/parent",
          "children": [
            {
              "label": "子页面",
              "url": "pageA",
              "schema": {
                "type": "page",
                "title": "Page A"
              }
            }
          ]
        }
      ]
    }
  ]
}

amisJSON=amisAppJSON;

let amisScoped = amis.embed('#root', amisJSON, {
  tracker: (eventTrack, props) => {
  console.log("🚀 ~ file: main.js ~ line 12 ~ eventTrack", eventTrack)
    const blob = new Blob([JSON.stringify(eventTrack)], {
      type: 'application/json'
    });
    navigator.sendBeacon('/tracker', blob);
  }
});





export default {
  platMain: amisJSON
}

// document.getElementById('')