import deviceListItems from '../device/device-list-items';
import myutils from '../../tools/myutils';
import vendorDeviceBindDiaLog from './vendor-device-bind';


let columns = deviceListItems.map(v => v).filter(v => {
    return v.name !== 'vendor_id' && v.label != '平台'
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
                "link": "/device/${id}"
            },
            {
                "type": "button",
                "label": "移除绑定",
                // "level": "info",
                "level": "danger",
                "actionType": "ajax",
                "confirmText": "确定移除该设备绑定?${name}",
                "api": "delete:/api/vendor/product/0.1/vendor/${params.id}/obj/3/obj-id/${id}"
            }
        ]
    }],
    "placeholder": "-",
    "fixed": "right"
}
columns.push(operationItem)

const vendorDeviceList = {
    "type": "page",
    "title": "厂商->装备列表",
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
            "label": "添加设备绑定",
            "actionType": "dialog",
            "dialog": vendorDeviceBindDiaLog
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
            // url: '/api/device/0.1/vendor-id/${params.id}',
            url: '/api/device/0.1/vendor-id/:id',
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

export default vendorDeviceList;