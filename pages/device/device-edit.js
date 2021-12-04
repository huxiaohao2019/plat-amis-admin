import deviceFormItems from "./device-form-items";

const deviceEdit =
{
  "type": "page",
  "title": "修改 ${params.id}",
  "remark": null,
  "toolbar": [
    {
      "type": "button",
      "actionType": "link",
      "link": "/device/list",
      "label": "返回列表"
    }
  ],
  "body": [
    {
      "type": "form",
      "initApi": "/api/device/0.1/${params.id}",
      // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id",
      "api": {
        "method": "PUT",
        "url":"/api/device/0.1/${params.id}",
        requestAdaptor: function (api) {
          console.log("🚀 ~ api", api)
          var newData = {
            ...api.data
          }
          newData.produce_time = Number(newData.produce_time)
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
      "redirect": "/vendor/list",
      "controls": deviceFormItems
    }
  ]
}

export default deviceEdit;