import deviceFormItems from "./device-form-items";

const deviceAddPage = {
  "type": "page",
  "title": "新增",
  "remark": null,
  "toolbar": [{
    "type": "button",
    "actionType": "button",
    "label": "返回",
    onClick: () => {
      window.history.back();
    }
  }],
  "body": [{
    "title": "新增设备1",
    "type": "form",
    "redirect": "/device/list",
    "name": "sample-edit-form",
    // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample",
    "api": {
      "method": "post",
      "url": "/api/device/0.1",
      requestAdaptor: function (api) {
        console.log("🚀 ~ api", api)
        var newData = {
          ...api.data
        }
        newData.produce_time = Number(newData.produce_time)
        newData.type = Number(newData.type)
        const payload = {
          ...api,
          data: {
            ...newData, // 获取暴露的 api 中的 data 变量

          }
        };
        console.log("🚀 ~ payload", payload)
        return payload;
      }
    },
    "controls": deviceFormItems
  }]
}

export default deviceAddPage;