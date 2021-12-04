import pages from "./pages/site";
const app = {
  type: 'app',
  brandName: '信息平台',
  logo: '/public/logo.png',
  header: {
    type: 'tpl',
    inline: false,
    className: 'w-full',
    tpl: '<div class="flex justify-between"><div>顶部区域左侧</div><div>顶部区域右侧</div></div>'
  },
  // footer: '<div class="p-2 text-center bg-light">底部区域</div>',
  // asideBefore: '<div class="p-2 text-center">菜单前面区域</div>',
  // asideAfter: '<div class="p-2 text-center">菜单后面区域</div>',
  // api: '/pages/site.json'
  pages:pages
};
export default {
  amisApp: app
};