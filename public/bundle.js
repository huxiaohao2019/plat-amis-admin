(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.platApp = factory());
}(this, (function () { 'use strict';

    const platKvFlags = [
        {
            flagKey: 'tech',
            flagLabel: '技术参数'
        }, {
            flagKey: 'tactics',
            flagLabel: '主要武器'
        }, {
            flagKey: 'profile',
            flagLabel: '简况'
        }

    ];


    var kvFlags = {
        platKvFlags:platKvFlags
    };

    const requestAdaptor = function (api) {
        console.log("🚀 ~ requestAdaptor ~ api", api);
        console.log("🚀 ~ requestAdaptor ~ api.url", api.url);

        var urlHost=api.url.split('?')[0];

        var query = api.query;
        var page = query.page;
        var perPage = query.perPage;


        var limit = perPage;
        var offset = (page - 1) * perPage;
        api.url = urlHost + '?limit=' + limit + '&offset=' + offset;

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

    function objToKvList(obj) {
        let list = [];
        for (let key in obj) {
            let item = {
                key,
                value: obj[key]
            };
            list.push(item);
        }
        return list;
    }

    const platItemResponseAdapter = function (payload, response, api) {
        console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ api", api);
        console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ response", response);
        console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ payload", payload);

        var newItem = {
            ...payload,
            _origin: payload
        };

        var kvContainerList = [];


        kvFlags.platKvFlags.forEach(item => {
            let flagKey = item['flagKey'];
            if (typeof payload[flagKey] == 'object') {
                delete newItem[flagKey];
                var kvItems = objToKvList(payload[flagKey]);
                var kvContainer = { ...item, kvItems: kvItems };
                kvContainerList.push(kvContainer);
            }
        });
        newItem.kvContainerList = kvContainerList;
        console.log("🚀 ~ platItemResponseAdapter ~ newItem", newItem);

        var techKvList = objToKvList(payload['tech']);
        newItem.techKvList = techKvList;
        newItem.profileKvList = objToKvList(payload['profile']);
        newItem.tacticsKvList = objToKvList(payload['tactics']);


        return newItem;
    };



    var myutils = {
        requestAdaptor,
        listResponseAdapter,
        platItemResponseAdapter
    };

    const platList2={
        "type": "page",
        "title": "平台列表",
        "remark": null,
        "name": "page-demo",
        // "toolbar": [{
        //   "type": "button",
        //   "actionType": "link",
        //   "link": "/crud/url/url-add",
        //   "label": "新增",
        //   "primary": true
        // }],
        "body": [{
          "type": "crud",
          "name": "sample",
          "perPage": 10,
          "data": {
            "page": 1
          },
          // "api": {
          //   "method": "get",
          //   "url": "/api/app?limit=${page}"
          // },
          api: {
            method: 'get',
            url: '/api/plat/0.1',
            requestAdaptor: myutils.requestAdaptor,
            adaptor: myutils.listResponseAdapter
        },

          "filter": {
            "title": "",
            "mode": "inline",
            "wrapWithPanel": false,
            "submitText": "",
            "controls": [{
              "type": "text",
              "name": "keywords",
              "placeholder": "通过关键字搜索2",
              "addOn": {
                "label": "搜索",
                "type": "submit",
                "className": "btn-success"
              },
              "clearable": true
            }],
            "className": "m-b-sm"
          },
          "bulkActions": [{
              "label": "批量修改",
              "type": "button",
              "actionType": "dialog",
              "level": "primary",
              "dialog": {
                "title": "批量编辑",
                "name": "sample-bulk-edit",
                "body": {
                  "type": "form",
                  "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/bulkUpdate2",
                  "controls": [{
                    "type": "text",
                    "name": "engine",
                    "label": "Engine"
                  }]
                }
              }
            },
            {
              "label": "批量删除",
              "type": "button",
              "level": "danger",
              "actionType": "ajax",
              "api": "delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$ids",
              "confirmText": "确定要批量删除?"
            }
          ],
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
            name: 'type',
            label: 'type'
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
                    "link": "/plat/${id}"
                  },
                  {
                    "type": "button",
                    "label": "修改",
                    "level": "info",
                    "actionType": "link",
                    "link": "/crud/url/${id}/edit"
                  },
                  {
                    "type": "button",
                    "label": "删除",
                    "level": "danger",
                    "actionType": "ajax",
                    "confirmText": "您确认要删除?",
                    "api": "get:/api/url/destroy/${id}"
                  }
                ]
              }],
              "placeholder": "-",
              "fixed": "right"
            }
          ],
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
      };

    let platView = {
        "type": "page",

        "initApi": {
            method: 'get',
            url: "/api/plat/0.1/${params.id}",
            adaptor: myutils.platItemResponseAdapter
        },
        "toolbar": [{
            "type": "button",
            "actionType": "link",
            "link": "/plat/list?page=$page",
            "label": "返回列表2"
        }],
        "body": {
            "type": "panel",
            "body": [
                {
                    "type": "container",
                    "body": "<div style='font-size: 18px;padding: 4px;font-family:Simsun;text-align:center' class='plat-title'>${country}</div>"
                },
                {
                    "type": "page",
                    "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'>1.<span class='test1'>简况</span></div>"
                },
                {
                    "type": "page",
                    "body": {
                        "type": "each",
                        "name": "profileKvList",
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
                    "body": {
                        "type": "each",
                        "name": "techKvList",
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
                    "body": {
                        "type": "each",
                        "name": "tacticsKvList",
                        "items": {
                            "type": "tpl",
                            "tpl": "<div style='font-weight: 500' ><span class='sub-label' style=' color:#425EAF;'><span class='label-text' style='display:inline-block;min-width:56px;text-align:justify;'> <%= data.key %></span>: </span><span style='color:#595959;font-family:Simsun'> <%= data.value %></span></div> "
                        }
                    }
                }

            ]
        }
    };

    const vendorList={
        "type": "page",
        "title": "厂商列表",
        "remark": null,
        "name": "page-demo",
        // "toolbar": [{
        //   "type": "button",
        //   "actionType": "link",
        //   "link": "/crud/url/url-add",
        //   "label": "新增",
        //   "primary": true
        // }],
        "body": [{
          "type": "crud",
          "name": "sample",
          "perPage": 10,
          "data": {
            "page": 1
          },
          // "api": {
          //   "method": "get",
          //   "url": "/api/app?limit=${page}"
          // },
          api: {
            method: 'get',
            url: '/api/vendor/0.1',
            requestAdaptor: myutils.requestAdaptor,
            adaptor: myutils.listResponseAdapter
        },

          "filter": {
            "title": "",
            "mode": "inline",
            "wrapWithPanel": false,
            "submitText": "",
            "controls": [{
              "type": "text",
              "name": "keywords",
              "placeholder": "通过关键字搜索2",
              "addOn": {
                "label": "搜索",
                "type": "submit",
                "className": "btn-success"
              },
              "clearable": true
            }],
            "className": "m-b-sm"
          },
          "bulkActions": [{
              "label": "批量修改",
              "type": "button",
              "actionType": "dialog",
              "level": "primary",
              "dialog": {
                "title": "批量编辑",
                "name": "sample-bulk-edit",
                "body": {
                  "type": "form",
                  "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/bulkUpdate2",
                  "controls": [{
                    "type": "text",
                    "name": "engine",
                    "label": "Engine"
                  }]
                }
              }
            },
            {
              "label": "批量删除",
              "type": "button",
              "level": "danger",
              "actionType": "ajax",
              "api": "delete:https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$ids",
              "confirmText": "确定要批量删除?"
            }
          ],
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
                    "link": "/plat/${id}"
                  },
                  {
                    "type": "button",
                    "label": "修改",
                    "level": "info",
                    "actionType": "link",
                    "link": "/crud/url/${id}/edit"
                  },
                  {
                    "type": "button",
                    "label": "删除",
                    "level": "danger",
                    "actionType": "ajax",
                    "confirmText": "您确认要删除?",
                    "api": "get:/api/url/destroy/${id}"
                  }
                ]
              }],
              "placeholder": "-",
              "fixed": "right"
            }
          ],
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
                "schema": platList2,
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
                    "schemaApi": "get:/pages/vendor/vendor-add.json"
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
      brandName: '信息平台',
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

})));
