import vendorFormItems from "./vendor-form-items";

const vendorEdit =
{
  "type": "page",
  "title": "修改 ${params.id}",
  "remark": null,
  "toolbar": [
    {
      "type": "button",
      "actionType": "button",
      "label": "返回列表",
      onClick: () => {
          window.history.back();
      }
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
      "redirect": "/vendor/list?page=${page}",
      "controls": vendorFormItems
    }
  ]
}

export default vendorEdit;