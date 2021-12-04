import myutils from '../../tools/myutils'

const platList2={
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
      "data": {
        "page": 1
      },
      // "api": {
      //   "method": "get",
      //   "url": "/api/app?limit=${page}"
      // },
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
      "bulkActions": [{
          "label": "批量修改",
          "type": "button",
          "actionType": "dialog",
          "level": "primary",
          "dialog": {
            "title": "批量编辑",
            "name": "sample-bulk-edit",
            "body": {
              "type": "form",
              "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/bulkUpdate2",
              "controls": [{
                "type": "text",
                "name": "engine",
                "label": "Engine"
              }]
            }
          }
        },
        {
          "label": "批量删除",
          "type": "button",
          "level": "danger",
          "actionType": "ajax",
          "api": "delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$ids",
          "confirmText": "确定要批量删除?"
        }
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
        "label": "time"
    },
    {
        name: 'type',
        label: 'type'
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
                "api": "get:/api/url/destroy/${id}"
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