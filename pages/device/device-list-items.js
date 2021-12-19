var deviceListItems = [{
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
        "type": "link",
        "href": "/#/device/${id}/plat",
        "label": "平台",
        "name":"id",
        "blank":false,
        "body": "平台列表"
      },
    {
        "name": "info",
        "label": "备注",
        "sortable": true
    },
    {
        "name": "type",
        "label": "类型",
        "sortable": true
    },
    {
"name":"vendor_id",
"label":"生产厂商",
// "sortable":true,
"type":"link",
// "tpl":""
"href":"/#/vendor/${vendor_id}",
"blank":false,
        "body": "${vendor_name}"
    },
    {
        "name": "produce_time",
        "label": "生产日期",
        "type":"tpl",
        "tpl": "${produce_time|date:LLL:x}"
    }
]

export default deviceListItems