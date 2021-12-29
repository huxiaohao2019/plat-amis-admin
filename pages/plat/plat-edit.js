import platFormItems from "./plat-form-item";

const platItemResponseAdapter = function (payload, response, api) {
  console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ api", api)
  console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ response", response)
  console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ payload", payload)

  var newItem = {
    ...payload,
    _origin: payload
  }

  if (payload.img && payload.img.file_data) {
    newItem.imgSrc = 'data:image/jpeg;base64,' + payload.img.file_data;
  }

  return newItem;
}

const platEdit = {
  "type": "page",
  "title": "修改 - ${title}",
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
    "type": "form",
    // "initApi": "/api/plat/0.1/${params.id}",
    "initApi": {
      method: 'get',
      url: "/api/plat/0.1/${params.id}",
      adaptor: platItemResponseAdapter
    },
    // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id",
    "api": {
      "method": "PUT",
      "url": "/api/plat/0.1/${params.id}",
      requestAdaptor: function (api) {
        console.log("🚀 ~ api", api)
        var newData = {
          ...api.data
        }
        newData.produce_time = Number(newData.produce_time)
        newData.type = Number(newData.type)
        if (/^data:image/g.test(newData.file)) {
          let base64_1 = newData.file.replace(/data:.+base64,/, '');
          newData.img.file_data = base64_1;
        }

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
    "redirect": "/plat/list?page=${page}",
    "controls": platFormItems

  }]
}

export default platEdit;