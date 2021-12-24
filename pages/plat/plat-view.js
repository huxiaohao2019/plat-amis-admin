import {
    response
} from "express";
import myutils from "../../tools/myutils";
import platDevicesTab from "./plat-devices-tab";

// let 

let devices = {
    "type": "panel",
    "title": "装备详情",

    // "body": {platDevicesTab}
    "body": {
        "type": "service",
        "schemaApi": {
            "method": 'get',
            'url': '/schema/plat-device-tabs/${params.id}'
        }
    }

}

let detailView1 = {
    "type": "page",
    "data": {
        "arr": [{
            "a": "收入",
            "b": 199
        },
        {
            "a": "支出",
            "b": 299
        }
        ]
    },
    "body": [{
        "type": "tabs",
        "source": "${arr}",
        "tabs": [{
            "title": "${a}",
            "body": {
                "type": "tpl",
                "tpl": "金额：${b|number}元"
            }
        }]
    }]
}

let detailView = {
    "type": "service",

    // "initApi": {
    //     method: 'get',
    //     url: "/api/plat/0.1/${params.id}",
    //     adaptor: myutils.platItemResponseAdapter
    // },

    "body": {
        "type": "service",
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
            "type": "page",
            "body": {
                "type": "property",
                "items": [{
                    "label": "国家/地区",
                    "content": "${country}"
                },
                {
                    "label": "科目",
                    "content": "${category}"
                },
                {
                    "label": "时间",
                    "content": "${time|date:LLL:x}"
                }
                ]
            }
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
        "type": "container",
        "className": "my-2",
        "body": [{
            "type": "button",
            "actionType": "button",
            "label": "返回",

            onClick: () => {
                window.history.back();
            }
        },{
            "type": "button",
            "actionType": "button",
            "label": "编辑",
            "actionType": "link",
            "link": "/plat/${params.id}/edit"
        
        }
    ]
    },
    {
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
    }
    ]
}

let platView2 = {
    "type": "page",
    "body": [{
        "type": "page",
        "body": {
            "type": "button",
            "actionType": "button",
            "label": "返回列表",
            onClick: () => {
                window.history.back();
            }
        }
    },

    {
        "type": "page",
        "body": {
            "type": "button",
            "actionType": "button",
            "label": "返回列表",
            onClick: () => {
                window.history.back();
            }
        }
    },

    {

        "type": "page",



        "initApi": {
            method: 'get',
            url: "/api/plat/0.1/${params.id}",
            adaptor: myutils.platItemResponseAdapter
        },
        "body": [

            {
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
            }
        ]
    }
    ]
}


export default platView;