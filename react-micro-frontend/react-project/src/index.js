import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import singleSpaReact from "single-spa-react";
import * as serviceWorker from './serviceWorker';

if (!window.singleSpaNavigate) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// 创建生命周期实例
const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => document.getElementById("react-app") // 指定要挂载到哪个dom元素上面
});


export const bootstrap = [
  reactLifecycles.bootstrap,
]
// 项目启动后的钩子
export const mount = [
  reactLifecycles.mount,
]
// 项目卸载的钩子
export const unmount = [
  reactLifecycles.unmount,
]



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
