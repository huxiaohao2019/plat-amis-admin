const deviceFormItems = [
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
        "className":"plat-kv",
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

export default deviceFormItems;