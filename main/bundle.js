(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.platMain = factory());
})(this, (function () { 'use strict';

    const platKvFlags = [
        {
            flagKey: 'tech',
            flagLabel: '技术参数'
        }, {
            flagKey: 'weapons',
            flagLabel: '主要武器'
        }, {
            flagKey: 'profile',
            flagLabel: '简况'
        }

    ];


    var kvFlags = {
        platKvFlags:platKvFlags
    };

    const subListRequestAdaptor = function (api) {
        console.log("🚀 ~ file: myutils.js ~ line 4 ~ subListRequestAdaptor ~ api", api);
        

        var urlHost = api.url.split('?')[0];

        var query = api.query;
        let {
            $id,
            orderBy,
            orderDir
        }=query;

        urlHost=urlHost.replace(/:id/,$id);
        

        let newQuery2List = [];
        if (orderBy && orderDir) {
            let orderStr = 'sort=[' + orderBy + ':' + orderDir + ']';
            console.log("🚀 ~ file: myutils.js ~ line 58 ~ requestAdaptor ~ orderStr", orderStr);
            newQuery2List.push(orderStr);
        }

        let newQuery2ListStr = newQuery2List.join('&');
        api.url = urlHost + '?' + newQuery2ListStr;

        let newApi = {
            ...api
        };
        console.log("🚀 ~ file: myutils.js ~ line 30 ~ subListRequestAdaptor ~ newApi", newApi);

        return newApi;
    };

    const requestAdaptor = function (api) {
        console.log("🚀 ~ file: myutils.js ~ line 3 ~ requestAdaptor ~ api", api);
        console.log("🚀 ~ requestAdaptor ~ api.url", api.url);

        var urlHost = api.url.split('?')[0];

        var query = api.query;
        var page = query.page;
        var perPage = query.perPage;




        var limit = perPage;
        var offset = (page - 1) * perPage;

        var newQuery = {
            ...query,
        };
        delete newQuery['page'];
        delete newQuery['perPage'];

        let subQueryList = [];

        for (let key in newQuery) {
            if (/.*,.*/.test(key)) {
                let value = newQuery[key];
                let subKeys = key.split(',');
                subKeys.forEach(subKey => {
                    let subQueryStr = subKey + ':like:\'%25' + String(value) + '\%25\'';
                    subQueryList.push(subQueryStr);
                });
            }
        }

        let subQueryListStr = '[' + subQueryList.join('|') + ']';

        let newQuery2List = [
            "limit=" + limit,
            "offset=" + offset
        ];

        // 排序
        let {
            orderBy,
            orderDir
        } = query;

        if (orderBy && orderDir) {
            let orderStr = 'sort=[' + orderBy + ':' + orderDir + ']';
            console.log("🚀 ~ file: myutils.js ~ line 58 ~ requestAdaptor ~ orderStr", orderStr);

            newQuery2List.push(orderStr);
        }


        if (subQueryList.length) {
            newQuery2List.push("query=" + subQueryListStr);
        }

        let newQuery2ListStr = newQuery2List.join('&');




        api.url = urlHost + '?' + newQuery2ListStr;
        console.log("🚀 ~ requestAdaptor ~ api.url ", api.url);

        var obj1 = {
            ...api
        };

        return obj1;
    };

    const listResponseAdapter = function (payload, response) {
        // return {
        //     ...payload,
        //     status: payload.code === 200 ? 0 : payload.code
        // };
        console.log("🚀 ~ file: myutils.js ~ line 32 ~ listResponseAdapter ~ response.headers['sum']", response.headers['sum']);
        var amisList = {
            msg: '',
            status: '0',
            data: {
                "rows": payload,
                "count": response.headers['sum']
            }
        };

        return amisList;
    };

    function objToKvList(obj) {
        let list = [];
        for (let key in obj) {
            let item = {
                key,
                value: obj[key]
            };
            list.push(item);
        }
        return list;
    }

    const platItemResponseAdapter = function (payload, response, api) {

        var newItem = {
            ...payload,
            _origin: payload
        };

        if (payload.img && payload.img.file_data) {
            newItem.imgSrc = 'data:image/jpeg;base64,' + payload.img.file_data;
        }

        var kvContainerList = [];


        kvFlags.platKvFlags.forEach(item => {
            let flagKey = item['flagKey'];
            if (typeof payload[flagKey] == 'object') {
                delete newItem[flagKey];
                var kvItems = objToKvList(payload[flagKey]);
                var kvContainer = {
                    ...item,
                    kvItems: kvItems
                };
                kvContainerList.push(kvContainer);
            }
        });
        newItem.kvContainerList = kvContainerList;

        var techKvList = objToKvList(payload['tech']);
        newItem.techKvList = techKvList;
        newItem.profileKvList = objToKvList(payload['profile']);
        newItem.weaponsKvList = objToKvList(payload['weapons']);


        return newItem;
    };



    var myutils = {
        subListRequestAdaptor,
        requestAdaptor,
        listResponseAdapter,
        platItemResponseAdapter
    };

    let platListOperationItems = [{
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
                    "link": "/plat/${id}/edit?title=${name}"
                },
                {
                    "type": "button",
                    "label": "删除",
                    "level": "danger",
                    "actionType": "ajax",
                    "confirmText": "您确认要删除?",
                    // "api": "get:/api/url/destroy/${id}"
                    "api": "delete:/api/plat/0.1/${id}"
                }
            ]
        }],
        "placeholder": "-",
        "fixed": "right"
    }];

    // {
    //     int UNDEFINED = 0;
    //     int WARSHIP = 1;
    //     int PLANE = 2;
    //     int ARMOURED_VEHICLE = 3;
    //     int MIL_SAT = 4;
    // }
    let platTypes = {
        "1": "舰船",
        "2": "飞机",
        "3": "装甲车",
        "4": "卫星",
        "*":"其他"
    };

    let platDataColumns = [{
        "name": "id",
        "label": "ID",
        "width": 20,
        "sortable": true
      },
      {
        "name": "name",
        "label": "名称",
        "sortable": true
      },
      {
        "name": "time",
        "type": "tpl",
        "label": "时间",
        "sortable": true,
        "tpl": "${time|date:LLL:x}"

      },
      {
        "label": "装备",
        "name": "id",
        "type": "link",
        "href": "/#/plat/${id}/device",
        "blank": false,
        "body": "装备列表"
      },

      
      {
        "label": "厂商",
        "name": "vendor",
        "type": "link",
        "href": "/#/plat/${id}/vendor",
        "blank": false,
        "body": "厂商列表"
      },


      {
        name: 'type',
        label: '类型',
        "type": "mapping",
        "map": platTypes
      },
      {
        "name": "country",
        "label": "国家(地区)",
        "sortable": true
      }
    ];

    let columns=platDataColumns.concat(platListOperationItems);

    const platList2 = {
      "type": "page",
      "title": "平台列表",
      "remark": null,
      "name": "page-demo",
      // "toolbar": [{
      //   "type": "button",
      //   "actionType": "link",
      //   "link": "/crud/url/url-add",
      //   "label": "新增",
      //   "primary": true.
      // }],
      "body": [{
        "type": "crud",
        "name": "sample",
        "perPage": 10,

        api: {
          method: 'get',
          url: '/api/plat/0.1',
          requestAdaptor: myutils.requestAdaptor,
          adaptor: myutils.listResponseAdapter
        },

        "filter": {
          "title": "",
          "mode": "inline",
          "wrapWithPanel": false,
          "submitText": "",
          "controls": [{
            "type": "text",
            "name": "country,name",
            "placeholder": "通过关键字搜索",
            "addOn": {
              "label": "搜索",
              "type": "submit",
              "className": "btn-success"
            },
            "clearable": true
          }],
          "className": "m-b-sm"
        },
        "bulkActions": [

        ],
        "columns": columns,
        "affixHeader": true,
        "columnsTogglable": "auto",
        "placeholder": "暂无数据",
        "tableClassName": "table-db table-striped",
        "headerClassName": "crud-table-header",
        "footerClassName": "crud-table-footer",
        "toolbarClassName": "crud-table-toolbar",
        "combineNum": 0,
        "bodyClassName": "panel-default"
      }]
    };

    var areaCode = [{
            'short': 'CN',
            'name': '中国',
            'en': 'China',
            'tel': '86',
        },
        {
            'short': 'AD',
            'name': '安道尔共和国',
            'en': 'Andorra',
            'tel': '376',
        }, {
            'short': 'AE',
            'name': '阿拉伯联合酋长国',
            'en': 'UnitedArabEmirates',
            'tel': '971',
        }, {
            'short': 'AF',
            'name': '阿富汗',
            'en': 'Afghanistan',
            'tel': '93',
        }, {
            'short': 'AG',
            'name': '安提瓜和巴布达',
            'en': 'AntiguaandBarbuda',
            'tel': '1268',
        }, {
            'short': 'AI',
            'name': '安圭拉岛',
            'en': 'Anguilla',
            'tel': '1264',
        }, {
            'short': 'AL',
            'name': '阿尔巴尼亚',
            'en': 'Albania',
            'tel': '355',
        }, {
            'short': 'AM',
            'name': '亚美尼亚',
            'en': 'Armenia',
            'tel': '374',
        }, {
            'short': '',
            'name': '阿森松',
            'en': 'Ascension',
            'tel': '247',
        }, {
            'short': 'AO',
            'name': '安哥拉',
            'en': 'Angola',
            'tel': '244',
        }, {
            'short': 'AR',
            'name': '阿根廷',
            'en': 'Argentina',
            'tel': '54',
        }, {
            'short': 'AT',
            'name': '奥地利',
            'en': 'Austria',
            'tel': '43',
        }, {
            'short': 'AU',
            'name': '澳大利亚',
            'en': 'Australia',
            'tel': '61',
        }, {
            'short': 'AZ',
            'name': '阿塞拜疆',
            'en': 'Azerbaijan',
            'tel': '994',
        }, {
            'short': 'BB',
            'name': '巴巴多斯',
            'en': 'Barbados',
            'tel': '1246',
        }, {
            'short': 'BD',
            'name': '孟加拉国',
            'en': 'Bangladesh',
            'tel': '880',
        }, {
            'short': 'BE',
            'name': '比利时',
            'en': 'Belgium',
            'tel': '32',
        }, {
            'short': 'BF',
            'name': '布基纳法索',
            'en': 'Burkina-faso',
            'tel': '226',
        }, {
            'short': 'BG',
            'name': '保加利亚',
            'en': 'Bulgaria',
            'tel': '359',
        }, {
            'short': 'BH',
            'name': '巴林',
            'en': 'Bahrain',
            'tel': '973',
        }, {
            'short': 'BI',
            'name': '布隆迪',
            'en': 'Burundi',
            'tel': '257',
        }, {
            'short': 'BJ',
            'name': '贝宁',
            'en': 'Benin',
            'tel': '229',
        }, {
            'short': 'BL',
            'name': '巴勒斯坦',
            'en': 'Palestine',
            'tel': '970',
        }, {
            'short': 'BM',
            'name': '百慕大群岛',
            'en': 'BermudaIs.',
            'tel': '1441',
        }, {
            'short': 'BN',
            'name': '文莱',
            'en': 'Brunei',
            'tel': '673',
        }, {
            'short': 'BO',
            'name': '玻利维亚',
            'en': 'Bolivia',
            'tel': '591',
        }, {
            'short': 'BR',
            'name': '巴西',
            'en': 'Brazil',
            'tel': '55',
        }, {
            'short': 'BS',
            'name': '巴哈马',
            'en': 'Bahamas',
            'tel': '1242',
        }, {
            'short': 'BW',
            'name': '博茨瓦纳',
            'en': 'Botswana',
            'tel': '267',
        }, {
            'short': 'BY',
            'name': '白俄罗斯',
            'en': 'Belarus',
            'tel': '375',
        }, {
            'short': 'BZ',
            'name': '伯利兹',
            'en': 'Belize',
            'tel': '501',
        }, {
            'short': 'CA',
            'name': '加拿大',
            'en': 'Canada',
            'tel': '1',
        }, {
            'short': '',
            'name': '开曼群岛',
            'en': 'CaymanIs.',
            'tel': '1345',
        }, {
            'short': 'CF',
            'name': '中非共和国',
            'en': 'CentralAfricanRepublic',
            'tel': '236',
        }, {
            'short': 'CG',
            'name': '刚果',
            'en': 'Congo',
            'tel': '242',
        }, {
            'short': 'CH',
            'name': '瑞士',
            'en': 'Switzerland',
            'tel': '41',
        }, {
            'short': 'CK',
            'name': '库克群岛',
            'en': 'CookIs.',
            'tel': '682',
        }, {
            'short': 'CL',
            'name': '智利',
            'en': 'Chile',
            'tel': '56',
        }, {
            'short': 'CM',
            'name': '喀麦隆',
            'en': 'Cameroon',
            'tel': '237',
        }, {
            'short': 'CO',
            'name': '哥伦比亚',
            'en': 'Colombia',
            'tel': '57',
        }, {
            'short': 'CR',
            'name': '哥斯达黎加',
            'en': 'CostaRica',
            'tel': '506',
        }, {
            'short': 'CS',
            'name': '捷克',
            'en': 'Czech',
            'tel': '420',
        }, {
            'short': 'CU',
            'name': '古巴',
            'en': 'Cuba',
            'tel': '53',
        }, {
            'short': 'CY',
            'name': '塞浦路斯',
            'en': 'Cyprus',
            'tel': '357',
        }, {
            'short': 'CZ',
            'name': '捷克',
            'en': 'CzechRepublic',
            'tel': '420',
        }, {
            'short': 'DE',
            'name': '德国',
            'en': 'Germany',
            'tel': '49',
        }, {
            'short': 'DJ',
            'name': '吉布提',
            'en': 'Djibouti',
            'tel': '253',
        }, {
            'short': 'DK',
            'name': '丹麦',
            'en': 'Denmark',
            'tel': '45',
        }, {
            'short': 'DO',
            'name': '多米尼加共和国',
            'en': 'DominicaRep.',
            'tel': '1890',
        }, {
            'short': 'DZ',
            'name': '阿尔及利亚',
            'en': 'Algeria',
            'tel': '213',
        }, {
            'short': 'EC',
            'name': '厄瓜多尔',
            'en': 'Ecuador',
            'tel': '593',
        }, {
            'short': 'EE',
            'name': '爱沙尼亚',
            'en': 'Estonia',
            'tel': '372',
        }, {
            'short': 'EG',
            'name': '埃及',
            'en': 'Egypt',
            'tel': '20',
        }, {
            'short': 'ES',
            'name': '西班牙',
            'en': 'Spain',
            'tel': '34',
        }, {
            'short': 'ET',
            'name': '埃塞俄比亚',
            'en': 'Ethiopia',
            'tel': '251',
        }, {
            'short': 'FI',
            'name': '芬兰',
            'en': 'Finland',
            'tel': '358',
        }, {
            'short': 'FJ',
            'name': '斐济',
            'en': 'Fiji',
            'tel': '679',
        }, {
            'short': 'FR',
            'name': '法国',
            'en': 'France',
            'tel': '33',
        }, {
            'short': 'GA',
            'name': '加蓬',
            'en': 'Gabon',
            'tel': '241',
        }, {
            'short': 'GB',
            'name': '英国',
            'en': 'UnitedKiongdom',
            'tel': '44',
        }, {
            'short': 'GD',
            'name': '格林纳达',
            'en': 'Grenada',
            'tel': '1809',
        }, {
            'short': 'GE',
            'name': '格鲁吉亚',
            'en': 'Georgia',
            'tel': '995',
        }, {
            'short': 'GF',
            'name': '法属圭亚那',
            'en': 'FrenchGuiana',
            'tel': '594',
        }, {
            'short': 'GH',
            'name': '加纳',
            'en': 'Ghana',
            'tel': '233',
        }, {
            'short': 'GI',
            'name': '直布罗陀',
            'en': 'Gibraltar',
            'tel': '350',
        }, {
            'short': 'GM',
            'name': '冈比亚',
            'en': 'Gambia',
            'tel': '220',
        }, {
            'short': 'GN',
            'name': '几内亚',
            'en': 'Guinea',
            'tel': '224',
        }, {
            'short': 'GR',
            'name': '希腊',
            'en': 'Greece',
            'tel': '30',
        }, {
            'short': 'GT',
            'name': '危地马拉',
            'en': 'Guatemala',
            'tel': '502',
        }, {
            'short': 'GU',
            'name': '关岛',
            'en': 'Guam',
            'tel': '1671',
        }, {
            'short': 'GY',
            'name': '圭亚那',
            'en': 'Guyana',
            'tel': '592',
        }, {
            'short': 'HK',
            'name': '香港特别行政区',
            'en': 'Hongkong',
            'tel': '852',
        }, {
            'short': 'HN',
            'name': '洪都拉斯',
            'en': 'Honduras',
            'tel': '504',
        }, {
            'short': 'HT',
            'name': '海地',
            'en': 'Haiti',
            'tel': '509',
        }, {
            'short': 'HU',
            'name': '匈牙利',
            'en': 'Hungary',
            'tel': '36',
        }, {
            'short': 'ID',
            'name': '印度尼西亚',
            'en': 'Indonesia',
            'tel': '62',
        }, {
            'short': 'IE',
            'name': '爱尔兰',
            'en': 'Ireland',
            'tel': '353',
        }, {
            'short': 'IL',
            'name': '以色列',
            'en': 'Israel',
            'tel': '972',
        }, {
            'short': 'IN',
            'name': '印度',
            'en': 'India',
            'tel': '91',
        }, {
            'short': 'IQ',
            'name': '伊拉克',
            'en': 'Iraq',
            'tel': '964',
        }, {
            'short': 'IR',
            'name': '伊朗',
            'en': 'Iran',
            'tel': '98',
        }, {
            'short': 'IS',
            'name': '冰岛',
            'en': 'Iceland',
            'tel': '354',
        }, {
            'short': 'IT',
            'name': '意大利',
            'en': 'Italy',
            'tel': '39',
        }, {
            'short': '',
            'name': '科特迪瓦',
            'en': 'IvoryCoast',
            'tel': '225',
        }, {
            'short': 'JM',
            'name': '牙买加',
            'en': 'Jamaica',
            'tel': '1876',
        }, {
            'short': 'JO',
            'name': '约旦',
            'en': 'Jordan',
            'tel': '962',
        }, {
            'short': 'JP',
            'name': '日本',
            'en': 'Japan',
            'tel': '81',
        }, {
            'short': 'KE',
            'name': '肯尼亚',
            'en': 'Kenya',
            'tel': '254',
        }, {
            'short': 'KG',
            'name': '吉尔吉斯坦',
            'en': 'Kyrgyzstan',
            'tel': '331',
        }, {
            'short': 'KH',
            'name': '柬埔寨',
            'en': 'Kampuchea(Cambodia)',
            'tel': '855',
        }, {
            'short': 'KP',
            'name': '朝鲜',
            'en': 'NorthKorea',
            'tel': '850',
        }, {
            'short': 'KR',
            'name': '韩国',
            'en': 'Korea',
            'tel': '82',
        }, {
            'short': 'KT',
            'name': '科特迪瓦共和国',
            'en': 'RepublicofIvoryCoast',
            'tel': '225',
        }, {
            'short': 'KW',
            'name': '科威特',
            'en': 'Kuwait',
            'tel': '965',
        }, {
            'short': 'KZ',
            'name': '哈萨克斯坦',
            'en': 'Kazakstan',
            'tel': '327',
        }, {
            'short': 'LA',
            'name': '老挝',
            'en': 'Laos',
            'tel': '856',
        }, {
            'short': 'LB',
            'name': '黎巴嫩',
            'en': 'Lebanon',
            'tel': '961',
        }, {
            'short': 'LC',
            'name': '圣卢西亚',
            'en': 'St.Lucia',
            'tel': '1758',
        }, {
            'short': 'LI',
            'name': '列支敦士登',
            'en': 'Liechtenstein',
            'tel': '423',
        }, {
            'short': 'LK',
            'name': '斯里兰卡',
            'en': 'SriLanka',
            'tel': '94',
        }, {
            'short': 'LR',
            'name': '利比里亚',
            'en': 'Liberia',
            'tel': '231',
        }, {
            'short': 'LS',
            'name': '莱索托',
            'en': 'Lesotho',
            'tel': '266',
        }, {
            'short': 'LT',
            'name': '立陶宛',
            'en': 'Lithuania',
            'tel': '370',
        }, {
            'short': 'LU',
            'name': '卢森堡',
            'en': 'Luxembourg',
            'tel': '352',
        }, {
            'short': 'LV',
            'name': '拉脱维亚',
            'en': 'Latvia',
            'tel': '371',
        }, {
            'short': 'LY',
            'name': '利比亚',
            'en': 'Libya',
            'tel': '218',
        }, {
            'short': 'MA',
            'name': '摩洛哥',
            'en': 'Morocco',
            'tel': '212',
        }, {
            'short': 'MC',
            'name': '摩纳哥',
            'en': 'Monaco',
            'tel': '377',
        }, {
            'short': 'MD',
            'name': '摩尔多瓦',
            'en': 'Moldova,Republicof',
            'tel': '373',
        }, {
            'short': 'MG',
            'name': '马达加斯加',
            'en': 'Madagascar',
            'tel': '261',
        }, {
            'short': 'ML',
            'name': '马里',
            'en': 'Mali',
            'tel': '223',
        }, {
            'short': 'MM',
            'name': '缅甸',
            'en': 'Burma',
            'tel': '95',
        }, {
            'short': 'MN',
            'name': '蒙古',
            'en': 'Mongolia',
            'tel': '976',
        }, {
            'short': 'MO',
            'name': '澳门',
            'en': 'Macao',
            'tel': '853',
        }, {
            'short': 'MS',
            'name': '蒙特塞拉特岛',
            'en': 'MontserratIs',
            'tel': '1664',
        }, {
            'short': 'MT',
            'name': '马耳他',
            'en': 'Malta',
            'tel': '356',
        }, {
            'short': '',
            'name': '马里亚那群岛',
            'en': 'MarianaIs',
            'tel': '1670',
        }, {
            'short': '',
            'name': '马提尼克',
            'en': 'Martinique',
            'tel': '596',
        }, {
            'short': 'MU',
            'name': '毛里求斯',
            'en': 'Mauritius',
            'tel': '230',
        }, {
            'short': 'MV',
            'name': '马尔代夫',
            'en': 'Maldives',
            'tel': '960',
        }, {
            'short': 'MW',
            'name': '马拉维',
            'en': 'Malawi',
            'tel': '265',
        }, {
            'short': 'MX',
            'name': '墨西哥',
            'en': 'Mexico',
            'tel': '52',
        }, {
            'short': 'MY',
            'name': '马来西亚',
            'en': 'Malaysia',
            'tel': '60',
        }, {
            'short': 'MZ',
            'name': '莫桑比克',
            'en': 'Mozambique',
            'tel': '258',
        }, {
            'short': 'NA',
            'name': '纳米比亚',
            'en': 'Namibia',
            'tel': '264',
        }, {
            'short': 'NE',
            'name': '尼日尔',
            'en': 'Niger',
            'tel': '977',
        }, {
            'short': 'NG',
            'name': '尼日利亚',
            'en': 'Nigeria',
            'tel': '234',
        }, {
            'short': 'NI',
            'name': '尼加拉瓜',
            'en': 'Nicaragua',
            'tel': '505',
        }, {
            'short': 'NL',
            'name': '荷兰',
            'en': 'Netherlands',
            'tel': '31',
        }, {
            'short': 'NO',
            'name': '挪威',
            'en': 'Norway',
            'tel': '47',
        }, {
            'short': 'NP',
            'name': '尼泊尔',
            'en': 'Nepal',
            'tel': '977',
        }, {
            'short': '',
            'name': '荷属安的列斯',
            'en': 'NetheriandsAntilles',
            'tel': '599',
        }, {
            'short': 'NR',
            'name': '瑙鲁',
            'en': 'Nauru',
            'tel': '674',
        }, {
            'short': 'NZ',
            'name': '新西兰',
            'en': 'NewZealand',
            'tel': '64',
        }, {
            'short': 'OM',
            'name': '阿曼',
            'en': 'Oman',
            'tel': '968',
        }, {
            'short': 'PA',
            'name': '巴拿马',
            'en': 'Panama',
            'tel': '507',
        }, {
            'short': 'PE',
            'name': '秘鲁',
            'en': 'Peru',
            'tel': '51',
        }, {
            'short': 'PF',
            'name': '法属玻利尼西亚',
            'en': 'FrenchPolynesia',
            'tel': '689',
        }, {
            'short': 'PG',
            'name': '巴布亚新几内亚',
            'en': 'PapuaNewCuinea',
            'tel': '675',
        }, {
            'short': 'PH',
            'name': '菲律宾',
            'en': 'Philippines',
            'tel': '63',
        }, {
            'short': 'PK',
            'name': '巴基斯坦',
            'en': 'Pakistan',
            'tel': '92',
        }, {
            'short': 'PL',
            'name': '波兰',
            'en': 'Poland',
            'tel': '48',
        }, {
            'short': 'PR',
            'name': '波多黎各',
            'en': 'PuertoRico',
            'tel': '1787',
        }, {
            'short': 'PT',
            'name': '葡萄牙',
            'en': 'Portugal',
            'tel': '351',
        }, {
            'short': 'PY',
            'name': '巴拉圭',
            'en': 'Paraguay',
            'tel': '595',
        }, {
            'short': 'QA',
            'name': '卡塔尔',
            'en': 'Qatar',
            'tel': '974',
        }, {
            'short': '',
            'name': '留尼旺',
            'en': 'Reunion',
            'tel': '262',
        }, {
            'short': 'RO',
            'name': '罗马尼亚',
            'en': 'Romania',
            'tel': '40',
        }, {
            'short': 'RU',
            'name': '俄罗斯',
            'en': 'Russia',
            'tel': '7',
        }, {
            'short': 'SA',
            'name': '沙特阿拉伯',
            'en': 'SaudiArabia',
            'tel': '966',
        }, {
            'short': 'SB',
            'name': '所罗门群岛',
            'en': 'SolomonIs',
            'tel': '677',
        }, {
            'short': 'SC',
            'name': '塞舌尔',
            'en': 'Seychelles',
            'tel': '248',
        }, {
            'short': 'SD',
            'name': '苏丹',
            'en': 'Sudan',
            'tel': '249',
        }, {
            'short': 'SE',
            'name': '瑞典',
            'en': 'Sweden',
            'tel': '46',
        }, {
            'short': 'SG',
            'name': '新加坡',
            'en': 'Singapore',
            'tel': '65',
        }, {
            'short': 'SI',
            'name': '斯洛文尼亚',
            'en': 'Slovenia',
            'tel': '386',
        }, {
            'short': 'SK',
            'name': '斯洛伐克',
            'en': 'Slovakia',
            'tel': '421',
        }, {
            'short': 'SL',
            'name': '塞拉利昂',
            'en': 'SierraLeone',
            'tel': '232',
        }, {
            'short': 'SM',
            'name': '圣马力诺',
            'en': 'SanMarino',
            'tel': '378',
        }, {
            'short': '',
            'name': '东萨摩亚(美)',
            'en': 'SamoaEastern',
            'tel': '684',
        }, {
            'short': '',
            'name': '西萨摩亚',
            'en': 'SanMarino',
            'tel': '685',
        }, {
            'short': 'SN',
            'name': '塞内加尔',
            'en': 'Senegal',
            'tel': '221',
        }, {
            'short': 'SO',
            'name': '索马里',
            'en': 'Somali',
            'tel': '252',
        }, {
            'short': 'SR',
            'name': '苏里南',
            'en': 'Suriname',
            'tel': '597',
        }, {
            'short': 'ST',
            'name': '圣多美和普林西比',
            'en': 'SaoTomeandPrincipe',
            'tel': '239',
        }, {
            'short': 'SV',
            'name': '萨尔瓦多',
            'en': 'EISalvador',
            'tel': '503',
        }, {
            'short': 'SY',
            'name': '叙利亚',
            'en': 'Syria',
            'tel': '963',
        }, {
            'short': 'SZ',
            'name': '斯威士兰',
            'en': 'Swaziland',
            'tel': '268',
        }, {
            'short': 'TD',
            'name': '乍得',
            'en': 'Chad',
            'tel': '235',
        }, {
            'short': 'TG',
            'name': '多哥',
            'en': 'Togo',
            'tel': '228',
        }, {
            'short': 'TH',
            'name': '泰国',
            'en': 'Thailand',
            'tel': '66',
        }, {
            'short': 'TJ',
            'name': '塔吉克斯坦',
            'en': 'Tajikstan',
            'tel': '992',
        }, {
            'short': 'TM',
            'name': '土库曼斯坦',
            'en': 'Turkmenistan',
            'tel': '993',
        }, {
            'short': 'TN',
            'name': '突尼斯',
            'en': 'Tunisia',
            'tel': '216',
        }, {
            'short': 'TO',
            'name': '汤加',
            'en': 'Tonga',
            'tel': '676',
        }, {
            'short': 'TR',
            'name': '土耳其',
            'en': 'Turkey',
            'tel': '90',
        }, {
            'short': 'TT',
            'name': '特立尼达和多巴哥',
            'en': 'TrinidadandTobago',
            'tel': '1809',
        }, {
            'short': 'TW',
            'name': '台湾省',
            'en': 'Taiwan',
            'tel': '886',
        }, {
            'short': 'TZ',
            'name': '坦桑尼亚',
            'en': 'Tanzania',
            'tel': '255',
        }, {
            'short': 'UA',
            'name': '乌克兰',
            'en': 'Ukraine',
            'tel': '380',
        }, {
            'short': 'UG',
            'name': '乌干达',
            'en': 'Uganda',
            'tel': '256',
        }, {
            'short': 'US',
            'name': '美国',
            'en': 'UnitedStatesofAmerica',
            'tel': '1',
        }, {
            'short': 'UY',
            'name': '乌拉圭',
            'en': 'Uruguay',
            'tel': '598',
        }, {
            'short': 'UZ',
            'name': '乌兹别克斯坦',
            'en': 'Uzbekistan',
            'tel': '233',
        }, {
            'short': 'VC',
            'name': '圣文森特岛',
            'en': 'SaintVincent',
            'tel': '1784',
        }, {
            'short': 'VE',
            'name': '委内瑞拉',
            'en': 'Venezuela',
            'tel': '58',
        }, {
            'short': 'VN',
            'name': '越南',
            'en': 'Vietnam',
            'tel': '84',
        }, {
            'short': 'YE',
            'name': '也门',
            'en': 'Yemen',
            'tel': '967',
        }, {
            'short': 'YU',
            'name': '南斯拉夫',
            'en': 'Yugoslavia',
            'tel': '381',
        }, {
            'short': 'ZA',
            'name': '南非',
            'en': 'SouthAfrica',
            'tel': '27',
        }, {
            'short': 'ZM',
            'name': '赞比亚',
            'en': 'Zambia',
            'tel': '260',
        }, {
            'short': 'ZR',
            'name': '扎伊尔',
            'en': 'Zaire',
            'tel': '243',
        }, {
            'short': 'ZW',
            'name': '津巴布韦',
            'en': 'Zimbabwe',
            'tel': '263',
        }
    ];

    let dict1 = {
        1: '普通',
        2: '内部',
        4: '秘密',
        8: '机密',
        16: '绝密'
    };


    let areaCategoryList = areaCode.map(v => {
        let newItem = {
            ...v,
            label: v.name,
            value: v.tel,

        };

        let dict1Options = [];
        for (let key in dict1) {
            console.log("🚀 ~ file: rootPage.js ~ line 12 ~ key", key);
            let item = {
                label: dict1[key],
                value: v.tel + '-' + key
            };
            dict1Options.push(item);
        }
        console.log("🚀 ~ file: rootPage.js ~ line 18 ~ dict1Options", dict1Options);

        newItem.children = dict1Options;
        return newItem;
    });

    var rootPage = {
        "type": "grid",
        "columns": [{
                // "columnClassName": "bg-green-300",
                md:4,
                sm:6,
                lg:3,
                "body": [

                    {
                        "type": "input-tree",
                        "name": "tree",
                        submitOnChange:true,
                        "searchable": true,
                        // "label": "Tree",
                        "showOutline": true,
                        "initiallyOpen": false,
                        "options": areaCategoryList,
                        "size": "full"
                        // "labelField": "name",
                        // "valueField": "tel"
                    }
                ]
            },
            {
                // "columnClassName": "bg-blue-300",
                "body": [{
                    "type": "panel",
                    "title": "国家平台列表",
                    "body": platList2
                  }]
            }
        ]
    };

    let amis = amisRequire('amis/embed');
    // 通过替换下面这个配置来生成不同页面
    let amisJSON = {
      type: 'page',
      title: '主页',
      body: rootPage
    };
    amis.embed('#root', amisJSON);



    var main = {
      platMain: amisJSON
    };

    // document.getElementById('')

    return main;

}));
