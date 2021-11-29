const pageList = (req, res, next) => {
    let pageJson = {
        "status": 0,
        "msg": "",
        "data": {
            "pages": [{
                    "label": "Home",
                    "url": "/",
                    "redirect": "/index/1"
                },
                {
                    "label": "示例",
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
                                        "body": {
                                            "type": "crud",
                                            api: {
                                                method: 'get',
                                                url: '/api/plat/0.1',
                                                requestAdaptor: function (api) {
                                                    console.log("🚀 ~ file: index.html ~ line 48 ~ api", api)
                                                    var query = api.query;
                                                    var page = query.page;
                                                    var perPage = query.perPage;
                        
                                                    var limit = perPage;
                                                    var offset = (page - 1) * perPage;
                                                    api.url = '/api/plat/0.1' + '?limit=' + limit + '&skip=' + offset;
                        
                                                    var obj1 = {
                                                        ...api
                        
                                                    };
                                                    console.log("🚀 ~ file: index.html ~ line 50 ~ obj1", obj1)
                        
                                                    return obj1;
                                                },
                                                adaptor: function (payload, response) {
                                                    console.log("🚀 ~ file: index.html ~ line 104 ~ payload", payload)
                                                    console.log("🚀 ~ file: index.html ~ line 104 ~ response", response)
                                                    // return {
                                                    //     ...payload,
                                                    //     status: payload.code === 200 ? 0 : payload.code
                                                    // };
                                                    return payload;
                                                }
                                            },
                                            "syncLocation": false,
                                            "columns": [{
                                                    "name": "id",
                                                    "label": "ID"
                                                },
                                                {
                                                    "name": "name",
                                                    "label": "Engine"
                                                },
                                                {
                                                    "name": "package_name",
                                                    "label": "Version"
                                                },
                                                {
                                                    "name": "platform",
                                                    "label": "Platform(s)"
                                                },
                                                {
                                                    "name": "version",
                                                    "label": "Engine version"
                                                },
                                                {
                                                    "name": "grade",
                                                    "label": "CSS grade"
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        },


                        {
                            "label": "页面B",
                            "schema": {
                                "type": "page",
                                "title": "页面B",
                                "body": "页面B"
                            }
                        },
                        {
                            "label": "测试页",
                            "url": "/crud/testpage",
                            "icon": "fa fa-plus",
                            "schemaApi": "get:/pages/testpage.json"
                        },
                        {
                            "label": "APP列表",
                            "url": "/crud/app",
                            "icon": "fa fa-list",
                            "schemaApi": "get:/pages/app/app-list.json",
                            "children": [{
                                    "label": "添加APP",
                                    "url": "/crud/app/app-add",
                                    "icon": "fa fa-plus",
                                    "schemaApi": "get:/pages/app/app-add.json"
                                },
                                {
                                    "label": "查看",
                                    "url": "/crud/app/:id",
                                    "schemaApi": "get:/pages/app/app-view.json"
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
        }
    }

    res.send(pageJson)
}

module.exports={pageList}