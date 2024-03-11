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

/* 登录请求 */
let jwt = require("jsonwebtoken");
router.get("/", function (req, res, next) {
  // console.log(req,'req');
  console.log(req.query,'query');
  console.log(req.params,'params');

  createData()
  // updateData()
  // deleteData()
  if (req.query.username == "15812341234" && req.query.password == "123456") {
    // 登陆成功后，返回token
    // const resData = findData()
    // console.log(resData,'resData');
    let token = jwt.sign({ username: "admin" }, "testkey", {
      expiresIn: "30d",
      algorithm: "HS256",
    });
    res.json({
      code: 1,
      msg: "登录成功",
      token
    });
  } else {
    res.json({
      code: 0,
      msg: "登录失败",
      token:null
    });
  }
});

// 获取数据列表
/* 注册请求 */
router.get("/channels", function (req, res, next) {
  console.log(req.body);
  const data = [
    {
      id:1,
      name:'fengfeng'
    },
    {
      id:2,
      name:'wanwan'
    }
  ]
  // res.send('respond with a resource');
  // 假装返回
  res.json({
    code: 1,
    msg: "查询成功",
    channels:data
  });
});

module.exports = router;
