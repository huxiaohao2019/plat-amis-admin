import kvFlags from '../tools/kv-flags'
const requestAdaptor = function (api) {
    console.log("🚀 ~ requestAdaptor ~ api", api)
    console.log("🚀 ~ requestAdaptor ~ api.url", api.url)

    var urlHost = api.url.split('?')[0]

    var query = api.query;
    var page = query.page;
    var perPage = query.perPage;


    var limit = perPage;
    var offset = (page - 1) * perPage;

    var newQuery = {
        ...query,
    }
    delete newQuery['page']
    delete newQuery['perPage']

    let subQueryList = [];

    for (let key in newQuery) {
        if (/.*,.*/.test(key)) {
            let value = newQuery[key];
            let subKeys = key.split(',');
            subKeys.forEach(subKey => {
                let subQueryStr = subKey + ':like:\'%25' + String(value) + '\%25\''
                subQueryList.push(subQueryStr);
            })
        }
    }

    console.log("🚀 ~ requestAdaptor ~ subQueryList", subQueryList)
    let subQueryListStr = '[' + subQueryList.join('|') + ']'
    console.log("🚀 ~ requestAdaptor ~ subQueryListStr", subQueryListStr)

    let newQuery2 = {
        limit,
        offset
    }
    if (subQueryList.length) {
        newQuery2.query = subQueryListStr
    }

    let newQuery2List=[
        "limit="+limit,
        "offet="+offset
    ]
    if(subQueryList.length){
        newQuery2List.push("query="+subQueryListStr)
    }

    let newQuery2ListStr=newQuery2List.join('&');




    api.url = urlHost + '?'+newQuery2ListStr
    console.log("🚀 ~ requestAdaptor ~ api.url ", api.url )

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

function objToKvList(obj) {
    let list = []
    for (let key in obj) {
        let item = {
            key,
            value: obj[key]
        }
        list.push(item);
    }
    return list;
}

const platItemResponseAdapter = function (payload, response, api) {
    console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ api", api)
    console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ response", response)
    console.log("🚀 ~ file: myutils.js ~ line 40 ~ platItemResponseAdapter ~ payload", payload)

    var newItem = {
        ...payload,
        _origin: payload
    }

    var kvContainerList = []


    kvFlags.platKvFlags.forEach(item => {
        let flagKey = item['flagKey']
        if (typeof payload[flagKey] == 'object') {
            delete newItem[flagKey]
            var kvItems = objToKvList(payload[flagKey]);
            var kvContainer = { ...item, kvItems: kvItems }
            kvContainerList.push(kvContainer);
        }
    })
    newItem.kvContainerList = kvContainerList;
    console.log("🚀 ~ platItemResponseAdapter ~ newItem", newItem)

    var techKvList = objToKvList(payload['tech']);
    newItem.techKvList = techKvList;
    newItem.profileKvList = objToKvList(payload['profile']);
    newItem.weaponsKvList = objToKvList(payload['weapons'])


    return newItem;
}



export default {
    requestAdaptor,
    listResponseAdapter,
    platItemResponseAdapter
}