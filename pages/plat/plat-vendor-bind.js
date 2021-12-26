let platVendorBindDiaLog = {
    "title": "添加厂商绑定",
    "body": {
        "initApi": {
            "method": "get",
            "url": "/api/vendor/0.1?limit=1000",
            "adaptor": function (payload, response, api) {
                console.log("🚀 ~ file: plat-plats.js ~ line 30 ~ response", response)
                console.log("🚀 ~ file: plat-plats.js ~ line 30 ~ payload", payload)
                let newPayload = {
                    "status": 0,
                    "msg": "",
                    "data": {
                        "age": 222,
                        // 必须用 options 作为选项组的 key 值
                        "options": payload
                    }
                }
                console.log("🚀 ~ file: plat-plats.js ~ line 35 ~ newPayload", newPayload)
                return newPayload;
            }
        },
        "type": "form",
        "api": {
            "method": "post",
            "url": "/api/vendor/product/0.1",
            requestAdaptor: function (api) {
                console.log("🚀 ~ file: plat-plat-bind.js ~ line 30 ~ api", api)
                let newItem = {
                    ...api,
                    data: {
                        ...api.data, // 获取暴露的 api 中的 data 变量
                        // foo: 'bar' // 新添加数据
                    }
                }

                console.log("🚀 ~ file: plat-plat-bind.js ~ line 40 ~ api.data.plat_id", api.data.plat_id)
                if (api.data.vendor_id) {
                    console.log("🚀 ~ file: plat-plat-bind.js ~ line 40 ~ api.data.plat_id", api.data.plat_id)
                    let vendor_id = api.data.vendor_id;
                    newItem.data.vendor_id = Number(vendor_id);
                    newItem.body.vendor_id = Number(vendor_id);

                    let obj_id = api.data.obj_id;
                    newItem.data.obj_id = Number(obj_id);
                    newItem.body.obj_id = Number(obj_id);
                }

                console.log("🚀 ~ file: plat-plat-bind.js ~ line 39 ~ newItem", newItem)
                return newItem;
            },
            "data": {
                "vendor_id": "${vendor}",
                "obj": 1,
                "obj_id": "${params.id}"
            }
        },
        "body": [
            // {
            //     "type": "divider"
            // },
            {
                "label": "厂商",
                "labelField": "name",
                "valueField": "id",
                "type": "select",
                "searchable": true,
                "name": "vendor",
                "source": "${options}"
                // "source": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/form/getOptions?waitSeconds=1"
            }
        ]
    }
}

export default platVendorBindDiaLog;