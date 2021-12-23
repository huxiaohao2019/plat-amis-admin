import myutils from '../../tools/myutils'

import deviceListItems from './device-list-items';

let columns = deviceListItems.map(v => v);

let operationItem= {
  "type": "operation",
  "label": "操作",
  "width": "",
  "buttons": [{
    "type": "button-group",
    "buttons": [{
        "type": "button",
        "label": "查看",
        "level": "primary",
        "actionType": "link",
        "link": "/device/${id}"
      },
      {
        "type": "button",
        "label": "修改",
        "level": "info",
        "actionType": "link",
        "link": "/device/${id}/edit"
      },
      {
        "type": "button",
        "label": "删除",
        "level": "danger",
        "actionType": "ajax",
        "confirmText": "您确认要删除?",
        // "api": "get:/api/url/destroy/${id}"
        "api": "delete:/api/device/0.1/${id}"
      }
    ]
  }],
  "placeholder": "-",
  "fixed": "right"
}
columns.push(operationItem)


const deviceList = {
  "type": "page",
  "title": "装备列表",
  "remark": null,
  "name": "page-demo",
  // "toolbar": [{
  //   "type": "button",
  //   "actionType": "link",
  //   "link": "/crud/url/url-add",
  //   "label": "新增",
  //   "primary": true
  // }],
  "body": [{
    "type": "crud",
    "name": "sample",
    "perPage": 10,
    "data": {
      "page": 1
    },
    api: {
      method: 'get',
      url: '/api/device/0.1',
      requestAdaptor: myutils.requestAdaptor,
      adaptor: myutils.listResponseAdapter
    },

    "filter": {
      "title": "",
      "mode": "inline",
      "wrapWithPanel": false,
      "submitText": "",
      "controls": [{
        "type": "text",
        "name": "name,info,id",
        "placeholder": "通过关键字搜索2",
        "addOn": {
          "label": "搜索",
          "type": "submit",
          "className": "btn-success"
        },
        "clearable": true
      }],
      "className": "m-b-sm"
    },
    "bulkActions": [
    ],
    "columns": columns,
    "affixHeader": true,
    "columnsTogglable": "auto",
    "placeholder": "暂无数据",
    "tableClassName": "table-db table-striped",
    "headerClassName": "crud-table-header",
    "footerClassName": "crud-table-footer",
    "toolbarClassName": "crud-table-toolbar",
    "combineNum": 0,
    "bodyClassName": "panel-default"
  }]
}

export default deviceList;