let vendorDataColumns = [{
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
        "name": "country",
        "label": "国家(地区)",
        "sortable": true
    },
    {
        "type": "link",
        "href": "/#/vendor/${id}/device",
        "label": "装备",
        "name": "id",
        "blank": false,
        "body": "装备列表"
    },
    {
        "type": "link",
        "href": "/#/vendor/${id}/plat",
        "label": "平台",
        "name": "id",
        "blank": false,
        "body": "平台列表"
    }
]

export default vendorDataColumns;