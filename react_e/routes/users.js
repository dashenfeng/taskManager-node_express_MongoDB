var express = require("express");
var router = express.Router();
const dayjs = require("dayjs");
let {
  createData,
  deleteData,
  updateData,
  findData,
  createUserInfo,
  User,
  UserInfo,
} = require("../serve/server");
const bcrypt = require("bcrypt");

/* 注册请求 */
router.post("/", function (req, res, next) {
  console.log(req.body, "注册信息");
  createUserInfo(req.body)
    .then((result) => {
      res.json({
        code: 200,
        msg: "注册成功",
        newUserInfo: req.body,
        message: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: "注册失败",
        newUserInfo: null,
        message: err,
      });
    });
});

/* 登录 */
let jwt = require("jsonwebtoken");
router.get("/", function (req, res, next) {
  console.log(req.query, "登录query"); // { username: '15812341234', password: '123456' } 登录query
  let { username, password } = req.query;
  async function login(username, password) {
    try {
      // 查找用户信息
      const thisUserInfo = await UserInfo.findOne({ mobile: username }); // 假设用户名存储在 mobile 字段中
      console.log(thisUserInfo, "找到了没呀");
      // 查找是否有该用户
      if (!thisUserInfo) {
        res.json({
          code: 400,
          msg: "用户不存在",
          token: "",
        });
        throw new Error("用户不存在");
      }
      // 验证密码
      const isMatch = await bcrypt.compare(password, thisUserInfo.password);
      // console.log(isMatch,'isMatch');
      if (!isMatch) {
        res.json({
          code: 400,
          msg: "账号或密码错误",
          token: "",
        });
        throw new Error("密码不匹配");
      }

      // 验证通过，返回用户信息和token
      console.log(thisUserInfo, "userInfo诶嘿嘿");
      // 登陆成功后，返回token
      /* 
        1.第一个参数是一个对象，它是要编码到 JWT 中的 payload。在这个例子中，payload 是 { username: "admin" }，这意味着 JWT 将包含一个键为 username，值为 "admin" 的字段。
        2.第二个参数是用于签名 JWT 的密钥。在这个例子中，密钥是 "testkey"。这个密钥将在签名 JWT 时用于生成哈希值，并在验证 JWT 时用于验证哈希值的完整性。
        3.第三个参数是一个对象，用于指定 JWT 的选项。在这个例子中，你设置了 JWT 的过期时间为 "30d"，意味着 JWT 将在签发后的 30 天内过期。另外，你指定了签名算法为 "HS256"，这是 HMAC SHA-256 签名算法的缩写。
      */
      let token = jwt.sign({ username: "admin" }, "testkey", {
        expiresIn: "30d",
        algorithm: "HS256",
      });
      res.json({
        code: 200,
        msg: "登录成功",
        token,
        userInfo: thisUserInfo,
      });
    } catch (error) {
      throw new Error("登录失败: " + error.message);
    }
  }
  login(username, password);
});

// 获取任务分类
router.get("/channels", function (req, res, next) {
  console.log(req.body);
  const data = [
    {
      id: '',
      name: "any",
    },
    {
      id: 1,
      name: "normal",
    },
    {
      id: 2,
      name: "emergency",
    },
  ];
  res.json({
    code: 200,
    msg: "获取任务分类成功",
    channels: data,
  });
});

// 查询任务列表
router.get("/findTask", function (req, res, next) {
  console.log(req.query, "findTask_req.body");
  let { classes, begin_pubdate, end_pubdate } = req.query;
  let resArr = [];

  findData(req.query)
    .then((result) => {
      if (classes && begin_pubdate && end_pubdate) {
        resArr = result.filter(
          (task) =>
            task.classes == classes &&
            begin_pubdate <= dayjs(task.time).format("YYYY年MM月DD日") &&
            end_pubdate >= dayjs(task.time).format("YYYY年MM月DD日")
        );
      } else if (classes) {
        console.log(classes, typeof classes, "classes");
        resArr = result.filter((task) => task.classes == classes);
      } else if (begin_pubdate && end_pubdate) {
        resArr = result.filter(
          (task) =>
            begin_pubdate <= dayjs(task.time).format("YYYY年MM月DD日") &&
            end_pubdate >= dayjs(task.time).format("YYYY年MM月DD日")
        );
      }else{
        resArr = result
      }

      // console.log(resArr,'resArr');
      console.log(`共筛选到${resArr.length}条数据`);
      res.json({
        code: 200,
        msg: "查询成功",
        resultList: resArr,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 新建任务列表
router.post("/addTask", function (req, res, next) {
  console.log(req.body, "req.body");

  createData(req.body)
    .then((result) => {
      res.json({
        code: 200,
        msg: "新增任务成功",
        resultList: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        msg: "新增任务失败",
      });
    });
});

// 删除某个任务
router.delete("/deleteTask", function (req, res, next) {
  const { taskId } = req.body;
  console.log(taskId, "taskId");

  deleteData(taskId)
    .then((result) => {
      res.json({
        code: 200,
        msg: "删除成功",
        resultList: result,
      });
    })
    .catch((err) => {
      console.log(err, "err998");
      res.json({
        code: 400,
        msg: "删除失败",
      });
    });
});

// 更新某个任务
router.put("/updateTask", function (req, res, next) {
  console.log(req.body, "req.body更新任务");

  updateData(req.body)
    .then((result) => {
      res.json({
        code: 200,
        msg: "更新成功",
        resultList: result,
      });
    })
    .catch((err) => {
      console.log(err, "err1111111");
      res.json({
        code: 500,
        msg: "更新失败",
        reason: err,
      });
    });
});

module.exports = router;
