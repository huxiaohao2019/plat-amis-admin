import platList from "./plat/plat-list";

const pages = [{
        "label": "Home",
        "url": "/",
        "redirect": "/index/1"
    },
    {
        "label": "业务数据",
        "children": [{
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
            },

            {
                "label": "页面C",
                "schema": {
                    "type": "page",
                    "title": "页面C",
                    "body": "页面C"
                }
            },
            // {
            //     "label": "平台列表1",
            //     "url": "/plat",
            //     "schemaApi": "post:/scheme/plat/list"
            // },
            {
                "label": "平台列表",
                "url": "/plat2",
                "schemaApi": "get:/pages/crud-list.json"
            },
            {
                "label": "测试页",
                "url": "/testpage",
                "schemaApi": "get:/pages/testpage.json"
            },
            {
                "label": "平台详情",
                "url": "plat-detail/:id",
                "schemaApi": "get:/pages/plat/detail.json"
            },
            {
                "label": "平台列表",
                // "schema": {
                //     "type": "page",
                //     "title": "页面B",
                //     "body": "页面B"
                // }
                "url": "plat",
                "rewrite": "/plat/list",
                // "icon": "fa fa-cube",
                // "schema": platList,
                "children": [
                    {
                        "label": "列表",
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
                    // {
                    //   "label": "新增",
                    //   "url": "/crud/url/url-add",
                    //   "icon": "fa fa-plus",
                    //   "schemaApi": "get:/pages/url/url-add.json"
                    // },
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
            },
            {
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