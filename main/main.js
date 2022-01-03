import rootPage from "./rootPage";

let amis = amisRequire('amis/embed');
// 通过替换下面这个配置来生成不同页面
let amisJSON = {
  type: 'page',
  title: '主页',
  body: rootPage
};
let amisScoped = amis.embed('#root', amisJSON);
export default {
  platMain: amisJSON
}