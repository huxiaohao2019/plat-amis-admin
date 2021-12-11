import deviceAddPage from "./device/device-add";
import deviceEdit from "./device/device-edit";
import deviceList from "./device/device-list";
import devicePlatList from "./device/device-plats";
import deviceView from "./device/device-view";
import platAddPage from "./plat/plat-add";
import platDeviceList from "./plat/plat-devices";
import platEdit from "./plat/plat-edit";
import platList from "./plat/plat-list";
import platView from "./plat/plat-view";
import vendorAddPage from "./vendor/vendor-add";
import vendorDeviceList from "./vendor/vendor-devices";
import vendorEdit from "./vendor/vendor-edit";
import vendorList from "./vendor/vendor-list";
import vendorView from "./vendor/vendor-view";

const exam = {
    "label": "列表示例",
    "url": "/crud",
    "rewrite": "/crud/list",
    "icon": "fa fa-cube",
    "children": [{
            "label": "列表",
            "url": "/crud/list",
            "icon": "fa fa-list",
            "schemaApi": "get:/pages/crud-list.json"
        },
        {
            "label": "新增",
            "url": "/crud/new",
            "icon": "fa fa-plus",
            "schemaApi": "get:/pages/crud-new.json"
        },
        {
            "label": "查看",
            "url": "/crud/:id",
            "schemaApi": "get:/pages/crud-view.json"
        },
        {
            "label": "修改",
            "url": "/crud/:id/edit",
            "schemaApi": "get:/pages/crud-edit.json"
        }
    ]
}

var platListNav = {
    "label": "平台列表",
    // "schema": {
    //     "type": "page",
    //     "title": "页面B",
    //     "body": "页面B"
    // }
    "url": "plat",
    "rewrite": "/plat/list",
    "url": "/plat/list",
    "icon": "fa fa-list",
    // "schema": platList,
    // "icon": "fa fa-cube",
    "schema": platList,
    "children": [{
            "label": "平台列表",
            "url": "/plat/list",
            "icon": "fa fa-list",
            "schema": platList
        },
        {
            "label": "添加APP",
            "url": "/crud/app/app-add",
            "icon": "fa fa-plus",
            "schemaApi": "get:/pages/app/app-add.json"
        },
        {
            "label": "新增",
            "url": "/crud/url/url-add",
            "icon": "fa fa-plus",
            "schemaApi": "get:/pages/url/url-add.json"
        },
        {
            "label": "查看",
            "url": "/crud/:id",
            "schemaApi": "get:/pages/crud-view.json"
        },
        {
            "label": "修改",
            "url": "/crud/:id/edit",
            "schemaApi": "get:/pages/crud-edit.json"
        }
    ]
}

const pageA = {
    "label": "页面A",
    "url": "index",
    "schema": {
        "type": "page",
        "title": "页面A",
        "body": "页面A"
    },
    "children": [{
            "label": "页面A-1",
            "url": "1",
            "schema": {
                "type": "page",
                "title": "页面A-1",
                "body": "页面A-1"
            }
        },
        {
            "label": "页面A-2",
            "url": "2",
            "schema": {
                "type": "page",
                "title": "页面A-2",
                "body": "页面A-2"
            }
        },
        {
            "label": "页面A-3",
            "url": "3",
            "schema": {
                "type": "page",
                "title": "页面A-3",
                "body": "页面A-3"
            }
        }
    ]
}

const pages = [{
        "label": "Home",
        "url": "/",
        "redirect": "/index/1"
    },
    {
        "label": "业务数据",
        "children": [

            // {
            //     "label": "页面C",
            //     "schema": {
            //         "type": "page",
            //         "title": "页面C",
            //         "body": "页面C"
            //     }
            // },
            // {
            //     "label": "平台列表1",
            //     "url": "/plat",
            //     "schemaApi": "post:/scheme/plat/list"
            // },
            // {
            //     "label": "平台列表",
            //     "url": "/plat2",
            //     "schemaApi": "get:/pages/crud-list.json"
            // },
            // {
            //     "label": "测试页",
            //     "url": "/testpage",
            //     "schemaApi": "get:/pages/testpage.json"
            // },
            // {
            //     "label": "平台详情",
            //     "url": "plat-detail/:id",
            //     "schemaApi": "get:/pages/plat/detail.json"
            // },
            {
                "label": "平台列表",
                "url": "/plat/list",
                "icon": "fa fa-list",
                "schema": platList,
                children: [{
                        "label": "添加平台",
                        "url": "/plat/add",
                        "icon": "fa fa-plus",
                        // "schemaApi": "get:/pages/plat/plat-add.json"
                        "schema": platAddPage
                    },

                    {
                        "label": "查看",
                        "url": "/plat/:id",
                        // "schemaApi": "get:/pages/plat/plat-view.json"
                        "schema": platView
                    },
                    {
                        "label": "修改",
                        "url": "/plat/:id/edit",
                        "schema": platEdit
                    },
                    {
                        "label": "平台装备",
                        "icon": "fa fa-plus",
                        "url": "/plat/:id/device",
                        "schema": platDeviceList
                    }
                ]
            },

            {
                "label": "厂商列表",
                "url": "/vendor/list",
                "icon": "fa fa-list",
                "schema": vendorList,
                children: [{
                        "label": "添加厂商",
                        "url": "/vender/add",
                        "icon": "fa fa-plus",
                        "schema": vendorAddPage
                    },

                    {
                        "label": "查看",
                        "url": "/vendor/:id",
                        // "schemaApi": "get:/pages/plat/plat-view.json"
                        "schema": vendorView
                    },
                    {
                        "label": "修改",
                        "url": "/vendor/:id/edit",
                        "schema": vendorEdit
                    }, {
                        "label": "设备列表",
                        "url": "/vendor/:id/device",
                        "schema": vendorDeviceList
                    }
                ]
            },


            {
                "label": "设备列表",
                "url": "/device/list",
                "icon": "fa fa-list",
                "schema": deviceList,
                children: [{
                        "label": "添加设备",
                        "url": "/device/add",
                        "icon": "fa fa-plus",
                        "schema": deviceAddPage
                    },

                    {
                        "label": "查看",
                        "url": "/device/:id",
                        // "schemaApi": "get:/pages/plat/plat-view.json"
                        "schema": deviceView
                    },
                    {
                        "label": "修改",
                        "url": "/device/:id/edit",
                        "schema": deviceEdit
                    },
                    {
                        "label": "平台",
                        "url": "/device/:id/plat",
                        "schema": devicePlatList
                    }
                ]
            }
            // ,exam
        ]
    },
    {
        "label": "分组2",
        "children": [{
                "label": "用户管理",
                "schema": {
                    "type": "page",
                    "title": "用户管理",
                    "body": "页面C"
                }
            },
            {
                "label": "外部链接",
                "link": "http://baidu.gitee.io/amis"
            },
            {
                "label": "部门管理",
                "schemaApi": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/service/form?tpl=tpl3"
            },
            {
                "label": "jsonp 返回示例",
                "schemaApi": "jsonp:/pages/jsonp.js?callback=jsonpCallback"
            }
        ]
    }
]

export default pages;