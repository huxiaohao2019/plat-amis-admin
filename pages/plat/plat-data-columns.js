import platTypes from "./plat-types";
import platVendorBindDiaLog from "./plat-vendor-bind";

let platDataColumns1 = [{
    "name": "id",
    "label": "ID",
    "width": 20,
    "sortable": true
  },
  {
    "name": "name",
    "label": "名称",
    "sortable": true
  },
  {
    "name": "time",
    "type": "tpl",
    "label": "time",
    "tpl": "${time|date:LLL:x}"

  },
  {
    "type": "link",
    "href": "/#/plat/${id}/device",
    "label": "装备111",
    "name": "id",
    "blank": false,
    "body": "装备列表"
  },
  {
    name: 'type',
    label: '类型',

  },
  {
    "name": "country",
    "label": "国家(地区)",
    "sortable": true
  }
]

let vendor_item={
  "name": "vendor_id",
  "type": "container",
  "label": "生产厂商",

  "body": [{
      "type": "link",
      "href": "/#/vendor/${vendor_id}",
      "blank": false,
      "className": "mr-1.5",
      "visibleOn": "this.vendor_id",
      "body": "${vendor_name}",
    },
    {

      "name": "vendor-bind",
      "type": "button",
      "size": "xs",
      // "primary": true,
      "label": "添加",
      "actionType": "dialog",
      // "dialog": deviceVendorBindDiaLog,
      "dialog": platVendorBindDiaLog,
      "visibleOn": "!this.vendor_id"
    },
    {
      "name": "vendor-bind",
      "type": "button",
      "size": "xs",
      "label": "移除",

      "level": "danger",
      "visibleOn": "this.vendor_id",

      "actionType": "ajax",
      "confirmText": "确定移除该厂商绑定?${name}",
      "api": "delete:/api/vendor/product/0.1/vendor/${vendor_id}/obj/1/obj-id/${id}"
    },
  ]
}


let platDataColumns = [{
    "name": "id",
    "label": "ID",
    "width": 20,
    "sortable": true
  },
  {
    "name": "name",
    "label": "名称",
    "sortable": true
  },
  {
    "name": "time",
    "type": "tpl",
    "label": "时间",
    "tpl": "${time|date:LLL:x}"

  },
  {
    "label": "装备",
    "name": "id",
    "type": "link",
    "href": "/#/plat/${id}/device",
    "blank": false,
    "body": "装备列表"
  },

  
  {
    "label": "厂商",
    "name": "vendor",
    "type": "link",
    "href": "/#/plat/${id}/vendor",
    "blank": false,
    "body": "厂商列表"
  },


  {
    name: 'type',
    label: '类型',
    "type": "mapping",
    "map": platTypes
  },
  {
    "name": "country",
    "label": "国家(地区)",
    "sortable": true
  }
]

export default platDataColumns;