const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取根目录路径
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

// 配置多个产出html文件
let pages=['index','base'];
let pagePlugins=pages.map(page=>new HtmlWebpackPlugin({
    minify  : { // 压缩文件
        removeAttributeQuotes: true // 引入文件删除双引号
    },
    hash    : true, // 引入的资源文件加入hash查询字符串,避免被缓存
    template: resolve(`src/${page}.html`), // 产出的html模板
    filename: `${page}.html`, // 产出的html文件名
    inject  : true,
    title   : '标题', // <%%>
    chunks  : [`${page}`, 'vendor'] // 对应entry里的代码块名,产出的html文件中引入哪些代码块,默认引入全部
}));

module.exports = {
    // 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
    // entry    : './src/index.js', // entry:['./src/index.js','./src/base.js']
    // 运行机制:先找到每个入口(entry),然后从各个入口分别出发,找到依赖的模块(nodule),
    // 然后生成一个chunk(代码块),最后把chunk写到文件系统中(assets)
    // 放一个对象,多入口
    entry    : {
        index : './src/index.js',
        base  : './src/base.js',
        // 引用jquery库
        vendor: 'jquery'
    },
    // 输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
    output   : {
        path    : path.resolve(__dirname, 'dist'), // 输出的文件夹,只能是绝对路径
        // name是entry名字main,hash是根据打包后的文件内容计算出来的一个hash值 hash:8:取8位
        filename: '[name].[hash:8].js' // 打包后的文件名
    },
    // 模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
    module   : {
        rules: [
            // loader: 在js文件中,加载css文件,由于css不是js模块,所以需要转换,这些转换的工具就是loader
            {
                test  : /\.css$/, // 转换文件的匹配正则
                // css-loader:用来解析处理css中的url路径(如:background-url)
                // style-loader:可以把css文件变成style标签插入head中
                loader: ['style-loader', 'css-loader']
            },
            { // 全局引入jquery插件
                test: require.resolve("jquery"), // 得到模块的绝对路径  path.resolve:根据当前路径得到绝对路径
                loader: "expose-loader?jQuery" // expose-loader?变量名:模块名
            },
        ]
    },
    // 扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
    plugins  : [
        // 用来自动向模块内部注入变量,解决 $调用失败
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // 此插件可以自动产出多个html文件
        ...pagePlugins,
        // 热模块替换
        new webpack.HotModuleReplacementPlugin(),
        // 模块名字改变加载
        new webpack.NamedModulesPlugin()
    ],
    // 配置此静态文件服务器,可以预览打包后项目
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 静态文件根目录
        host       : 'localhost', // 主机名
        port       : 8080, // 端口 默认8080
        compress   : true, //服务器返回给浏览器的时候是否启动gzip压缩
        // 把错误输出到浏览器
        // overlay : true,
        // 在终端 只打印错误信息
        // stats  : "errors-only",
        // inline  : true,
        // hot     : true // 热加载
    }
};