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
  findUserInfoData,
  updateUserAuth,
} = require("../serve/server");
const bcrypt = require("bcrypt");

// token校验
const tokenVerify = (token) => {
  // 验证 Token
  // 用于签名和验证 JWT 的密钥
  // const secretKey = "testkey";
  let flag;
  jwt.verify(token, (secretKey = "testkey"), (err, decoded) => {
    if (err) {
      // 如果 Token 验证失败，err 将包含错误信息
      // 错误信息可能是 Token 过期（expired），或者 Token 签名无效等
      console.log(err.message, "why wrong");
      // return false;
      flag = false;
      // return res.status(401).json({ message: "Token is invalid or expired" });
    } else {
      flag = true;
    }
  });
  return flag;
};

/* 注册请求 */
router.post("/", function (req, res, next) {
  console.log(req.body, "注册信息");
  let isAdmin = req.body.name === "admin" ? true : false;
  let authority = {
    isAdd: true, // 是否能加任务
    isDelete: true,
    isEdit: true,
    isFind: true,
  };
  let createDate = new Date();
  createUserInfo({
    ...req.body,
    isAdmin: isAdmin,
    authority: authority,
    createDate,
    isBlocked: false,
  })
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
      let thisUserInfo = await UserInfo.findOne({ mobile: username }); // 假设用户名存储在 mobile 字段中
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
      // 判断是否是admin
      if (thisUserInfo.isAdmin) {
        let tempres = await UserInfo.updateOne(
          { _id: thisUserInfo._id },
          { $set: { isAdd: true, isDelete: true, isEdit: true, isFind: true } }
        );
        // console.log(tempres, "tempres");
       thisUserInfo = await UserInfo.findOne({ mobile: username }); // 如果是admin，那么重新查找，更新信息

      }
      console.log(thisUserInfo, "验证通过,thisUserInfo");
      /* 
      登陆成功后，返回token
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
      id: "",
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

  // token校验部分
  const authHeader = req.headers.authorization; // 从请求头中获取 Authorization 字段
  let token = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // 确认 Authorization 字段存在，并且以 Bearer 开头
    token = authHeader.substring(7, authHeader.length); // 提取 Token（去除 Bearer 这7个字符）
    let result = tokenVerify(token);
    if (!result) {
      return res.status(401).json({ message: "Token is invalid or expired" });
    }
  } else {
    res.status(401).send("Unauthorized: No token provided"); // 如果没有 Authorization 头或格式不正确，返回错误信息
  }

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
      } else {
        resArr = result;
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

// 获取用户信息userInfoSchema
router.get("/findUserInfo", function (req, res, next) {
  console.log(req.query, "findTask_req.body");

  // token校验部分
  const authHeader = req.headers.authorization; // 从请求头中获取 Authorization 字段
  let token = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // 确认 Authorization 字段存在，并且以 Bearer 开头
    token = authHeader.substring(7, authHeader.length); // 提取 Token（去除 Bearer 这7个字符）
    let result = tokenVerify(token);
    if (!result) {
      return res.status(401).json({ message: "Token is invalid or expired" });
    }
  } else {
    res.status(401).send("Unauthorized: No token provided"); // 如果没有 Authorization 头或格式不正确，返回错误信息
  }

  findUserInfoData()
    .then((result) => {
      console.log(`共匹配到${result.length}个用户`);
      console.log(result, "result");
      res.json({
        code: 200,
        msg: "查询用户信息成功",
        resultList: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 更新用户权限
router.put("/updateUserAuth", function (req, res, next) {
  console.log(req.body, "req.body_updateUserAuth");
  updateUserAuth(req.body)
    .then((result) => {
      console.log(result,'更新结果');
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

// 删除用户
router.delete("/deleteUser", function (req, res, next) {
  const { _id } = req.body;
  console.log(req.body, "req.body");
  console.log(_id, "_id");

  deleteData(_id)
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

module.exports = router;
