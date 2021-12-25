import myutils from "../../tools/myutils";
import platDataColumns from "../plat/plat-data-columns";
import devicePlatBindDiaLog from "./device-plat-bind";

const devicePlatOpeationItems = [{
  "type": "button",
  "label": "移除绑定",
  // "level": "info",
  "level": "danger",
  "actionType": "ajax",
  "confirmText": "确定移除该平台绑定?${name}",
  // http://127.0.0.1:8089/device/belonging/0.1/dev/4/plat/1
  "api": "delete:/api/device/belonging/0.1/dev/${params.id}/plat/${id}"
}]

const devicePlatItems = platDataColumns.concat(devicePlatOpeationItems)


const devicePlatList = {
  "type": "page",
  "title": "装备->平台列表",
  "remark": null,
  "name": "page-demo",
  "toolbar": [
    
    {
      "type": "button",
      "primary": true,
      "label": "添加平台绑定",
      "actionType": "dialog",
      "dialog": devicePlatBindDiaLog
    }
  ],
  "body": [{

    },
    {
      "type": "crud",
      "name": "sample",
      "perPage": 10,
      "data": {
        "page": 1
      },
      // "api": {
      //   "method": "get",
      //   "url": "/api/app?limit=${page}"
      // },
      api: {
        method: 'get',
        url: '/api/plat/0.1/device-id/${params.id}',
        //   requestAdaptor: myutils.requestAdaptor,
        adaptor: myutils.listResponseAdapter
      },

      "columns": devicePlatItems,
      "affixHeader": true,
      "columnsTogglable": "auto",
      "placeholder": "暂无数据",
      "tableClassName": "table-db table-striped",
      "headerClassName": "crud-table-header",
      "footerClassName": "crud-table-footer",
      "toolbarClassName": "crud-table-toolbar",
      "combineNum": 0,
      "bodyClassName": "panel-default"
    }
  ]
}

export default devicePlatList;