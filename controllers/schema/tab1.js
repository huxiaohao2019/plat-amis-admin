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

module.exports = { tab1 };
