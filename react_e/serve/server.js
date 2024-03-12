const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

//链接mongo 并且使用task_manager这个集合
const DB_URL = "mongodb://localhost/task_manager";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function () {
  console.log("mongo connect success");
});

// 定义 task 的 Schema
const taskSchema = new Schema({
  name: { type: String, default: "" },
  classes: { type: Number, default: 0 },
  detail: { type: String, default: "" },
  time: { type: Number, default: 0 },
});
// 定义用户信息的Schema（注册时候的用户信息）
const userInfoSchema = new Schema({
  address: { type: String, default: "" },
  age: { type: String, default: "" },
  gender: { type: String, default: "" },
  mobile: { type: String, default: "" },
  name: { type: String, default: "" },
  native: { type: String, default: "" }, // 籍贯
  password: { type: String, default: "" },
});

const User = mongoose.model("taskData", taskSchema); // 这个其实是Task
const UserInfo = mongoose.model("UserInfo", userInfoSchema); // 用户注册信息

// ----------------------------用户信息处理----------------------------

// 密码加密的函数
async function hashPassword(password) {
  const saltRounds = 10; // 定义加密的复杂度
  try {
    // 生成盐并加密
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash; // 返回加密后的密码
  } catch (error) {
    console.error("加密密码时出错:", error);
  }
  return null;
}

async function createUserInfo(newInfoObj) {
  console.log(newInfoObj.password, "password");
  let newPassword = await hashPassword(newInfoObj.password).then(
    (result) => result
  ); // 加密密码
  console.log(newPassword, "newPassword");

  return new Promise((resolve, reject) => {
    UserInfo.create(
      { ...newInfoObj, password: newPassword },
      function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      }
    );
  });
}

// ----------------------------任务列表处理----------------------------

// 新增数据
function createData(newInfoObj) {
  return new Promise((resolve, reject) => {
    User.create(newInfoObj, function (err, doc) {
      if (!err) {
        resolve(doc);
      } else {
        // console.log(err);
        reject(err);
      }
    });
  });
}

// 删除数据
function deleteData(id) {
  console.log(typeof id, "id998");
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: ObjectId(id) }, function (err, doc) {
      if (!err) {
        resolve(doc);
      } else {
        reject(err);
      }
    });
  });
}

// 修改数据
function updateData(data) {
  const { articleId, name, classes, detail, time } = data;
  return new Promise((resolve, reject) => {
    User.updateOne(
      { _id: ObjectId(articleId) },
      { $set: { name, classes, detail, time } },
      function (err, doc) {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      }
    );
  });
}

// 查询数据
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

module.exports = {
  createData,
  deleteData,
  updateData,
  findData,
  createUserInfo,
  User,
  UserInfo,
};
