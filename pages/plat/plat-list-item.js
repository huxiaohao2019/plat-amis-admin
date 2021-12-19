import platDataColumns from "./plat-data-columns";


let platListOperationItems=[
  {
    "type": "operation",
    "label": "操作",
    "width": "",
    "buttons": [{
      "type": "button-group",
      "buttons": [{
          "type": "button",
          "label": "查看",
          "level": "primary",
          "actionType": "link",
          "link": "/plat/${id}"
        },
        {
          "type": "button",
          "label": "修改",
          "level": "info",
          "actionType": "link",
          "link": "/plat/${id}/edit"
        },
        {
          "type": "button",
          "label": "删除",
          "level": "danger",
          "actionType": "ajax",
          "confirmText": "您确认要删除?",
          "api": "get:/api/url/destroy/${id}"
        }
      ]
    }],
    "placeholder": "-",
    "fixed": "right"
  }
]

let platListItems=platDataColumns .concat(platListOperationItems)

export default platListItems;