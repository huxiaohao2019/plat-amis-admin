import myutils from '../../tools/myutils'
import platTypes from './plat-types';
import platVendorBindDiaLog from './plat-vendor-bind';

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
  //   "primary": true
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
    "columns": [{
        "name": "id",
        "label": "ID",
        "width": 20,
        "sortable": true
      },
      {
        "name": "name",
        "label": "名称",
        "sortable": true
      },
      {
        "name": "time",
        "type": "tpl",
        "label": "时间",
        "tpl": "${time|date:LLL:x}"

      },
      {
        "label": "装备",
        "name": "id",
        "type": "link",
        "href": "/#/plat/${id}/device",
        "blank": false,
        "body": "装备列表"
      },

      {
        "name": "vendor_id",
        "type": "container",
        "label": "生产厂商",

        "body": [{
            "type": "link",
            "href": "/#/vendor/${vendor_id}",
            "blank": false,
            "className": "mr-1.5",
            "visibleOn": "this.vendor_id",
            "body": "${vendor_name}",
          },
          {

            "name": "vendor-bind",
            "type": "button",
            "size": "xs",
            // "primary": true,
            "label": "添加",
            "actionType": "dialog",
            // "dialog": deviceVendorBindDiaLog,
            "dialog": platVendorBindDiaLog,
            "visibleOn": "!this.vendor_id"
          },
          {
            "name": "vendor-bind",
            "type": "button",
            "size": "xs",
            "label": "移除",

            "level": "danger",
            "visibleOn": "this.vendor_id",

            "actionType": "ajax",
            "confirmText": "确定移除该厂商绑定?${name}",
            "api": "delete:/api/vendor/product/0.1/vendor/${vendor_id}/obj/1/obj-id/${id}"
          },
        ]
      },



      {
        name: 'type',
        label: '类型',
        "type": "mapping",
        "map": platTypes
      },
      {
        "name": "country",
        "label": "国家(地区)",
        "sortable": true
      },

      {
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
              "link": "/plat/${id}"
            },
            {
              "type": "button",
              "label": "修改",
              "level": "info",
              "actionType": "link",
              "link": "/plat/${id}/edit"
            },
            {
              "type": "button",
              "label": "删除",
              "level": "danger",
              "actionType": "ajax",
              "confirmText": "您确认要删除?",
              // "api": "get:/api/url/destroy/${id}"
              "api": "delete:/api/plat/0.1/${id}"
            }
          ]
        }],
        "placeholder": "-",
        "fixed": "right"
      }
    ],
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