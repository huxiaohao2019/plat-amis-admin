import vendorFormItems from "./vendor-form-items";

const vendorEdit =
{
  "type": "page",
  "title": "修改 ${params.id}",
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
      "type": "form",
      "initApi": "/api/vendor/0.1/${params.id}",
      // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample/$id",
      "api": {
        "method": "PUT",
        "url":"/api/vendor/0.1/${params.id}"
      },
      "redirect": "/vendor/list",
      "controls": vendorFormItems
    }
  ]
}

export default vendorEdit;