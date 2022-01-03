import platList2 from "../pages/plat/plat-list";
import areaCode from "./tools/area-code";

let dict1 = {
    1: '普通',
    2: '内部',
    4: '秘密',
    8: '机密',
    16: '绝密'
}


let areaCategoryList = areaCode.map(v => {
    let newItem = {
        ...v,
        label: v.name,
        value: v.tel,

    };

    let dict1Options = []
    for (let key in dict1) {
        console.log("🚀 ~ file: rootPage.js ~ line 12 ~ key", key)
        let item = {
            label: dict1[key],
            value: v.tel + '-' + key
        }
        dict1Options.push(item)
    }
    console.log("🚀 ~ file: rootPage.js ~ line 18 ~ dict1Options", dict1Options)

    newItem.children = dict1Options
    return newItem;
})

export default {
    "type": "grid",
    "columns": [{
            // "columnClassName": "bg-green-300",
            md:4,
            sm:6,
            lg:3,
            "body": [

                {
                    "type": "input-tree",
                    "name": "tree",
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
        {
            // "columnClassName": "bg-blue-300",
            "body": [{
                "type": "panel",
                "title": "国家平台列表",
                "body": platList2
              }]
        }
    ]
}