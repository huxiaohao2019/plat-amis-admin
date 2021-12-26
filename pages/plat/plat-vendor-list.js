import myutils from '../../tools/myutils';
import vendorDataColumns from '../vendor/components/vendor-data-columns';
import platVendorBindDiaLog from './plat-vendor-bind';



let columns = vendorDataColumns.map(v => v).filter(v=>{
    return v.label!='装备' && v.label!='平台'
})

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
                "link": "/vendor/${id}"
            },
            {
                "type": "button",
                "label": "移除绑定",
                // "level": "info",
                "level": "danger",
                "actionType": "ajax",
                "confirmText": "确定移除该厂商绑定?${name}",
                // http://127.0.0.1:8089/vendor/belonging/0.1/dev/4/plat/1
                // "api": "delete:/api/vendor/belonging/0.1/dev/${id}/plat/${params.id}"
                "api": "delete:/api/vendor/product/0.1/vendor/${id}/obj/1/obj-id/${params.id}"
            }
            // {
            //     "type": "button",
            //     "label": "修改",
            //     "level": "info",
            //     "actionType": "link",
            //     "link": "/vendor/${id}/edit"
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

const platVendorList = {
    "type": "page",
    "title": "平台->厂商列表",
    "remark": null,
    "name": "page-demo",
    "toolbar": [

        {
            "type": "button",
            "primary": true,
            "label": "添加厂商绑定",
            "actionType": "dialog",
            "dialog": platVendorBindDiaLog
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
            // url: '/api/vendor/0.1',
            url: '/api/vendor/0.1/plat-id/${params.id}',
            // url: '/api/vendor/0.1/plat-id/4',
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

export default platVendorList;