let platListItems=[{
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
    "type": "link",
    "href": "/#/plat/${id}/device",
    "label": "装备",
    "name":"id",
    "blank":false,
    "body": "装备列表"
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
]

export default platListItems;