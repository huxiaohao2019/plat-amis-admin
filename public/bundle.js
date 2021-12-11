(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.platApp = factory());
})(this, (function () { 'use strict';

    const deviceFormItems = [
        {
            "type": "text",
            "name": "name",
            "label": "名称",
            "required": true
        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "name": "type",
            "label": "类型",
        },
        {
            "type": "input-kv",
            "name": "tech",
            "label": "技术参数"

        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "name": "produce_time",
            "label": "生产日期",
        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "name": "info",
            "label": "备注",
        }

    ];

    const deviceAddPage =
    {
      "type": "page",
      "title": "新增",
      "remark": null,
      "toolbar": [
        {
          "type": "button",
          "actionType": "link",
          "link": "/deivce/list",
          "label": "返回列表"
        }
      ],
      "body": [
        {
          "title": "新增设备1",
          "type": "form",
          "redirect": "/device/list",
          "name": "sample-edit-form",
          // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample",
          "api": {
            "method": "post",
            "url": "/api/device/0.1",
            requestAdaptor: function (api) {
              console.log("🚀 ~ api", api);
              var newData = {
                ...api.data
              };
              newData.produce_time = Number(newData.produce_time);
              newData.type=Number(newData.type);
              const payload= {
                ...api,
                data: {
                  ...newData, // 获取暴露的 api 中的 data 变量
                  
                }
              };
              console.log("🚀 ~ payload", payload);
              return payload;
            }
          },
          "controls": deviceFormItems
        }
      ]
    };

    const deviceEdit =
    {
      "type": "page",
      "title": "修改 ${params.id}",
      "remark": null,
      "toolbar": [
        {
          "type": "button",
          "actionType": "link",
          "link": "/device/list",
          "label": "返回列表"
        }
      ],
      "body": [
        {
          "type": "form",
          "initApi": "/api/device/0.1/${params.id}",
          // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id",
          "api": {
            "method": "PUT",
            "url":"/api/device/0.1/${params.id}",
            requestAdaptor: function (api) {
              console.log("🚀 ~ api", api);
              var newData = {
                ...api.data
              };
              newData.produce_time = Number(newData.produce_time);
              newData.type=Number(newData.type);
              const payload= {
                ...api,
                data: {
                  ...newData, // 获取暴露的 api 中的 data 变量
                  
                }
              };
              console.log("🚀 ~ payload", payload);
              return payload;
            }
          },
          "redirect": "/device/list",
          "controls": deviceFormItems
        }
      ]
    };

    const platKvFlags = [
        {
            flagKey: 'tech',
            flagLabel: '技术参数'
        }, {
            flagKey: 'weapons',
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

        var urlHost = api.url.split('?')[0];

        var query = api.query;
        var page = query.page;
        var perPage = query.perPage;


        var limit = perPage;
        var offset = (page - 1) * perPage;

        var newQuery = {
            ...query,
        };
        delete newQuery['page'];
        delete newQuery['perPage'];

        let subQueryList = [];

        for (let key in newQuery) {
            if (/.*,.*/.test(key)) {
                let value = newQuery[key];
                let subKeys = key.split(',');
                subKeys.forEach(subKey => {
                    let subQueryStr = subKey + ':like:\'%25' + String(value) + '\%25\'';
                    subQueryList.push(subQueryStr);
                });
            }
        }

        console.log("🚀 ~ requestAdaptor ~ subQueryList", subQueryList);
        let subQueryListStr = '[' + subQueryList.join('|') + ']';
        console.log("🚀 ~ requestAdaptor ~ subQueryListStr", subQueryListStr);
        if (subQueryList.length) ;

        let newQuery2List=[
            "limit="+limit,
            "offet="+offset
        ];
        if(subQueryList.length){
            newQuery2List.push("query="+subQueryListStr);
        }

        let newQuery2ListStr=newQuery2List.join('&');




        api.url = urlHost + '?'+newQuery2ListStr;
        console.log("🚀 ~ requestAdaptor ~ api.url ", api.url );

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

        if(payload.img && payload.img.file_data){
            newItem.imgSrc='data:image/jpeg;base64,'+payload.img.file_data;
        }

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
        newItem.weaponsKvList = objToKvList(payload['weapons']);


        return newItem;
    };



    var myutils = {
        requestAdaptor,
        listResponseAdapter,
        platItemResponseAdapter
    };

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
            "name": "info",
            "label": "备注",
            "sortable": true
        },
        {
            "name": "type",
            "label": "类型",
            "sortable": true
        },
        {
            "name": "produce_time",
            "label": "生产日期",
            "type":"tpl",
            "tpl": "${produce_time|date:LLL:x}"
        }
    ];

    let columns$1 = deviceListItems.map(v => v);

    let operationItem$1= {
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
            "label": "修改",
            "level": "info",
            "actionType": "link",
            "link": "/device/${id}/edit"
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
    };
    columns$1.push(operationItem$1);


    const deviceList = {
      "type": "page",
      "title": "装备列表",
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
        api: {
          method: 'get',
          url: '/api/device/0.1',
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
            "name": "name,info,id",
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
        "columns": columns$1,
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

    // let backUrl=

    let deviceView = {
        "type": "page",

        "initApi": {
            method: 'get',
            url: "/api/device/0.1/${params.id}",
            adaptor: myutils.platItemResponseAdapter
        },
        "toolbar": [{
            "type": "button",
            "actionType": "button",
            // "link": "/device/list",
            "label": "返回列表",
            onClick: () => {
                // console.log(window.location);
                window.history.back();
                // amisLib.toast.info('消息通知');
              }
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

                // {
                //     "type": "page",
                //     "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'>3.<span class='test1'>主要武器</span></div>"
                // },

                // {
                //     "type": "page",
                //     "body": {
                //         "type": "each",
                //         "name": "weaponsKvList",
                //         "items": {
                //             "type": "tpl",
                //             "tpl": "<div style='font-weight: 500' ><span class='sub-label' style=' color:#425EAF;'><span class='label-text' style='display:inline-block;min-width:56px;text-align:justify;'> <%= data.key %></span>: </span><span style='color:#595959;font-family:Simsun'> <%= data.value %></span></div> "
                //         }
                //     }
                // }

            ]
        }
    };

    const platFormItems = [
        {
            "type": "text",
            "name": "name",
            "label": "名称",
            "required": true
        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "name": "category",
            "label": "category",
            "required": true
        },
        {
            "type": "divider"
        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "name": "type",
            "label": "type"
        },
        {
            "type": "input-kv",
            "name": "tech",
            "label": "技术参数"

        },
        {
            "type": "divider"
        },

        {
            "type": "input-kv",
            "name": "weapons",
            "label": "武器装备"

        },
        {
            "type": "divider"
        },
        
        {
            "type": "input-kv",
            "name": "profile",
            "label": "简介"

        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "name": "time",
            "label": "生产日期1",
        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "name": "info",
            "label": "备注",
        }

    ];

    const platAddPage =
    {
      "type": "page",
      "title": "新增平台",
      "remark": null,
      "toolbar": [
        {
          "type": "button",
          "actionType": "link",
          "link": "/plat/list",
          "label": "返回列表"
        }
      ],
      "body": [
        {
          "title": "新增平台",
          "type": "form",
          "redirect": "/plat/list",
          "name": "sample-edit-form",
          // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample",
          "api": {
            "method": "post",
            "url": "/api/plat/0.1",
            requestAdaptor: function (api) {
              console.log("🚀 ~ api", api);
              var newData = {
                ...api.data
              };
              newData.time = Number(newData.time);
              newData.category = Number(newData.category);
              newData.type=Number(newData.type);
              const payload= {
                ...api,
                data: {
                  ...newData, // 获取暴露的 api 中的 data 变量
                  
                }
              };
              console.log("🚀 ~ payload", payload);
              return payload;
            }
          },
          "controls": platFormItems
        }
      ]
    };

    let columns = deviceListItems.map(v => v);

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
                    "label": "修改",
                    "level": "info",
                    "actionType": "link",
                    "link": "/device/${id}/edit"
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
    };
    columns.push(operationItem);

    const platDeviceList = {
        "type": "page",
        "title": "平台装备列表",
        "remark": null,
        "name": "page-demo",
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
                url: '/api/device/0.1/plat-id/${params.id}',
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
    };

    const platEdit =
    {
      "type": "page",
      "title": "修改 ${params.id}",
      "remark": null,
      "toolbar": [
        {
          "type": "button",
          "actionType": "link",
          "link": "/plat/list",
          "label": "返回列表"
        }
      ],
      "body": [
        {
          "type": "form",
          "initApi": "/api/plat/0.1/${params.id}",
          // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id",
          "api": {
            "method": "PUT",
            "url":"/api/plat/0.1/${params.id}",
            requestAdaptor: function (api) {
              console.log("🚀 ~ api", api);
              var newData = {
                ...api.data
              };
              newData.produce_time = Number(newData.produce_time);
              newData.type=Number(newData.type);
              const payload= {
                ...api,
                data: {
                  ...newData, // 获取暴露的 api 中的 data 变量
                  
                }
              };
              console.log("🚀 ~ payload", payload);
              return payload;
            }
          },
          "redirect": "/plat/list",
          "controls": platFormItems
        }
      ]
    };

    const platList2 = {
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
            "name": "country,name",
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
            "type":"tpl",
            "label": "time",
            "tpl": "${time|date:LLL:x}"
           
          },
          {
            "type": "link",
            "href": "/#/plat/${id}/device",
            "label": "装备",
            "name":"id",
            "blank":false,
            "body": "装备列表"
          },
          // {
          //   "name": "time",
          //   "label": "映射",
          //   "type": "mapping",
          //   "map": {
          //     "1": "<span class='label label-info'>漂亮</span>",
          //     "2": "<span class='label label-success'>开心</span>",
          //     "3": "<span class='label label-danger'>惊吓</span>",
          //     "4": "<span class='label label-warning'>紧张</span>",
          //     "*": "<span class='label label-warning'>紧张</span>${time}"
          //   }
          // },
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
                  "link": "/plat/${id}/edit"
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
            "label": "返回列表"
        }],
        "body": {
            "type": "panel",
            "body": [{
                    "type": "container",
                    "body": "<div style='font-size: 18px;padding: 4px;font-family:Simsun;text-align:center' class='plat-title'>${name}</div>"
                },
                {
                    "type": "page",
                    "data": {
                        "html": "<img src=${imgSrc}>"
                    },
                    "body": {
                        "type": "tpl",
                        //   "tpl": "${html|raw}"
                        "tpl": "<div style='text-align:center'><img width='320' src=${imgSrc}></div>"
                    }
                },
                {
                    "type": "page",
                    "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'>1.<span class='test1'>通用属性表</span></div>"
                },
                {
                    "type": "property",
                    "items": [{
                            "label": "国家/地区",
                            "content": "${country}"
                        },
                        {
                            "label": "category",
                            "content": "${category}"
                        },
                        {
                            "label": "time",
                            "content": "${time|date:LLL:x}"
                        }
                    ]
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
                    "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'>2.<span class='test1'>基本性能参数2</span></div>"
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
                        "name": "weaponsKvList",
                        "items": {
                            "type": "tpl",
                            "tpl": "<div style='font-weight: 500' ><span class='sub-label' style=' color:#425EAF;'><span class='label-text' style='display:inline-block;min-width:56px;text-align:justify;'> <%= data.key %></span>: </span><span style='color:#595959;font-family:Simsun'> <%= data.value %></span></div> "
                        }
                    }
                }

            ]
        }
    };

    const vendorFormItems = [
        {
            "type": "text",
            "name": "name",
            "label": "名称",
            "required": true
        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "name": "country",
            "label": "国家(地区)",
        }


    ];

    const vendorAddPage =
    {
      "type": "page",
      "title": "新增",
      "remark": null,
      "toolbar": [
        {
          "type": "button",
          "actionType": "link",
          "link": "/vendor/list",
          "label": "返回列表"
        }
      ],
      "body": [
        {
          "title": "新增厂商",
          "type": "form",
          "redirect": "/vendor/list",
          "name": "sample-edit-form",
          // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample",
          "api": {
            "method": "post",
            "url":"/api/vendor/0.1"
          },
          "controls": vendorFormItems
        }
      ]
    };

    const vendorEdit =
    {
      "type": "page",
      "title": "修改 ${params.id}",
      "remark": null,
      "toolbar": [
        {
          "type": "button",
          "actionType": "link",
          "link": "/vendor/list",
          "label": "返回列表"
        }
      ],
      "body": [
        {
          "type": "form",
          "initApi": "/api/vendor/0.1/${params.id}",
          // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id",
          "api": {
            "method": "PUT",
            "url":"/api/vendor/0.1/${params.id}"
          },
          "redirect": "/vendor/list",
          "controls": vendorFormItems
        }
      ]
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
              "name": "country,name",
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
                    "link": "/vendor/${id}"
                  },
                  {
                    "type": "button",
                    "label": "修改",
                    "level": "info",
                    "actionType": "link",
                    "link": "/vendor/${id}/edit"
                  },
                  {
                    "type": "button",
                    "label": "删除",
                    "level": "danger",
                    "actionType": "ajax",
                    "confirmText": "您确认要删除?",
                    "api": "delete:/api/vendor/0.1/${id}"
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

    let body2 =
    {
        "type": "panel",
        "body": {
            "type": "page",
            "title": "${name}",
            "body": "名称：${name}<br>国家/地区：${country}"
        }
    };


    let vendorView = {
        "type": "page",

        "initApi": {
            method: 'get',
            url: "/api/vendor/0.1/${params.id}",
            adaptor: myutils.platItemResponseAdapter
        },
        "toolbar": [{
            "type": "button",
            "actionType": "link",
            "link": "/vendor/list?page=$page",
            "label": "返回厂商列表"
        }],
        "body": body2
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
                    // "schemaApi": "get:/pages/plat/plat-add.json"
                    "schema":platAddPage
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
                    "schema":vendorAddPage
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
                    "schema":vendorEdit
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
                    "schema":deviceAddPage
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
                    "schema":deviceEdit
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

}));
