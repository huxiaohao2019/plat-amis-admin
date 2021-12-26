import myutils from '../../tools/myutils'
import platListOperationItems from './components/platListOperationItems';
import platDataColumns from './plat-data-columns';

let columns=platDataColumns.concat(platListOperationItems)

const platList2 = {
  "type": "page",
  "title": "平台列表",
  "remark": null,
  "name": "page-demo",
  // "toolbar": [{
  //   "type": "button",
  //   "actionType": "link",
  //   "link": "/crud/url/url-add",
  //   "label": "新增",
  //   "primary": true.
  // }],
  "body": [{
    "type": "crud",
    "name": "sample",
    "perPage": 10,

    api: {
      method: 'get',
      url: '/api/plat/0.1',
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

export default platList2;