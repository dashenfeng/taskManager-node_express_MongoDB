var express = require("express");
var router = express.Router();


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
  console.log(req,'req');
  console.log(req.query,'query');
  console.log(req.params,'params');
  if (req.query.username == "15812341234" && req.query.password == "123456") {
    // 登陆成功后，返回token
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

module.exports = router;
