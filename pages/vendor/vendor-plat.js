import myutils from '../../tools/myutils';
import platDataColumns from '../plat/plat-data-columns';
import vendorPlatBindDiaLog from './vendor-plat-bind';


let columns = platDataColumns.map(v => v).filter(v=>{
    return v.name!=='vendor_id' && v.label!='装备' && v.label!='厂商'
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
                "link": "/plat/${id}"
            },

            {
                "type": "button",
                "label": "移除绑定",
                // "level": "info",
                "level": "danger",
                "actionType": "ajax",
                "confirmText": "确定移除该平台绑定?${name}",
                "api": "delete:/api/vendor/product/0.1/vendor/${params.id}/obj/1/obj-id/${id}"
            }

           
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
            "actionType": "button",
            "label": "返回",
  
            onClick: () => {
              window.history.back();
            }
          },
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
            // url: '/api/plat/0.1/vendor-id/${params.id}',
            url: '/api/plat/0.1/vendor-id/:id',
            data: {
                $id: '${params.id}',
                orderBy: '${orderBy}',
                orderDir: "${orderDir}"
            },
            requestAdaptor: myutils.subListRequestAdaptor,
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