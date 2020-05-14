import * as singleSpa from 'single-spa';


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

singleSpa.registerApplication(
    'react',
    async () => {
            await runScript('http://localhost:5000/static/js/bundle.js');
            await runScript('http://localhost:5000/static/js/main.chunk.js');
            return window.singleReact
        },
        (location) => location.pathname.startsWith('/react')
);

singleSpa.registerApplication(
    'angular',
    async () => {
            await runScript('http://localhost:4000/polyfills.js');
            await runScript('http://localhost:4000/runtime.js');
            await runScript('http://localhost:4000/styles.js');
            await runScript('http://localhost:4000/vendor.js');
            await runScript('http://localhost:4000/main.js');
            return window.singleAngular
        },
        (location) => location.pathname.startsWith('/angular'),
);

singleSpa.start(); // 启动