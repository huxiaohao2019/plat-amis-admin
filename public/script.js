let app1={
    name:1121
}

const app = {
    "type": "app",
    "brandName": "应用名称",
    "pages": [{
      "label": "分组1",

      "children": [{
        "label": "父页面",
        "url": "/parent",
        "children": [{
            "label": "子页面",
            "url": "pageA1",
            // "schemaApi": "/scheme/plat/list"
            "schema": {
              "type": "service",
              "schemaApi": "get:/scheme/plat/list"
            }
          },

          {
            "label": "子页面",
            "url": "pageA",
            "schema": {
              "type": "page",
              "body": {
                "type": "crud",
                api: {
                  method: 'get',
                  url: '/api/plat/0.1',
                  requestAdaptor: function (api) {
                    console.log("🚀 ~ file: index.html ~ line 48 ~ api", api)
                    var query = api.query;
                    var page = query.page;
                    var perPage = query.perPage;

                    var limit = perPage;
                    var offset = (page - 1) * perPage;
                    api.url = '/api/plat/0.1' + '?limit=' + limit + '&skip=' + offset;

                    var obj1 = {
                      ...api

                    };
                    console.log("🚀 ~ file: index.html ~ line 50 ~ obj1", obj1)

                    return obj1;
                  },
                  adaptor: function (payload, response) {
                    console.log("🚀 ~ file: index.html ~ line 104 ~ payload", payload)
                    console.log("🚀 ~ file: index.html ~ line 104 ~ response", response)
                    // return {
                    //     ...payload,
                    //     status: payload.code === 200 ? 0 : payload.code
                    // };
                    return payload;
                  }
                },
                "syncLocation": false,
                "columns": [{
                    "name": "id",
                    "label": "ID"
                  },
                  {
                    "name": "name",
                    "label": "Engine"
                  },
                  {
                    "name": "package_name",
                    "label": "Version"
                  },
                  {
                    "name": "platform",
                    "label": "Platform(s)"
                  },
                  {
                    "name": "version",
                    "label": "Engine version"
                  },
                  {
                    "name": "grade",
                    "label": "CSS grade"
                  }
                ]
              }
            }
          }
        ]
      }]
    }]
  }