// import _ from "lodash";

let tab1 = []

let platDevicesTab = {
    "type": "page",

    initApi: {

        method: 'get',
        url: '/api/device/0.1/plat-id/${params.id}',

        adaptor: (payload, response) => {
            let list1 = []
            // payload.forEach(element => {
            //     _.uniq()
            // });
            let typeIndexList = payload.map(v => v.type)
            let typeIndexListUniq = _.uniq(typeIndexList);
            console.log("🚀 ~ file: plat-devices-tab.js ~ line 18 ~ typeIndexListUniq", typeIndexListUniq)

            let list2 = []

            typeIndexListUniq.forEach(v1 => {
                let list2Item = {
                    name: 'type' + v1,
                    id: v1,
                    subItems: []
                }
                list2Item.subItems = payload.filter(v2 => {
                    return v2.type == v1;
                })
                list2.push(list2Item)
            })

            // tab1 = 

            let newPayload = {
                "arr": list2,
                tabs1: [{
                        "title": "Tab ",

                        "tab": {
                            "type": "each",
                            "name": "arr",
                            "items": {
                                "type": "container",
                                "body": "<span class='label label-default m-l-sm'><%= data.name %></span> "
                            }
                        }
                    },
                    {
                        "title": "Tab 2",
                        "tab": "Content 2"
                    }
                ],
                "age11": 123
            }

            console.log("🚀 ~ file: plat-devices-tab.js ~ line 23 ~ newPayload", newPayload)

            return newPayload
        }
    },
    "body1": {
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
    },
    "body": [{
            type: 'page',
            // body: '${age11}'
        },

        // 
        {

            "type": "tabs",
            "mode": "card",
            // "tabs": "${tabs1}"

            // "tabs": [{
            //         "title": "Tab ",

            //         "tab": {
            //             "type": "each",
            //             "name": "arr",
            //             "items": {
            //                 "type": "container",
            //                 "body": "<span class='label label-default m-l-sm'><%= data.name %></span> "
            //             }
            //         }
            //     },
            //     {
            //         "title": "Tab 2",
            //         "tab": "Content 2"
            //     }
            // ]
        }

    ]
}

export default platDevicesTab