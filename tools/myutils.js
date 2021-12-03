const requestAdaptor = function (api) {
    console.log("🚀 ~ file: index.html ~ line 48 ~ api", api)
    var query = api.query;
    var page = query.page;
    var perPage = query.perPage;

    var limit = perPage;
    var offset = (page - 1) * perPage;
    api.url = '/api/plat/0.1' + '?limit=' + limit + '&offset=' + offset;

    var obj1 = {
        ...api
    };
    console.log("🚀 ~ file: index.html ~ line 50 ~ obj1", obj1)

    return obj1;
}

const listResponseAdapter = function (payload, response) {
    console.log("🚀 ~ file: index.html ~ line 104 ~ payload", payload)
    console.log("🚀 ~ file: index.html ~ line 104 ~ response", response)
    // return {
    //     ...payload,
    //     status: payload.code === 200 ? 0 : payload.code
    // };
    console.log("🚀 ~ file: myutils.js ~ line 32 ~ listResponseAdapter ~ response.headers['sum']", response.headers['sum'])
    var amisList = {
        msg: '',
        status: '0',
        data: {
            "rows": payload,
            "count": response.headers['sum']
        }
    }

    return amisList;
}

const platItemResponseAdapter = function (payload, response, api) {
    console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ api", api)
    console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ response", response)
    console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ payload", payload)

    var newItem = {
        ...payload
    }
    


    return payload;
}



export default {
    requestAdaptor,
    listResponseAdapter,
    platItemResponseAdapter
}