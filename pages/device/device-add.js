const deviceAddPage =
{
  "type": "page",
  "title": "新增",
  "remark": null,
  "toolbar": [
    {
      "type": "button",
      "actionType": "link",
      "link": "/deivce/list",
      "label": "返回列表"
    }
  ],
  "body": [
    {
      "title": "新增设备",
      "type": "form",
      "redirect": "/device/list",
      "name": "sample-edit-form",
      // "api": "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample",
      "api": {
        "method": "post",
        "url":"/api/device/0.1"
      },
      "controls": [
        {
          "type": "text",
          "name": "name",
          "label": "名称",
          "required": true
        },
        {
          "type": "divider"
        },
        {
          "type": "text",
          "name": "type",
          "label": "类型",
        },
        {
          "type": "input-kv",
          "name": "tech",
          "label": "技术参数"

        },
        {
          "type": "divider"
        },
        {
          "type": "text",
          "name": "produce_time",
          "label": "生产日期",
        },
        {
          "type": "divider"
        },
        {
          "type": "text",
          "name": "info",
          "label": "备注",
        }

      ]
    }
  ]
}

export default deviceAddPage;