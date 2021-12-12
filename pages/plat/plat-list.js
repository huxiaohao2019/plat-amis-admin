import myutils from '../../tools/myutils'

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
        "type":"tpl",
        "label": "time",
        "tpl": "${time|date:LLL:x}"
       
      },
      {
        "label": "装备",
        "name":"id",
        "type": "link",
        "href": "/#/plat/${id}/device",
        "blank":false,
        "body": "装备列表"
      },
      // {
      //   "name": "time",
      //   "label": "映射",
      //   "type": "mapping",
      //   "map": {
      //     "1": "<span class='label label-info'>漂亮</span>",
      //     "2": "<span class='label label-success'>开心</span>",
      //     "3": "<span class='label label-danger'>惊吓</span>",
      //     "4": "<span class='label label-warning'>紧张</span>",
      //     "*": "<span class='label label-warning'>紧张</span>${time}"
      //   }
      // },
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