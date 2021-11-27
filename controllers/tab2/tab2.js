const time1 = (req, res, next) => {
    var json = {
        "type": "service",
        "data":{
            "舷号": "SSBN730～743",
            "服役时间": "1984～1997年",
            "生产厂商": "美国通用动力公司电船分公司",
            "装备数量": "14艘"
        },
        "func": async (data, setData) => {
            console.log("🚀 ~ : ~ data", data)
            const timer = setInterval(() => {
                setData({ now: new Date().toString() })
            }, 1000);
            return () => { clearInterval(timer) }
        },
        "body": {
            "type": "tpl",
            "tpl": "现在是2：${date}"
        }
    }

    var json2= {
        "type": "service",
        "dataProvider": "setData({ now: new Date().toString() })",
        "body": {
            "type": "tpl",
            "tpl": "现在是1：${now}"
        }
    }
    res.send(json);
}

const tab1 = (req, res, next) => {
    console.log("🚀 ~ tab1 ~ req", req)
    var json = {
        "status": 0,
        "msg": "",
        "data": {
            "type": "tabs",
            "tabs": [
                {
                    "title": "TabA1",
                    "body": "卡片A内容"
                },
                {
                    "title": "TabB1",
                    "body": "卡片B内容"
                }
            ]
        }
    }
    res.send(json);
};


module.exports = { time1,tab1 }