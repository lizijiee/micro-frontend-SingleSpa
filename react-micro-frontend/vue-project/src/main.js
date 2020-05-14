import Vue from 'vue'
import App from './App.vue'
import singleSpaVue from "single-spa-vue";

Vue.config.productionTip = false
// el 为子项目待挂载到父项目的DOM节点
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