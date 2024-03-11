/**
 * express Demo
 */
const express = require("express");
const mongoose = require("mongoose");

//链接mongo 并且使用task_manager这个集合
const DB_URL = "mongodb://localhost/task_manager";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function () {
  console.log("mongo connect success");
});

//类似于mysql的表 mongo里有文档、字段的概念
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true, default: 0 },
  })
);

// 新增数据
// User.create({
//     user: 'xiaolan',
//     age: 18
// }, function(err, doc){
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })

//删除数据
// User.remove({user: 'xiaolan'},function(err, doc){
//     console.log(doc)
// })

//更新数据
// User.update({'user':'xiaolan'},{'$set':{age: 26}}, function(err, doc){
//     console.log(doc)
// })

const app = express(); //新建app模块

// 当访问这个地址时，就会发送数据回前端
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>"); //发送Html
});

app.get("/data", function (req, res) {
  //查询数据
  User.find({}, function (err, doc) {
    res.json(doc);
  });
  // res.json({name:'imooc React App',type:'IT'}) //发送json
});

app.listen(9093, function () {
  console.log("Node app start at port 9093");
});
