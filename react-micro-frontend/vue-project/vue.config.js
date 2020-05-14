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
            libraryTarget: "window", //挂载目标
        }
    },
    devServer: {
        contentBase: './',
        compress: true,
    }
};