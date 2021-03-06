import deviceListItems from '../device/device-list-items';
import myutils from '../../tools/myutils';
import platDeviceBindDiaLog from './plat-device-bind';



let columns = deviceListItems.map(v => v).filter(v => {
    // return v.name != 'vendor_id'
    // return /vendor_id/
    if (v.name == 'vendor_id') {
        return false;
    }

    if (v.label == '平台') {
        return false;
    }
    return true;
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
                // http://127.0.0.1:8089/device/belonging/0.1/dev/4/plat/1
                "api": "delete:/api/device/belonging/0.1/dev/${id}/plat/${params.id}"
            }
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

const platDeviceList = {
    "type": "page",
    "title": "平台->装备列表",
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
            "dialog": platDeviceBindDiaLog
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
            // url: '/api/device/0.1/plat-id/${params.id}',
            // url: '/api/device/0.1',
            url: '/api/device/0.1/plat-id/:id',
            data: {
                $id: '${params.id}',
                orderBy: '${orderBy}',
                orderDir: "${orderDir}"
            },
            requestAdaptor: myutils.subListRequestAdaptor,
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

export default platDeviceList;