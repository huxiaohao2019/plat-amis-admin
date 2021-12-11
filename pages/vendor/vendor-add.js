import vendorFormItems from "./vendor-form-items";

const vendorAddPage =
{
  "type": "page",
  "title": "新增",
  "remark": null,
  "toolbar": [
    {
      "type": "button",
      "actionType": "link",
      "link": "/vendor/list",
      "label": "返回列表"
    }
  ],
  "body": [
    {
      "title": "新增厂商",
      "type": "form",
      "redirect": "/vendor/list",
      "name": "sample-edit-form",
      // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample",
      "api": {
        "method": "post",
        "url":"/api/vendor/0.1"
      },
      "controls": vendorFormItems
    }
  ]
}

export default vendorAddPage;