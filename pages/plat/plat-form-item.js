const platFormItems = [{
        "type": "text",
        "name": "name",
        "label": "名称",
        "required": true
    },
    {
        "type": "divider"
    },
  
    {
        "type": "input-file",
        "name": "file",
        "label": "File",
        "asBase64": true,
        "visibleOn": "this.img != undefined"

    },
    {
        "type": "tpl",
        //   "tpl": "${html|raw}"
        "tpl": "<span style='text-align:center'><img width='240' src=${imgSrc}></span>",
        "visibleOn": "this.file == undefined"

    },

     {
        "type": "tpl",
        //   "tpl": "${html|raw}"
        "tpl": "<span style='text-align:center'><img width='240' src=${file}></span>",
        "visibleOn": "this.file != undefined"

    },

    // {
    //     "type": "service",
    //     "body": {
    //       "type": "image",
    //     //   "src": "https://internal-amis-res.cdn.bcebos.com/images/2020-1/1578395692722/4f3cb4202335.jpeg@s_0,w_216,l_1,f_jpg,q_80"
    //     "src":"${img.file_data}"
    //     }
    //   },


    {
        "type": "divider"
    },
    {
        "type": "text",
        "name": "category",
        "label": "category",
        "required": true
    },
    {
        "type": "divider"
    },

    {
        "type": "text",
        "name": "type",
        "label": "type"
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
        "type": "input-kv",
        "name": "weapons",
        "label": "武器装备"

    },
    {
        "type": "divider"
    },

    {
        "type": "input-kv",
        "name": "profile",
        "label": "简介"

    },
    {
        "type": "divider"
    },
    {
        "type": "text",
        "name": "time",
        "label": "生产日期1",
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

export default platFormItems;