"use strict";
// var profile1: any = {
//   舷号: "SSBN730～743",
//   服役时间: "1984～1997年",
//   生产厂商: "美国通用动力公司电船分公司",
//   装备数量: "14艘",
// };
var profile1 = {
    "导弹": "“战斧”BlockⅣ巡航导弹",
    "鱼雷": "MK48ADCAPMod5/6/7重型鱼雷",
    "火控系统": "AN/BYG-1战斗控制系统"
};
var list1 = [];
for (var key in profile1) {
    console.log("🚀 ~ key", key);
    var item = {
        key: key,
        value: profile1[key],
    };
    console.log("🚀 ~ item", item);
    list1.push(item);
}
console.log("🚀 ~ list1", JSON.stringify(list1));
var profile = function (req, res, next) {
    var newJson = [];
    for (var item in profile1) {
    }
};
