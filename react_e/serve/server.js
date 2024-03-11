/**
 * express Demo
 */
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = require('../app')

//链接mongo 并且使用task_manager这个集合
const DB_URL = "mongodb://localhost/task_manager";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function () {
  console.log("mongo connect success");
});

// 定义 channel 的 Schema
const channelSchema = new Schema({
  id: {type:Number,default:0},
  name: {type:String,default:'fengzi'}
});

// 定义 data 的 Schema
const dataSchema = new Schema({
  channels: [channelSchema]
});



const User = mongoose.model(
  "taskData",
  channelSchema
);

// 新增数据
function createData(params) {
  User.create(
    {
      id:1,
      name:'fengfeng'
    },
    function (err, doc) {
      if (!err) {
        console.log(doc);
      } else {
        console.log(err);
      }
    }
  );
}

// 删除数据
function deleteData(params) {
  User.remove({ user: "xiaolan" }, function (err, doc) {
    console.log(doc);
  });
}

// 修改数据
function updateData(params) {
  User.update({ user: "xiaolan1" }, { $set: { age: 26 } }, function (err, doc) {
    console.log(doc);
  });
}

//查询数据
function findData(res) {
  let result
  User.find({}, function (err, doc) {
    res.json(doc);
    // console.log(doc,'222');
    // result = doc
  });
  return result
}

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

//查询数据
// User.find({}, function (err, doc) {
  // res.json(doc);
//   console.log(doc,'12312312');
// });


module.exports = { createData, deleteData, updateData, findData };
