import myutils from "../../tools/myutils";
const platView = {
    "type": "page",

    "initApi": {
        method: 'get',
        url: "/api/plat/0.1/${params.id}",
        adaptor:myutils.platItemResponseAdapter
        // adaptor: function (payload, response,api) {
        //     console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ api", api)
        //         console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ response", response)
        //         console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ payload", payload)
        //         return payload;
        //     }
    },
    "toolbar": [{
        "type": "button",
        "actionType": "link",
        "link": "/plat/list?page=$page",
        "label": "返回列表2"
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
}

export default platView;