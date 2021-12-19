import myutils from "../../tools/myutils";
import platListItems from "../plat/plat-list-item";

const devicePlatList = {
    "type": "page",
    "title": "装备->平台列表",
    "remark": null,
    "name": "page-demo",
    "toolbar": [
    //     {
    //   "type": "button",
    //   "actionType": "link",
    //   "link": "/crud/url/url-add",
    //   "label": "添加平台绑定",
    //   "primary": true
    // },
    {
        "type": "button",
        "primary": true,
        "label": "添加平台绑定",
        "actionType": "dialog",
        "dialog": {
          "title": "添加平台绑定",
          "body": "Hello World!"
        }
    }
],
    "body": [{

        },
        {
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
                url: '/api/plat/0.1/device-id/${params.id}',
                //   requestAdaptor: myutils.requestAdaptor,
                adaptor: myutils.listResponseAdapter
            },

            "columns": platListItems,
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
    ]
}

export default devicePlatList;