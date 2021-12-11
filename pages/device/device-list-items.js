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
        "name": "produce_time",
        "label": "生产日期",
        "type":"tpl",
        "tpl": "${produce_time|date:LLL:x}"
    }
]

export default deviceListItems