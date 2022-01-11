import React,{Component} from 'react';
// import * as rootPage from './'
// let rootPage=require('./rootPage');
// import rootP2 from './page2';
// let page2=require('./page2')
import page2 from './page2';

import 'amis/lib/themes/default.css';
// 或 import 'amis/lib/themes/cxd.css';
// 或 import 'amis/lib/themes/dark.css';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';

import axios from 'axios';
import copy from 'copy-to-clipboard';

import {
  render as renderAmis,
  ToastComponent,
  AlertComponent,
  Button
} from 'amis';
import {alert, confirm} from 'amis/lib/components/Alert';
import {toast} from 'amis/lib/components/Toast';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import env from './common/amis-env';

// amis 环境配置
const env1 = {
  // 下面三个接口必须实现
  fetcher: ({
    url, // 接口地址
    method, // 请求方法 get、post、put、delete
    data, // 请求数据
    responseType,
    config, // 其他配置
    headers // 请求头
  }: any) => {
    config = config || {};
    config.withCredentials = true;
    responseType && (config.responseType = responseType);

    if (config.cancelExecutor) {
      config.cancelToken = new (axios as any).CancelToken(
        config.cancelExecutor
      );
    }

    config.headers = headers || {};

    if (method !== 'post' && method !== 'put' && method !== 'patch') {
      if (data) {
        config.params = data;
      }
      return (axios as any)[method](url, config);
    } else if (data && data instanceof FormData) {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (
      data &&
      typeof data !== 'string' &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      data = JSON.stringify(data);
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'application/json';
    }

    return (axios as any)[method](url, data, config);
  },
  isCancel: (value: any) => (axios as any).isCancel(value),
  copy: (content: string) => {
    copy(content);
    toast.success('内容已复制到粘贴板');
  }

  // 后面这些接口可以不用实现

  // 默认是地址跳转
  // jumpTo: (
  //   location: string /*目标地址*/,
  //   action: any /* action对象*/
  // ) => {
  //   // 用来实现页面跳转, actionType:link、url 都会进来。
  // },

  // updateLocation: (
  //   location: string /*目标地址*/,
  //   replace: boolean /*是replace，还是push？*/
  // ) => {
  //   // 地址替换，跟 jumpTo 类似
  // },

  // isCurrentUrl: (
  //   url: string /*url地址*/,
  // ) => {
  //   // 用来判断是否目标地址当前地址
  // },

  // notify: (
  //   type: 'error' | 'success' /**/,
  //   msg: string /*提示内容*/
  // ) => {
  //   toast[type]
  //     ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
  //     : console.warn('[Notify]', type, msg);
  // },
  // alert,
  // confirm,
};

let page3: any = page2;

class AMISComponent extends React.Component<any, any> {
  render() {
    return renderAmis(
      // 这里是 amis 的 Json 配置。
      //  rootPage,
      // rootP2,
      page3,
      // {
      //   "type": "page",
      //   "title": "标题",
      //   "body": "Hello World!"
      // },
      {
        // props...
      },
      env
    );
  }
}

class APP extends React.Component<any, any> {
  render() {
    return (
      <>
        <ToastComponent key="toast" position={'top-right'} />
        <AlertComponent key="alert" />

        <AMISComponent />
        {/* <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} />
                <Route path="/shop" component={Shop} />
            </Switch> */}
      </>
    );
  }
}

export default APP;
