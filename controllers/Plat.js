// const {
//     default: axios
// } = require("axios");

const axios = require('axios');
const superagent = require('superagent');
const _ = require('lodash');
const deviceTypes = require('./tools/device-types');


const platList = (req, res, next) => {
    let pageJson = {
        "type": "page",
        "body": {
            "type": "crud",
            api: {
                method: 'get',
                url: '/api/plat/0.1',
                requestAdaptor: function (api) {
                    console.log("🚀 ~ file: index.html ~ line 48 ~ api", api)
                    var query = api.query;
                    var page = query.page;
                    var perPage = query.perPage;

                    var limit = perPage;
                    var offset = (page - 1) * perPage;
                    api.url = '/api/plat/0.1' + '?limit=' + limit + '&skip=' + offset;

                    var obj1 = {
                        ...api

                    };
                    console.log("🚀 ~ file: index.html ~ line 50 ~ obj1", obj1)

                    return obj1;
                },
                adaptor: function (payload, response) {
                    console.log("🚀 ~ file: index.html ~ line 104 ~ payload", payload)
                    console.log("🚀 ~ file: index.html ~ line 104 ~ response", response)
                    // return {
                    //     ...payload,
                    //     status: payload.code === 200 ? 0 : payload.code
                    // };
                    return payload;
                }
            },
            "syncLocation": false,
            "columns": [{
                    "name": "id",
                    "label": "ID"
                },
                {
                    "name": "name",
                    "label": "Engine"
                },
                {
                    "name": "package_name",
                    "label": "Version"
                },
                {
                    "name": "platform",
                    "label": "Platform(s)"
                },
                {
                    "name": "version",
                    "label": "Engine version"
                },
                {
                    "name": "grade",
                    "label": "CSS grade"
                }
            ]
        }
    }

    res.send(pageJson);
}

const platDeviceTabs = async (req, res, next) => {
    console.log("🚀 ~ file: Plat.js ~ line 70 ~ platDeviceTabs ~ req", req.params);
    let params = req.params;
    let {
        platId
    } = params;
    console.log("🚀 ~ file: Plat.js ~ line 75 ~ platDeviceTabs ~ platId", platId)

    // /api/device/0.1/plat-id/1
    // 'http://localhost:3100/api/device/0.1/plat-id/1'
    // let url2='/api/device/0.1/plat-id/1'
    let url2 = 'http://localhost:3100/api/device/0.1/plat-id/'+platId;
    // let url2 = 'http://www.baidu2.com';
    // let res2 = axios.get(url2).then(res3 => {
    //     console.log("🚀 ~ file: Plat.js ~ line 82 ~ res2 ~ res3", res3.status)

    // })

    let pageJson = {
        "type": "page",
        "body": "暂无内容"
        // "body": {
        //     "type": "tabs",
        //     "tabs": [{
        //             "title": "Tab 1",
        //             "tab": "Content 1"
        //         },
        //         {
        //             "title": "Tab 2",
        //             "tab": "Content 2"
        //         }
        //     ]
        // }
    }

   

    await axios.default.get(url2).then(res3 => {
        console.log("🚀 ~ file: Plat.js ~ line 93 ~ axios.default.get ~ res3", res3.status)
        // console.log("🚀 ~ file: Plat.js ~ line 93 ~ axios.default.get ~ res3", res3.data)

        if (res3.data && Array.isArray(res3.data)) {
            let list = res3.data;
            let type_index_list = list.map(v => v.type);
            let unique_type_index_list = _.uniq(type_index_list);


            let tabs = [];


            if (unique_type_index_list.length) {
                unique_type_index_list.forEach(v2 => {

                    let tabItem = {
                        title: deviceTypes[v2] || ('type ' + v2),
                        // tab: 'content ' + v2
                    }

                    let tabSubList = list.filter(v3 => {
                        return v3.type == v2;
                    })

                    let tabContent = {
                        type: 'container',
                        body: tabSubList.map(v4 => {
                            // console.log("🚀 ~ file: Plat.js ~ line 161 ~ awaitaxios.default.get ~ v4", v4)
                            console.log("🚀 ~ file: Plat.js ~ line 161 ~ awaitaxios.default.get ~ v4", typeof v4)
                            let subItem = {
                                type: 'container',
                                body: {
                                    "type": "link",
                                    "className": "my-4",
                                    "href": "/#/device/" + v4.id,
                                    // "label": "",
                                    // "name": "id",
                                    "blank": false,
                                    "body": v4.name
                                }
                            }
                            return subItem;
                        })
                    }
                    tabItem.tab = tabContent;

                    tabs.push(tabItem);


                })

                pageJson = {
                    type: 'container',
                    body: {
                        type: 'tabs',
                        tabs: tabs
                    }
                }
            }

        }


    }).catch(err3 => {
        // console.log("🚀 ~ file: Plat.js ~ line 96 ~ axios.default.get ~ err3", err3)

    })

    // (superagent.get(url2)).on((err, res) => {
    //     console.log("🚀 ~ file: Plat.js ~ line 102 ~ res", res)
    //     console.log("🚀 ~ file: Plat.js ~ line 102 ~ err", err)

    // })

    // console.log("🚀 ~ file: Plat.js ~ line 82 ~ platDeviceTabs ~ res2", res2.data)



    res.send(pageJson);
}

module.exports = {
    platList,
    platDeviceTabs
}