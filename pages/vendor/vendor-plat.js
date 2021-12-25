import myutils from '../../tools/myutils';
import platDataColumns from '../plat/plat-data-columns';
import vendorPlatBindDiaLog from './vendor-plat-bind';


let columns = platDataColumns.map(v => v);

let operationItem = {
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
            // {
            //     "type": "button",
            //     "label": "修改",
            //     "level": "info",
            //     "actionType": "link",
            //     "link": "/device/${id}/edit"
            // },
            // {
            //     "type": "button",
            //     "label": "删除",
            //     "level": "danger",
            //     "actionType": "ajax",
            //     "confirmText": "您确认要删除?",
            //     "api": "get:/api/url/destroy/${id}"
            // }
        ]
    }],
    "placeholder": "-",
    "fixed": "right"
}
columns.push(operationItem)

const vendorPlatList = {
    "type": "page",
    "title": "厂商->平台列表",
    "remark": null,
    "name": "page-demo",
    "toolbar": [

        {
            "type": "button",
            "primary": true,
            "label": "添加平台绑定",
            "actionType": "dialog",
            "dialog": vendorPlatBindDiaLog
        }
    ],
    "body": [{
        "type": "crud",
        "name": "sample",
        "perPage": 100,
        // "data": {
        //   "page": 1
        // },
        api: {

            method: 'get',
            // url: '/api/device/0.1',
            url: '/api/plat/0.1/vendor-id/${params.id}',
            // url: '/api/device/0.1/plat-id/4',
            // requestAdaptor: myutils.requestAdaptor,
            adaptor: myutils.listResponseAdapter
        },


        "columns": columns,
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

export default vendorPlatList;