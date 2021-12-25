let platDataColumns=[
    {
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
      label: '类型'
    },
    {
      "name": "country",
      "label": "国家(地区)",
      "sortable": true
    }
  ]

  export default platDataColumns;