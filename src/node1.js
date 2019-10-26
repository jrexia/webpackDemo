
// var demo=require('./demo');
// console.log(demo);
// let fs = require('fs');
// var demo=require.extensions;
// fs.writeFile('c.txt', '快快快', ()=>{
//
// });

// console.log(demo);
// let fs=require('fs');
// let rs=fs.createReadStream('a.log');
// rs.on('data',function (err) { // options: 参数1:encoding(编码方式) 2:flag flag 默认 = 'r'(读取方式)
//     console.log(err)
// });

// readStream.pipe(writeStream);
// var from = fs.createReadStream('./a.log');
// var to = fs.createWriteStream('./c.txt');
// from.pipe(to);

// var path=require('path');
// let fullPath=path.join(__dirname,'a','b');

var http=require('http');
/**
 *
 * @param req 请求对象: 客户端的请求
 * @param res 响应对象: 客户端的响应 响应行有响应头 响应体
 */
var serve=function(req,res){
    // 设置编码格式
    res.setHeader('Content-type','text/html;charset=utf-8');
    res.write('');
    res.end('hh'+new Date().getTime()+''); // 响应结束 end:end+write,不能接受对象类型的响应体,只能是字符串和buffer
};
var server=http.createServer(serve); // 监听回调函数
server.listen(3307,'127.0.0.1');



