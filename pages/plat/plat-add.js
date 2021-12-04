import platFormItems from "./plat-form-item"

const platAddPage =
{
  "type": "page",
  "title": "新增平台",
  "remark": null,
  "toolbar": [
    {
      "type": "button",
      "actionType": "link",
      "link": "/deivce/list",
      "label": "返回列表"
    }
  ],
  "body": [
    {
      "title": "新增平台1",
      "type": "form",
      "redirect": "/plat/list",
      "name": "sample-edit-form",
      // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample",
      "api": {
        "method": "post",
        "url": "/api/plat/0.1",
        requestAdaptor: function (api) {
          console.log("🚀 ~ api", api)
          var newData = {
            ...api.data
          }
          newData.time = Number(newData.time)
          newData.category = Number(newData.category)
          newData.type=Number(newData.type)
          const payload= {
            ...api,
            data: {
              ...newData, // 获取暴露的 api 中的 data 变量
              
            }
          };
          console.log("🚀 ~ payload", payload)
          return payload;
        }
      },
      "controls": platFormItems
    }
  ]
}

export default platAddPage;