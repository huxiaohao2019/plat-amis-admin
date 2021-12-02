(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.platApp = factory());
})(this, (function () { 'use strict';

  const app = {
      type: 'app',
      brandName: '武器平台1',
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
      api: '/pages/site.json'
    };

  return app;

}));
