import devicePlatBindDiaLog from "./device-plat-bind"
import deviceVendorBindDiaLog from "./device-vendor-bind"

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
        "type": "link",
        "href": "/#/device/${id}/plat",
        "label": "平台",
        "name": "id",
        "blank": false,
        "body": "平台列表"
    },
    {
        "name": "info",
        "label": "备注",
        "sortable": true
    },
    {
        "name": "type",
        "label": "类型",
        "sortable": true,
        "type": "mapping",
        // "value": "1",
        "map": {
            "1": "雷达",
            "2": "通信设备",
            "3": "电子战",
            "4":"导航",
            "5":"敌我识别器",
            "6":"声呐",
            "7":"光电探测",
            "*": "其他"
        }

    },
    {
        "name": "vendor_id",
        "type": "container",
        "label": "生产厂商",

        "body": [{
                "type": "link",
                "href": "/#/vendor/${vendor_id}",
                "blank": false,
                "className": "mr-1.5",
                "visibleOn": "this.vendor_id",
                "body": "${vendor_name}",
            },
            {

                "name": "vendor-bind",
                "type": "button",
                "size": "xs",
                // "primary": true,
                "label": "添加",
                "actionType": "dialog",
                "dialog": deviceVendorBindDiaLog,
                "visibleOn": "!this.vendor_id"
            },
            {
                "name": "vendor-bind",
                "type": "button",
                "size": "xs",
                // "primary": true,
                "label": "移除",

                "level": "danger",
                "actionType": "dialog",
                // "dialog": deviceVendorBindDiaLog,
                "visibleOn": "this.vendor_id",
                "actionType": "ajax",
                "confirmText": "确定移除该厂商绑定?${name}",
                "api": "delete:/api/vendor/product/0.1/vendor/${vendor_id}/obj/3/obj-id/${id}"
            },
        ]
    },

    // {
    //     "name": "vendor-bind",
    //     "type": "button",
    //     "primary": true,
    //     "label": "修改",
    //     "actionType": "dialog",
    //     "dialog": deviceVendorBindDiaLog
    //     // "dialog": devicePlatBindDiaLog
    // },
    // {
    //     "name": "vendor_id",
    //     "label": "生产厂商",
    //     // "sortable":true,
    //     "type": "link",
    //     // "tpl":""
    //     "href": "/#/vendor/${vendor_id}",
    //     "blank": false,
    //     "body": "${vendor_name}",

    // },
    {
        "name": "produce_time",
        "label": "生产日期",
        "type": "tpl",
        "tpl": "${produce_time|date:LLL:x}"
    }
]

export default deviceListItems