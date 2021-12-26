import myutils from '../../tools/myutils'
import vendorDataColumns from './components/vendor-data-columns';

let operateItem = {
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
        "link": "/vendor/${id}"
      },
      {
        "type": "button",
        "label": "修改",
        "level": "info",
        "actionType": "link",
        // "link": "/vendor/${id}/edit?page=${page}"
        "link": "/vendor/${id}/edit"
      },
      {
        "type": "button",
        "label": "删除",
        "level": "danger",
        "actionType": "ajax",
        "confirmText": "您确认要删除?",
        "api": "delete:/api/vendor/0.1/${id}"
      }
    ]
  }],
  "placeholder": "-",
  "fixed": "right"
}

const vendorList = {
  "type": "page",
  "title": "厂商列表",
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
    // "data": {
    //   "page": 1
    // },
    // "api": {
    //   "method": "get",
    //   "url": "/api/app?limit=${page}"
    // },
    api: {
      method: 'get',
      url: '/api/vendor/0.1',
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
        "name": "country,name",
        "placeholder": "通过关键字搜索",
        "addOn": {
          "label": "搜索",
          "type": "submit",
          "className": "btn-success"
        },
        "clearable": true
      }],
      "className": "m-b-sm"
    },
    "bulkActions": [],
    "columns": vendorDataColumns.concat([operateItem]),

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

export default vendorList;