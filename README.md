# 微前端落地指南

## 0. 关于

最近一段时间，由于未来工作中涉及工业应用较多，并且考虑以后需要将工业应用在同一系统进行展示，希望有一个突破口可以解决这个问题，即在一个总项目中展示不同的工业应用，每个工业应用是一个单独的项目，由于工业应用可能由于不同团队进行开发，应用开发技术栈最好没有限制，单一前端框架可能不再能满足要求，由此了解到微前端并进行尝试研究，希望借助微前端可以解决工业应用汇总展示的问题。

当然微前端的实现方式不有很多种，包括iframe、single-spa等，本文采用的主要是single-spa。如果你使用过iframe就会知道，iframe和single-spa完全不是一个难度，如果把iframe比作是easy模式，那么single-spa便是地狱模式，如果你的项目着急上线使用微前端最快的方法就是iframe，，相信也有很多人在想搞一下微前端的同学们，猝死在了研究single-spa的路上，还有也是资料的缺少，因为现在网上虽然微前端文章很多，但是大多只是理论介绍和部分代码的展示，并没法帮助我们真正落地在项目中去实施。

single-spa使用的主要难点在于：
1.对于总项目，如何完美兼容各个子项目，做到技术栈无关，并且让用户感觉是一个整体项目。
2.对于各个子项目，如何减少代码侵入，并且使其具有<font color="red">独立开发、独立运行、独立部署</font>的能力。



## Contents

