let platDeviceBindDiaLog = {
    "title": "添加设备绑定",
    // "body":'12'

    "body": {
        "initApi": {
            "method": "get",
            "url": "/api/device/0.1?limit=3000",
            "adaptor": function (payload, response, api) {
                console.log("🚀 ~ file: device-plats.js ~ line 30 ~ response", response)
                console.log("🚀 ~ file: device-plats.js ~ line 30 ~ payload", payload)
                let newPayload = {
                    "status": 0,
                    "msg": "",
                    "data": {
                        "age": 222,
                        // 必须用 options 作为选项组的 key 值
                        "options": payload
                    }
                }
                console.log("🚀 ~ file: device-plats.js ~ line 35 ~ newPayload", newPayload)
                return newPayload;
            }
        },
        "type": "form",
        "api": {
            "method": "post",
            "url": "/api/device/belonging/0.1",
            requestAdaptor: function (api) {
                console.log("🚀 ~ file: device-plat-bind.js ~ line 30 ~ api", api)
                let newItem = {
                    ...api,
                    data: {
                        ...api.data, // 获取暴露的 api 中的 data 变量
                        // foo: 'bar' // 新添加数据
                    }
                }

                if (api.data.obj_id) {
                    let obj_id = api.data.obj_id
                    newItem.data.obj_id = Number(obj_id);
                    newItem.body.obj_id = Number(obj_id);

                }

                console.log("🚀 ~ file: device-plat-bind.js ~ line 39 ~ newItem", newItem)
                return newItem;
            },
            "data": {
                "device_id": "${device}",
                "obj": 1,
                "obj_id": "${params.id}"
            }
        },
        "body": [{
            "label": "设备",
            "labelField": "name",
            "valueField": "id",
            "type": "select",
            "searchable": true,
            "name": "device",
            "source": "${options}"
            // "source": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/form/getOptions?waitSeconds=1"
        }]
    }
}

export default platDeviceBindDiaLog;