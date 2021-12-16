import {
    response
} from "express";
import deviceTypes from "../../tools/device-types";
import myutils from "../../tools/myutils";

// let 

let devices = {
    "type": "panel",
    "title": "装备详情",

    "body": {
        "type": "service",
        api: {

            method: 'get',
            // url: '/api/device/0.1',
            url: '/api/device/0.1/plat-id/${params.id}',
            // url: '/api/device/0.1/plat-id/4',
            // requestAdaptor: myutils.requestAdaptor,
            // adaptor: myutils.listResponseAdapter
            adaptor: (payload, response) => {

            }
        },
        "body": {

            "type": "tabs",
            "tabs": [{
                    "title": "Tab ",
                    "tab": {
                        type: 'page',
                        body: 'dweew'
                    }
                },
                {
                    "title": "Tab 2",
                    "tab": "Content 2"
                }
            ]
        }
    }

}


let detailView = {
    "type": "page",

    // "initApi": {
    //     method: 'get',
    //     url: "/api/plat/0.1/${params.id}",
    //     adaptor: myutils.platItemResponseAdapter
    // },
    "toolbar": [{
        "type": "button",
        "actionType": "button",
        "label": "返回列表",
        onClick: () => {
            window.history.back();
        }
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
}

let platView = {
    "type": "page",
    "initApi": {
        method: 'get',
        url: "/api/plat/0.1/${params.id}",
        adaptor: myutils.platItemResponseAdapter
    },
    "body": [{
        "type": "grid",
        // "className": "b-a bg-dark lter",
        "columns": [{
                "md": 6,
                "body": {
                    "type": "panel",
                    "title": "平台概况",
                    "body": detailView
                }
            },
            {
                "md": 6,
                "body": devices
            }
        ]
    }]
}

export default platView;