- [引言](#preface)

- [微前端是什么](#what)

- [参考文章](#title9)

- [参考代码](#title10)

  

## <a id="what"><font color="black">1. 微前端是什么</font></a>

微前端是借鉴后端微服务的概念而来，[single-spa官网](https://single-spa.js.org/)解释到，A microfrontend is a microservice that exists within a browser即微前端是浏览器中存在的微服务，微前端也是UI的一部分，通常由数十个组件组成，而这些组件可以是React，Vue和Angular等不同框架实现的，每个微前端项目可以交由不同的团队进行管理，每个团队也可以选择自己的框架。尽管在迁移或实验时可能会添有其它框架，但是最好对所有微前端使用一个框架，这是最实用的。
每个微前端项目可以放在不同的git存储库中，有自己的package.json和构建工具配置。这样每一个微前端项目都有一个独立的构建打包过程和独立的部署，也就意味着我们可以快速完成我们的微前端项目的打包上线，而不用每次对一个巨无霸（Monolith）项目进行操作，后期有新的需求，也只需要修改对应的微前端项目。



## <a id="what"><font color="black">2. 为什么要用微前端</font></a>

目前随着前端的不断发展，企业工程项目体积越来越大，页面越来越多，项目变得十分臃肿，维护起来也十分困难，有时我们仅仅更改项目简单样式，都需要整个项目重新打包上线，给开发人员造成了不小的麻烦，也非常浪费时间。老项目为了融入到新项目也需要不断进行重构，造成的人力成本也非常的高。

>  在前端开发工作中，面临的困难：

1. 企业工程项目越来越大，项目构建部署速度慢。
2. 工程团队人员较多，技术栈难以统一，异地团队间沟通成本高，开发代码容易冲突，会影响整个项目。
3. 旧项目重构，代码改动太大，消耗时间严重。	

> 对比分析：

1. 具有独立运行、独立部署功能，构建部署速度快。
2. 技术栈无关，具有独立开发功能，避免开发冲突，减少协作成本。
3. 旧项目可以作为微前端项目一部分，避免重构。



## <a id="what"><font color="black">3. 微前端实现方式</font></a>

微前端实现方式有两种：

1.iframe嵌入 （难度：★）

2.single-spa合并类单页应用 （难度：★★★★★）

## <a id="what"><font color="black">4. iframe</font></a>

iframe嵌入方式比较容易实现，不再赘述。

#### Why Not Iframe

> 为什么不用 iframe，这几乎是所有微前端方案第一个会被 challenge 的问题。但是大部分微前端方案又不约而同放弃了 iframe 方案，自然是有原因的，并不是为了 "炫技" 或者刻意追求 "特立独行"。

> iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。

> 1. url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
> 2. UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中.
> 3. 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
> 4. 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。

> 其中有的问题比较好解决(问题1)，有的问题我们可以睁一只眼闭一只眼(问题4)，但有的问题我们则很难解决(问题3)甚至无法解决(问题2)，而这些无法解决的问题恰恰又会给产品带来非常严重的体验问题， 最终导致我们舍弃了 iframe 方案。

> 参考文章：
> [Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)

## <a id="what"><font color="black">5. single-spa</font></a>

>  single-spa实现原理：
>
> 首先对微前端路由进行注册，使用single-spa充当微前端加载器，并作为项目单一入口来接受所有页面URL的访问，根据页面URL与微前端的匹配关系，选择加载对应的微前端模块，再由该微前端模块进行路由响应URL，即微前端模块中路由找到相应的组件，渲染页面内容。
>

> 参考文章：
> [single-spa官网](https://single-spa.js.org/)



### 6. 微前端实现过程

#### 6.1 基座项目（父项目改造）

> 基座项目创建：

```javascript
yarn create react-app portal
yarn add antd
// 创建config-overrides.js支持antd按需加载
//    fixBabelImports('import', {
//       libraryName: 'antd',
//      libraryDirectory: 'es',
//      style: true,
//  }),
```

> 本文采用微前端加载原理是：
> 首先在父项目创建dom节点，在项目注册过程输入待挂载的节点，即可完成子项目在父项目中运行。

##### 6.2.1 创建路由及子项目挂载dom节点

>
> 代码如下：

```javascript
  <div className="App" >
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <ul >
            <li key="react" >
              <Link to="/react">React</Link>
            </li>
            <li key="vue" >
              <Link to="/vue">Vue</Link>
            </li>
            <li key="angular" >
              <Link to="/angular">Angular</Link>
            </li>
          </ul>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => { setCollapse(!collapsed) },
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <div id="vue" />
            <div id="react-app" />
            <app-root></app-root>
          </Content>
        </Layout>
      </Layout>
    </div>
```



##### 6.2.1 微前端应用注册

> src文件中创建singleSpa.js文件。
> 将文件引入项目入口文件index.js文件中。
>
> ```javascript
> import React from 'react';
> import ReactDOM from 'react-dom';
> import './index.css';
> import App from './App';
> import { BrowserRouter as Router } from 'react-router-dom'
> import "./singleSpa.js"; // 引入微前端配置文件;
> ```

```javascript
// 项目目录结构
├── public
├── src
│   ├── index.js
│   ├── singleSpa.js
│   └── App.jsx
├── config-overrides.js
├── package.json
├── README.md
├── yarn.lock
```



>
> singleSpa.js部分代码：

```javascript
import * as singleSpa from 'single-spa';

// 注册应用方式参考文章：
// Single-Spa + Vue Cli 微前端落地指南 (项目隔离远程加载，自动引入)(https://juejin.im/post/5dfd8a0c6fb9a0165f490004#heading-2)
/**
 * runScript 一个promise同步方法。可以代替创建一个script标签，然后加载服务
 * @param  {string}         url         请求文件地址
 */
const runScript = async (url) => {
    // 加载css同理
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};

// 注册微前端服务
/* 
    注册所用函数;
    return 一个模块对象（singleSpa），模块对象来自于要加载的js导出（子项目）;
    如果这个函数不需要在线引入，只需要本地引入一块加载：
    () => import('xxx/main.js')
*/
singleSpa.registerApplication(
    'vue',
    async () => {
            await runScript('http://127.0.0.1:8080/js/chunk-vendors.js');
            await runScript('http://127.0.0.1:8080/js/app.js');
            return window.singleVue;
        },
        // 配置微前端模块前缀
        // 纯函数根据参数查看是否处于活动状态
        (location) => location.pathname.startsWith('/vue')
);

singleSpa.start(); // 启动注册,别忘记！
```

> registerApplication参数含义：
>
> 1. `appName: string`
>    应用名称。
>
> 2. `applicationOrLoadingFn: () => <Function | Promise>`
>    返回promise加载函数或者已解析的应用。
>    1. 应用作为参数，该参数由一个带有生命周期的对象组成。
>
> ```js
> const application = {
>   bootstrap: () => Promise.resolve(), //bootstrap function
>   mount: () => Promise.resolve(), //mount function
>   unmount: () => Promise.resolve(), //unmount function
> }
> registerApplication('applicatonName', application, activityFunction)
> ```
>
> ​				2. 加载函数作为参数必须返回一个promise或者异步函数，第一次加载应用程序时，将不带任何参数地调用该函数，返回promise必须和应用一起解决。最常见的加载函数导入方式是：`() => import('/path/to/application.js')`
>
> 3. `activityFn: (location) => boolean`
>    动态函数（activity function），必须是一个纯函数，函数将window.location作为第一个参数提供，并在应用程序处于活动状态时返回一个判断结果。常见使用时，通过动态函数（activity function）第一个参数判断子应用是否处于激活状态。
>
> 4. `customProps?: Object = {}`
>
>    将父项目参数传给子项目。

#### 6.2 微前端项目（子项目改造）

##### 6.2.1 Vue子项目改造

> 环境准备：

```javascript
npm install -g @vue/cli	//全局安装vue-cli
vue create vue-project	// 创建子项目

// 项目目录结构
├── public
├── src
│   ├── main.js
│   ├── assets
│   ├── components
│   └── App.vue
├── vue.config.js
├── package.json
├── README.md
└── yarn.lock
```



> 修改main.js文件进行注册

```javascript
import Vue from 'vue'
import App from './App.vue'
import singleSpaVue from "single-spa-vue";

Vue.config.productionTip = false
// el 为子项目待挂载到父项目的DOM节点！！！
const vueOptions = {
  el: "#vue",
  render: h => h(App)
};

// 主应用注册成功后会在window下挂载singleSpaNavigate方法
// 为了独立运行，避免子项目页面为空，
// 判断如果不在微前端环境下进行独立渲染html
if (!window.singleSpaNavigate) {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions,
});

export const bootstrap = vueLifecycles.bootstrap; // 启动时
export const mount = vueLifecycles.mount; // 挂载时
export const unmount = vueLifecycles.unmount; // 卸载时

export default vueLifecycles;
```

> 根目录创建vue.config.js修改webpack配置

```javascript
module.exports = {
    /* 
        重点：
        设置publicPath，避免父项目加载子项目时，部分资源文件路径为父项目地址，导致请求文件失败。
    */
    publicPath: "//localhost:8080/",
    configureWebpack: {
        devtool: 'none', // 不打包sourcemap
        output: {
            library: "singleVue", // 导出名称
            libraryTarget: "window", //挂载目标,可以在浏览器打印window.singleVue查看
        }
    },
    devServer: {
        contentBase: './',
        compress: true,
    }
};
```

> 子项目改造我们整体可以分为两个步骤：
>
> 1. 子项目入口文件改造，注册微前端，确定子项目挂载节点；
> 2. 子项目webpack出口文件改造，打包后在window下创建singleVue方法。



##### 6.2.1 React子项目改造

> 环境准备：

```javascript
yarn create react-app react  // 创建子项目
yarn add single-spa-react // 安装single-spa-react

// 项目目录结构
├── public
├── src
│   ├── App.js
│   ├── index.js
│   └── serviceWorker.js
├── config
│   ├── jest
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── package.json
├── README.md
└── yarn.lock
```

> 修改index.js文件进行注册

```javascript
import Vue from 'vue'
import App from './App.vue'
import singleSpaVue from "single-spa-vue";

Vue.config.productionTip = false
// el 为子项目待挂载到父项目的DOM节点！！！
const vueOptions = {
  el: "#vue",
  render: h => h(App)
};

// 主应用注册成功后会在window下挂载singleSpaNavigate方法
// 为了独立运行，避免子项目页面为空，
// 判断如果不在微前端环境下进行独立渲染html
if (!window.singleSpaNavigate) {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions,
});

export const bootstrap = vueLifecycles.bootstrap; // 启动时
export const mount = vueLifecycles.mount; // 挂载时
export const unmount = vueLifecycles.unmount; // 卸载时

export default vueLifecycles;
```

> 修改项目启动端口号：

```javascript
// scripts文件夹内start.js文件
- const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
+ const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;
```



> 修改webpack配置，修改config文件夹中webpack.config.js文件

```javascript
- publicPath:paths.publicUrlOrPath
+ publicPath: 'http://localhost:5000/',
+ library: "singleReact", // 导出名称
+ libraryTarget: "window", //挂载目标
```

>父项目首次加载子项目静态文件logo图片报错解决办法：
>
>1. 加载失败后，通过检查发现，父项目中加载子项目图片地址为：http://localhost:3000/static/media/logo.5d5d9eef.svg。
>2. 此时父项目地址为：http://localhost:3000/，子项目地址为：http://localhost:5000/
>3. 不难发现，logo图片请求地址应为子项目地址即http://localhost:5000/static/media/logo.5d5d9eef.svg
>4. 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径，默认publicPath路径为网站根目录的位置，而在父项目加载子项目时，当前网站根目录为http://localhost:3000/
>5. 可以通过将 output.publicPath设置为子项目跟目录http://localhost:5000/解决这个问题。



##### 6.2.1 Angular子项目改造

> 环境准备：

```javascript
npm install -g @angular/cli //全局安装angular/cli,直接安装报错
// 报错信息 TypeError: Cannot read property 'flags' of undefined

npm install @angular/cli@9.0.0 -g // 指定版本安装
ng new angular-project // 创建项目

// 项目目录结构
├── e2e
├── src
│   ├── + `main.single-spa.ts`
│   ├── + `single-spa`	
│   │	├── + `single-spa-props.ts`
│   │	└── + `asset-url.ts`
│   ├── app
│   │	├── + `empty-route`
│   │	│	└── + `empty-route.component.ts`
│   │	├──  empty-route.component.ts
│   │	├──  app.component.ts
│   │	└──  `app.module.ts` //use src/app/empty-route/ EmptyRouteComponent
│   ├── assets
│   ├── environments
│   ├── index.html
│   ├── polyfills.ts
│   └── test.ts
├── node_modules
├── + `extra-webpack.config.js`
├── package.json
├── README.md
├── angular.json
└── yarn.lock
```

> [报错为：TypeError: Cannot read property 'flags' of undefined](https://stackoverflow.com/questions/49544854/typeerror-cannot-read-property-flags-of-undefined)

- Install single-spa-angular.
- Generate `single-spa-props.ts` in `src/single-spa/`
- Generate `asset-url.ts` in `src/single-spa/`
- Generate an EmptyRouteComponent in `src/app/empty-route/`, to be used in app-routing.module.ts.

> 注册应用



```javascript
// src/app/empty-route/empty-route.component.ts 文件内代码

import { Component } from '@angular/core';

@Component({
    selector: 'app2-empty-route',
    template: '',
})
export class EmptyRouteComponent {
}
```



```javascript
// src/app/app.module.ts 文件内代码

+ import { EmptyRouteComponent } from './empty-route/empty-route.component';
@NgModule({
  declarations: [
    AppComponent,
 +  EmptyRouteComponent
  ],
```



```javascript
// src/single-spa/asset-url.ts 文件内代码

export function assetUrl(url: string): string {
    // @ts-ignore
    const publicPath = __webpack_public_path__;
    const publicPathSuffix = publicPath.endsWith('/') ? '' : '/';
    const urlPrefix = url.startsWith('/') ? '' : '/'
  
    return `${publicPath}${publicPathSuffix}assets${urlPrefix}${url}`;
  }
```



```javascript
// src/single-spa/single-spa-props.ts 文件内代码
import { ReplaySubject } from 'rxjs';
import { AppProps } from 'single-spa';

export const singleSpaPropsSubject = new ReplaySubject<SingleSpaProps>(1)
export type SingleSpaProps = AppProps & {
}
```



```javascript
// src/main.singleSpa.ts 文件内代码

import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaAngular } from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
    enableProdMode();
}
// if (!window.singleSpaNavigate) {
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
// }

const lifecycles = singleSpaAngular({
    bootstrapFunction: singleSpaProps => {
        singleSpaPropsSubject.next(singleSpaProps);
        return platformBrowserDynamic().bootstrapModule(AppModule);
    },
    template: '<app2-root />',
    Router,
    NgZone: NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
```



>修改angular.json为修改出口文件做准备工作

```javascript
npm i -D @angular-builders/custom-webpack //用于修改webpack 配置
npm i -D @angular-builders/dev-server
 "build": {
        - "builder": "@angular-devkit/build-angular:browser",
        + "builder": "@angular-builders/custom-webpack:browser",
          "options": {
          + "customWebpackConfig": {
          +   "path": "./extra-webpack.config.js" // 读取文件，修改webpack配置
          + },
          + "deployUrl": "http://localhost:4000/", // 修改publicPath
            "outputPath": "dist/Delete",
            "index": "src/index.html",
————————————————
	"serve": {
      -	"builder": "@angular-devkit/build-angular:dev-server",
	  + "builder": "@angular-builders/custom-webpack:dev-server"
		"options": {
		"browserTarget": "Delete:build"
	 },    
————————————————        
```



> 设置出口文件：
> 创建extra-webpack.config.js并进行配置

```javascript
module.exports = {
  output: {
    library: "singleAngular", // 导出名称
    libraryTarget: "window", // 挂载目标
  },
}
```



> 参考文章：
> [single-spa-angular](https://single-spa.js.org/docs/ecosystem-angular/#migrating-from-single-spa-angular3x-to-single-spa-angular4x)
> [single-spa-angular示例代码地址](https://github.com/joeldenning/coexisting-angular-microfrontends)

|          | angular/cli版本 | single-spa-angular版本 |
| :------: | :-------------: | :--------------------: |
| 官方示例 |      8.1.0      |         3.0.1          |
| 本文示例 |      9.0.0      |           4            |





### 6. 线上部署Nginx配置

>  父项目加载过程中，全部请求：

![image-20200514015629716](C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200514015629716.png)

> 线上部署完成后`首个请求vue/`发生`nginx报错404 Not Found`，通过排查发现nginx查找路径错误：
> 部署访问地址格式为xx.xx:0000/vue/#/app1
> `vue:微前端应用名称;`
> `app1：子项目路由`
> Nginx报错分析：
> 首次发起请求时，由于这里写法类似browerRouter，根据请求会在nginx根目录文件内查找/vue文件夹，并检查是否有index.html文件进行返回。
> 具体步骤：xx.xx:0000/XX => nginx文件中XX文件夹 => 文件夹不存在返回404

> 因为/vue只是为了注册应用，并不需要真正去nginx中的/vue下查找index.html，因为按照这个路径查找并不能查找成功，我们仍希望在原来根地址进行查找。
> ngix 遇到/XXX这样地址会被当作代理，寻找对应文件夹，如果文件夹没有就报错404，但是实际我是希望去进入到我的项目里面，我自己做判断的

> 解决方案：
> 在带有/vue进行访问时，首先进行判断，再使用nginx进行重定向，定向为原根目录。
> `注意事项：`
> 此时进行重定向，但是我们并不希望url地址发生改变，所以我们需要使用rewrite "/xxx" /abc last;的这种跳转形式，但是这种重定向只能对站内url重写，如果rewrite第二个参数以http或者以https开头或者使用permanent都会导致url地址栏改变。（302,301等会修改地址栏的url）

```javascript
location /vue/ {	
			root   /home/nginx/static/html/refining/;
	      		rewrite ^/vue(.*) /;
			index index.html index.htm;
 		}
// 注意重定向保持url不变,

```



原本以为，这样就可以宣告成功了！！！但是现实总是残酷的。
我们刷新浏览器使父项目重新加载子项目，发现父项目中加载子项目文件依然报错，或者返回html导致类型报错。![image-20200512153847346](C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200512153847346.png)

![](C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200512153718893.png)

通过查看请求可以发现，实际请求为：
xx.xx:0000/vue/#/static/css/main.d6XXXXXXXXXX

![image-20200512154155216](C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200512154155216.png)我们发现对子项目静态资源发生请求时，请求地址仍然有/vue，然而我们希望请求应该为：xx.xx:0000/static/css/main.d6XXXXXXXXXX，这样才会成功获取到静态资源。
下面我们继续对静态资源进行重定向：

```javascript
location ~.*(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$ {
	root   /home/nginx/static/html/refining/;
	rewrite ^/vue(.*) /$1 break;//$1 为匹配到的第一个参数，即去掉vue后的请求地址
	index  index.html index.htm;
}
```

>  其它参考配置：

```javascript
server {
    listen 8080;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;
    ssi on;

    # 将 / 重定向到 /browse
    rewrite ^/$ http://localhost:8080/browse redirect;

    # 根据路径访问 html 
    location /browse {
      set $PAGE 'browse';
    }
    location /order {
      set $PAGE 'order';
    }
    location /profile {
      set $PAGE 'profile'
    }

    # 所有其他路径都渲染 /index.html
    error_page 404 /index.html;
}
```



### 7. 展望

> #### 7.1 改造优化
>
> ##### 7.1.1  JS文件自动加载
>
> stats-webpack-plugin生成manifest.json，实现自动加载。
>
> ##### 7.1.2  CSS沙箱
>
> CSS处理用到postcss-loader，postcss-loader用到postcss，我们添加postcss的处理插件，为每一个CSS选择器都添加名为`.namespace-kaoqin`的根选择器，最后打包出来的CSS，如下所示：
>
> ##### 7.1.3  JS沙箱
>
> ##### 7.1.4  加载HTML方式加载子应用
>
> 接入地址只需配置一次，省略使用manifest动态加载，因为html本身就是一个完整的manifest.




<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200514023422714.png" alt="image-20200514023422714" style="zoom: 50%;" />

<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200514023355235.png" style="zoom: 50%;" />

<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200514023342877.png" alt="image-20200514023342877" style="zoom: 50%;" />



## <a id="title9"><font color="black">参考文章</font></a>

- [Single-Spa + Vue Cli 微前端落地指南 (项目隔离远程加载，自动引入)](https://juejin.im/post/5dfd8a0c6fb9a0165f490004#heading-9)
- [微前端实践 ](https://juejin.im/post/5cadd7835188251b2f3a4bb0)
- [微前端 —— portal项目](https://segmentfault.com/a/1190000019957130)
- [全栈增长工程师](https://segmentfault.com/blog/phodal?page=1)(微前端如何落地？详细原理)
- [命令行服务器（http-server)和跨域](https://blog.csdn.net/weixin_43310551/article/details/86304618)
- [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)
- [前端分享会--微前端改造初探](https://www.jianshu.com/p/81350e1068b6)
- [带你手写微前端框架](https://github.com/YataoZhang/my-single-spa/issues/4)
- [深入剖析Vue源码 - 完整挂载流程和模板编译](https://juejin.im/post/5ccafd4d51882540d472a90e)
- [ant design pro 如何使用 qiankun 做微前端（上）](https://zhuanlan.zhihu.com/p/93198281)


## <a id="title10"><font color="black">参考代码</font></a>

- [乾坤](https://github.com/umijs/qiankun)

- [migrating-to-single-spa-react-starter餐车栗子from官网](https://github.com/alocke12992/migrating-to-single-spa-react-starter)

- [microfront-end-single-spa](https://github.com/justwiner/microfront-end-single-spa)

  
