const tab1 = (req, res, next) => {
    console.log("ð ~ tab1 ~ req", req)
    var json = {
        "status": 0,
        "msg": "",
        "data": {
            "type": "tabs",
            "tabs": [
                {
                    "title": "TabA1",
                    "body": "å¡çAåå®¹"
                },
                {
                    "title": "TabB1",
                    "body": "å¡çBåå®¹"
                }
            ]
        }
    }
    res.send(json);
};

module.exports = { tab1 };
