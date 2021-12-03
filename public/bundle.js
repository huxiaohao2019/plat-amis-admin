(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.platApp = factory());
})(this, (function () { 'use strict';

    const requestAdaptor = function (api) {
        console.log("🚀 ~ file: index.html ~ line 48 ~ api", api);
        var query = api.query;
        var page = query.page;
        var perPage = query.perPage;

        var limit = perPage;
        var offset = (page - 1) * perPage;
        api.url = '/api/plat/0.1' + '?limit=' + limit + '&offset=' + offset;

        var obj1 = {
            ...api
        };
        console.log("🚀 ~ file: index.html ~ line 50 ~ obj1", obj1);

        return obj1;
    };

    const listResponseAdapter = function (payload, response) {
        console.log("🚀 ~ file: index.html ~ line 104 ~ payload", payload);
        console.log("🚀 ~ file: index.html ~ line 104 ~ response", response);
        // return {
        //     ...payload,
        //     status: payload.code === 200 ? 0 : payload.code
        // };
        console.log("🚀 ~ file: myutils.js ~ line 32 ~ listResponseAdapter ~ response.headers['sum']", response.headers['sum']);
        var amisList = {
            msg: '',
            status: '0',
            data: {
                "rows": payload,
                "count": response.headers['sum']
            }
        };

        return amisList;
    };

    const platItemResponseAdapter = function (payload, response) {
        return payload;
    };



    var myutils = {
        requestAdaptor,
        listResponseAdapter,
        platItemResponseAdapter
    };

    const platList = {
        "type": "page",
        "remark": null,
                      "name": "page-demo",
        "body": {
            "type": "crud",
            "perPage": 10,
            api: {
                method: 'get',
                url: '/api/plat/0.1',
                requestAdaptor: myutils.requestAdaptor,
                adaptor: myutils.listResponseAdapter
            },
            "data": {
                "page": 1
              },
            "filter": {
                "title": "",
                "mode": "inline",
                "wrapWithPanel": false,
                "submitText": "",
                "controls": [{
                    "type": "text",
                    "name": "keywords",
                    "placeholder": "通过关键字搜索",
                    "addOn": {
                        "label": "搜索",
                        "type": "submit",
                        "className": "btn-success"
                    },
                    "clearable": true
                }],
                "className": "m-b-sm"
            },
            "syncLocation": false,
            "columns": [{
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
                    "name": "time",
                    "label": "time"
                },
                {
                    name:'type',
                    label:'type'
                },
                {
                    "name": "country",
                    "label": "国家(地区)",
                    "sortable": true
                },
                {
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
                                "link": "/plat/${id}?page=$page"
                            },
                            {
                                "type": "button",
                                "label": "修改",
                                "level": "info",
                                "actionType": "link",
                                "link": "/crud/${id}/edit"
                            },
                            {
                                "type": "button",
                                "label": "删除",
                                "level": "danger",
                                "actionType": "ajax",
                                "confirmText": "您确认要删除?",
                                "api": "delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id"
                            }
                        ]
                    }],
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
            ],
        }
    };

    const platView= {
        "type": "page",
        "initApi": "/api/plat/0.1/${params.id}",
        "adapter":myutils.platItemResponseAdapter,
        "toolbar": [{
            "type": "button",
            "actionType": "link",
            "link": "/plat/list?page=$page",
            "label": "返回列表"
        }],
        "body": {
            "type": "panel",
            "body": [{
                    "type": "page",
                    "data": "${profile}"
                },
                {
                    "type": "container",
                    "body": "<div style='font-size: 18px;padding: 4px;font-family:Simsun;text-align:center' class='plat-title'>${name}</div>"
                },
                {
                    "type": "page",
                    "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'>1.<span class='test1'>简况</span></div>"
                },
                {
                    "type": "page",
                    "data": {
                        "arr": [{
                                "key": "舷号",
                                "value": "SSBN730～743"
                            },
                            {
                                "key": "服役时间",
                                "value": "1984～1997年"
                            },
                            {
                                "key": "生产厂商",
                                "value": "美国通用动力公司电船分公司"
                            },
                            {
                                "key": "装备数量",
                                "value": "14艘"
                            }
                        ]
                    },
                    "body": {
                        "type": "each",
                        "name": "arr",
                        "items": {
                            "type": "tpl",
                            "tpl": "<div style='font-weight: 500' ><span class='sub-label' style=' color:#425EAF;'><span class='label-text' style='display:inline-block;min-width:56px;text-align:justify;'> <%= data.key %></span>: </span><span style='color:#595959;font-family:Simsun'> <%= data.value %></span></div> "
                        }
                    }
                },
                {
                    "type": "page",
                    "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'>2.<span class='test1'>基本性能参数</span></div>"
                },
                {
                    "type": "page",
                    "data": {
                        "arr": [{
                                "key": "吃水",
                                "value": "11.1米"
                            },
                            {
                                "key": "舰宽",
                                "value": "12.8米"
                            },
                            {
                                "key": "舰长",
                                "value": "170.7米"
                            },
                            {
                                "key": "排水量",
                                "value": "19000吨（水下）"
                            },
                            {
                                "key": "下潜深度",
                                "value": "244米"
                            },
                            {
                                "key": "人员编制",
                                "value": "155名（军官15名）"
                            },
                            {
                                "key": "水下航速",
                                "value": "24节"
                            }
                        ]
                    },
                    "body": {
                        "type": "each",
                        "name": "arr",
                        "items": {
                            "type": "tpl",
                            "tpl": "<div style='font-weight: 500' ><span class='sub-label' style=' color:#425EAF;'><span class='label-text' style='display:inline-block;min-width:56px;text-align:justify;'> <%= data.key %></span>: </span><span style='color:#595959;font-family:Simsun'> <%= data.value %></span></div> "
                        }
                    }
                },
                {
                    "type": "page",
                    "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'>3.<span class='test1'>主要武器</span></div>"
                },
                {
                    "type": "page",
                    "data": {
                        "arr": [{
                                "key": "导弹",
                                "value": "“战斧”BlockⅣ巡航导弹"
                            },
                            {
                                "key": "鱼雷",
                                "value": "MK48ADCAPMod5/6/7重型鱼雷"
                            },
                            {
                                "key": "火控系统",
                                "value": "AN/BYG-1战斗控制系统"
                            }
                        ]
                    },
                    "body": {
                        "type": "each",
                        "name": "arr",
                        "items": {
                            "type": "tpl",
                            "tpl": "<div style='font-weight: 500' ><span class='sub-label' style=' color:#425EAF;'><span class='label-text' style='display:inline-block;min-width:56px;text-align:justify;'> <%= data.key %></span>: </span><span style='color:#595959;font-family:Simsun'> <%= data.value %></span></div> "
                        }
                    }
                }
            ]
        }
    };

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
                            "schemaApi": "get:/pages/plat/plat-add.json"
                        },

                        {
                            "label": "查看",
                            "url": "/plat/:id",
                            // "schemaApi": "get:/pages/plat/plat-view.json"
                            "schema": platView
                        },
                        {
                            "label": "修改",
                            "url": "/crud/:id/edit",
                            "schemaApi": "get:/pages/crud-edit.json"
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
    ];

    const app = {
      type: 'app',
      brandName: '武器平台',
      logo: '/public/logo.png',
      header: {
        type: 'tpl',
        inline: false,
        className: 'w-full',
        tpl: '<div class="flex justify-between"><div>顶部区域左侧</div><div>顶部区域右侧</div></div>'
      },
      // footer: '<div class="p-2 text-center bg-light">底部区域</div>',
      // asideBefore: '<div class="p-2 text-center">菜单前面区域</div>',
      // asideAfter: '<div class="p-2 text-center">菜单后面区域</div>',
      // api: '/pages/site.json'
      pages:pages
    };
    var main = {
      amisApp: app
    };

    return main;

}));
