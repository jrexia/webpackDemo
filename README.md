# webpackDemo
初步从0开始搭建一个简单的webpack环境

### 1.webpack安装
```
sudo cnpm install webpack webpack-cli -D
```
### 2. 创建src和dist目录
```
mkdir src mkdir dist
```
### 3.基本配置文件 webpack.config.js
### 4. 配置开发服务器
### 5.package.json:
```
"scripts": {

"build": "webpack --mode development",
"dev": "webpack-dev-server --open --mode development "
// --open 打包完成后是否自动打开浏览器预览
}
```
### 6.文件目录├── dist 打包后的文件
```
├── package.json 项目配置信息
├── node_modules npm 安装的依赖包都在这里面
├── haha.js 任意模块js代码
├── src ├── index.html 入口 html
└── index.js 入口文件
└── webpack.config.js webpack 配置文件`
```
