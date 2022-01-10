import platList2 from "../pages/plat/plat-list";
import areaCode from "./tools/area-code";

let dict1 = {
    1: '电子战',
    2: '情报',
    4: '秘密',
    // 8: '机密',
    // 16: '绝密'
}


let areaCategoryList = areaCode.map(v => {
    let newItem = {
        ...v,
        label: v.name,
        value: v.tel,

    };

    let dict1Options = []
    for (let key in dict1) {
        // console.log("🚀 ~ file: rootPage.js ~ line 12 ~ key", key)
        let item = {
            label: dict1[key],
            value: v.tel + '-' + key
        }
        dict1Options.push(item)
    }
    // console.log("🚀 ~ file: rootPage.js ~ line 18 ~ dict1Options", dict1Options)

    newItem.children = dict1Options
    return newItem;
})

 var root1= {
    "type": "grid",
    "columns": [{
            // "columnClassName": "bg-green-300",
            md: 4,
            sm: 6,
            lg: 3,
            "body": [{
                    "type": "form",
                    "name": "otherForm",
                    "title": "导航",
                    // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/form/saveForm",
                    // "target": "main-plat",
                    "target": "detailForm",
                    "actions": [],
                    "body": [
                        // {
                        //     "type": "static",
                        //     "name": "id",
                        //     "label": "返回 ID"
                        // },
                        {
                            "type": "input-tree",
                            "name": "tree",
                            submitOnChange: true,
                            "searchable": true,
                            // "label": "Tree",
                            "showOutline": true,
                            "initiallyOpen": false,
                            "options": areaCategoryList,
                            "size": "full"
                            // "labelField": "name",
                            // "valueField": "tel"
                        }
                    ]
                },
                // {
                //     "type": "input-tree",
                //     "name": "tree",
                //     submitOnChange: true,
                //     "searchable": true,
                //     // "label": "Tree",
                //     "showOutline": true,
                //     "initiallyOpen": false,
                //     "options": areaCategoryList,
                //     "size": "full"
                //     // "labelField": "name",
                //     // "valueField": "tel"
                // }
            ]
        },
        {
            type: "page",
            body: [{
                    "type": "page",
                    "initApi":"/api/plat/0.1?limit=10&offset=10",
                    // "data": {
                    //     "items": [{
                    //             "engine": "Trident",
                    //             "browser": "Internet Explorer 4.0"
                    //         },
                    //         {
                    //             "engine": "Chrome",
                    //             "browser": "Chrome 44"
                    //         },
                    //         {
                    //             "engine": "Gecko",
                    //             "browser": "Firefox 1.0"
                    //         },
                    //         {
                    //             "engine": "Presto",
                    //             "browser": "Opera 10"
                    //         },
                    //         {
                    //             "engine": "Webkie",
                    //             "browser": "Safari 12"
                    //         }
                    //     ]
                    // },
                    "body": {
                        "type": "cards",
                        "source": "$items",
                        "card": {
                            "header": {
                                "avatarText": "${engine|substring:0:2|upperCase}",
                                "avatarTextBackground": [
                                    "#FFB900",
                                    "#D83B01",
                                    "#B50E0E",
                                    "#E81123",
                                    "#B4009E",
                                    "#5C2D91",
                                    "#0078D7",
                                    "#00B4FF",
                                    "#008272"
                                ]
                            },
                            "body": [{
                                "label": "平台名称",
                                "name": "${name}"
                            }]
                        }
                    }
                },
               
            ]
        }


        // {
        //     "name": "main-plat",
        //     "body": [{
        //         "type": "panel",
        //         "title": "国家平台列表",
        //         "body": "${tree}"
        //     }]
        // }
    ]
}

var root2={
    "type": "page",
    "title": "标题",
    "body": "Hello World!"
  }

export default root2;