var express = require("express");
var router = express.Router();
let {createData,deleteData,updateData,findData} = require('../serve/server')



/* 注册请求 */
router.post("/", function (req, res, next) {
  console.log(req.body);
  // res.send('respond with a resource');
  // 假装返回
  res.json({
    code: 1,
    msg: "注册成功",
  });
});

/* 登录 */
let jwt = require("jsonwebtoken");
router.get("/", function (req, res, next) {
  // console.log(req,'req');
  // console.log(req.query,'query');
  // console.log(req.params,'params');
  if (req.query.username == "15812341234" && req.query.password == "123456") {
    // 登陆成功后，返回token
    let token = jwt.sign({ username: "admin" }, "testkey", {
      expiresIn: "30d",
      algorithm: "HS256",
    });
    res.json({
      code: 200,
      msg: "登录成功",
      token
    });
  } else {
    res.json({
      code: 400,
      msg: "登录失败",
      token:null
    });
  }
});

// 获取任务分类
router.get("/channels", function (req, res, next) {
  // console.log(req.body);
  const data = [
    {
      id:1,
      name:'normal'
    },
    {
      id:2,
      name:'emergency'
    }
  ]
  res.json({
    code: 1,
    msg: "获取任务分类成功",
    channels:data
  });
});

// 查询任务列表
router.get("/findTask", function (req, res, next) {
  // console.log(req.body);

  findData().then(result=>{
    res.json({
      code: 1,
      msg: "注册成功",
      resultList:result
    });
  }).catch(err=>{
    console.log(err);
  })
});

// 新建任务列表
router.post("/addTask", function (req, res, next) {
  console.log(req.body,'req.body');

  createData(req.body).then(result=>{
    res.json({
      code: 200,
      msg: "新增任务成功",
      resultList:result
    });
  }).catch(err=>{
    res.json({
      code: 400,
      msg: "新增任务失败",
    });
  })
});

// 删除某个任务
router.delete("/deleteTask", function (req, res, next) {
  const {taskId} = req.body
  console.log(taskId,'taskId');

  deleteData(taskId).then(result=>{
    res.json({
      code: 200,
      msg: "删除成功",
      resultList:result
    });
  }).catch(err=>{
    console.log(err,'err998');
    res.json({
      code: 400,
      msg: "删除失败",
    });
  })
});

// 更新某个任务
router.put("/updateTask", function (req, res, next) {
  console.log(req.body,'req.body');
  const {taskId} = req.body

  updateData(taskId).then(result=>{
    res.json({
      code: 200,
      msg: "更新成功",
      resultList:result
    });
  }).catch(err=>{
    console.log(err,'err998');
    res.json({
      code: 400,
      msg: "更新失败",
      reason:err
    });
  })
});




module.exports = router;
