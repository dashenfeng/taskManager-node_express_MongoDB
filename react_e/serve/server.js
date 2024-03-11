/**
 * express Demo
 */
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = require('mongodb');

//链接mongo 并且使用task_manager这个集合
const DB_URL = "mongodb://localhost/task_manager";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function () {
  console.log("mongo connect success");
});

// 定义 channel 的 Schema
const channelSchema = new Schema({
  name: { type: String, default: "" },
  classes: { type: Number, default: 0 },
  detail: { type: String, default: "" },
  time: { type: Number, default: 0 },
});

const User = mongoose.model("taskData", channelSchema);

// 新增数据
function createData(newInfoObj) {
  return new Promise((resolve, reject) => {
    User.create(newInfoObj, function (err, doc) {
      if (!err) {
        resolve(doc)
      } else {
        // console.log(err);
        reject(err);
      }
    });
  });
}

// 删除数据
function deleteData(id) {
  console.log(typeof id,'id998');
  return new Promise((resolve,reject) => {
    User.deleteOne({ _id:ObjectId(id)}, function (err, doc) {
      if (!err) {
        resolve(doc);
      } else {
        reject(err);
      }
    });
  })
}

// 修改数据
function updateData(params) {
  User.update({ user: "xiaolan1" }, { $set: { age: 26 } }, function (err, doc) {
    console.log(doc);
  });
}
function updateData() {
  return new Promise((resolve, reject) => {
    User.updateOne({ _id:ObjectId(id)},{ $set: { name: 'asobobibobi' } }, function (err, doc) {
      if (!err) {
        resolve(doc);
      } else {
        reject(err);
      }
    });
  });
}

//查询数据
function findData() {
  return new Promise((resolve, reject) => {
    User.find({}, function (err, doc) {
      if (!err) {
        resolve(doc);
      } else {
        reject(err);
      }
    });
  });
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
//   // res.json(doc);
//   console.log(doc,'12312312'); // doc传过来的就是一个数组，数组里面是一个个对象
// });

module.exports = { createData, deleteData, updateData, findData };
