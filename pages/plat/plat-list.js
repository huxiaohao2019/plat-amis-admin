import myutils from '../../tools/myutils'

const platList = {
    "type": "page",
    "remark": null,
                  "name": "page-demo",
    "body": {
        "type": "crud",
        "perPage": 10,
        api: {
            method: 'get',
            url: '/api/plat/0.1',
            requestAdaptor: myutils.requestAdaptor,
            adaptor: myutils.listResponseAdapter
        },
        "data": {
            "page": 1
          },
        "filter": {
            "title": "",
            "mode": "inline",
            "wrapWithPanel": false,
            "submitText": "",
            "controls": [{
                "type": "text",
                "name": "keywords",
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
        "syncLocation": false,
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
                name:'type',
                label:'type'
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
                            "link": "/plat/${id}?page=$page"
                        },
                        {
                            "type": "button",
                            "label": "修改",
                            "level": "info",
                            "actionType": "link",
                            "link": "/crud/${id}/edit"
                        },
                        {
                            "type": "button",
                            "label": "删除",
                            "level": "danger",
                            "actionType": "ajax",
                            "confirmText": "您确认要删除?",
                            "api": "delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id"
                        }
                    ]
                }],
                "affixHeader": true,
                    "columnsTogglable": "auto",
                    "placeholder": "暂无数据",
                    "tableClassName": "table-db table-striped",
                    "headerClassName": "crud-table-header",
                    "footerClassName": "crud-table-footer",
                    "toolbarClassName": "crud-table-toolbar",
                    "combineNum": 0,
                    "bodyClassName": "panel-default"
            }
        ],
    }
}

export default platList;