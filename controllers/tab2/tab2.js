const time1 = (req, res, next) => {
    var json = {
        "type": "service",
        "func": async (data, setData) => {
            console.log("🚀 ~ : ~ data", data)
            const timer = setInterval(() => {
                setData({ now: new Date().toString() })
            }, 1000);
            return () => { clearInterval(timer) }
        },
        "body": {
            "type": "tpl",
            "tpl": "现在是：${date}"
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