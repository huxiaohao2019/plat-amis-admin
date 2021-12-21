import myutils from "../../tools/myutils";

let part1 = {
    "type": "page",
    "data": {
        "country1": "${country}",
        "time1": "${time}"
    },
    "body": "date1 is ${kvContainerList[1].flagLabel} ,${country}"

}



// let backUrl=

let deviceView = {
    "type": "page",

    "initApi": {
        method: 'get',
        url: "/api/device/0.1/${params.id}",
        adaptor: myutils.platItemResponseAdapter
    },
    // "toolbar": [{
    //     "type": "button",
    //     "actionType": "button",
    //     "label": "返回列表",
    //     onClick: () => {
    //         window.history.back();
    //     }
    // }],
    "body":[
        {
            "type": "container",
            "className":"my-2",
            "body": {
                "type": "button",
                "actionType": "button",
                "label": "返回",
                
                onClick: () => {
                    window.history.back();
                }
            }
        },
     {
        "type": "panel",
        "body": [
            // {
            //     "type": "container",
            //     "body": "<div style='font-size: 18px;padding: 4px;font-family:Simsun;text-align:center' class='plat-title'>${country}</div>"
            // },
            // {
            //     "type": "page",
            //     "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'>1.<span class='test1'>简况</span></div>"
            // },
            // {
            //     "type": "page",
            //     "body": {
            //         "type": "each",
            //         "name": "profileKvList",
            //         "items": {
            //             "type": "tpl",
            //             "tpl": "<div style='font-weight: 500' ><span class='sub-label' style=' color:#425EAF;'><span class='label-text' style='display:inline-block;min-width:56px;text-align:justify;'> <%= data.key %></span>: </span><span style='color:#595959;font-family:Simsun'> <%= data.value %></span></div> "
            //         }
            //     }
            // },
            {
                "type": "container",
                "body": "<div style='background-color:#E4D9CA;padding:4px;font-size:16px;color:#425EAF;'><span class='test1'>基本性能参数</span></div>"
            },
            {
                "type": "container",
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
    }]
}

export default deviceView;