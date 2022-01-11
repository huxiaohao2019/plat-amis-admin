// let platView=
import platView from "../../pages/plat/plat-view"
let mainPlatView=platView;
let mainPlatView2 = {
    "type": "page",
    "data": {
        "platId": 1
    },
    "body": {
        "type": "link",
        "href": "https://www.baidu.com",
        "body": [
            "bjj",
            "${platId}"
        ]
    }
}

export default mainPlatView;