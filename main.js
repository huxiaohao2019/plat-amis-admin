import pages from "./pages/site";
const app = {
  type: 'app',
  brandName: '信息平台',
  "definitions": {
    "aa": {
      "type": "page",
      // "name": "jack",
      // "value": "ref value",
      "labelRemark": "通过<code>\\$ref ${text} </code>引入的组件"
    }
  },
  logo: '/public/logo.png',
  header: {
    type: 'tpl',
    inline: false,
    className: 'w-full',
    tpl: '<div class="flex justify-between"><div></div><div></div></div>'
  },
  // footer: '<div class="p-2 text-center bg-light">底部区域</div>',
  // asideBefore: '<div class="p-2 text-center">菜单前面区域</div>',
  // asideAfter: '<div class="p-2 text-center">菜单后面区域</div>',
  // api: '/pages/site.json'
  pages: pages
};
export default {
  amisApp: app
};