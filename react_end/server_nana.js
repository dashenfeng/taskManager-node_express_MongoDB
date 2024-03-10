const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
const app = express();
const port = 3010; // 选择一个未被占用的端口号

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/task_manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("连接数据库成功!!!");
    // 只有当连接上数据库后才去启动服务器
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("连接数据库失败", error);
  });

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
// app.use(session({
//   secret: 'your-secret-key',
//   resave: true,
//   saveUninitialized: true,
// }));

// 处理根路径请求
app.get("/", (req, res) => {
  res.send("Hello from Node.js server!");
});

// Register route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

// Login route
// 处理用户登录请求
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 在数据库中查找用户
    let user = await User.findOne({ username });

    // 如果用户不存在，就将新用户存入数据库
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        username,
        password: hashedPassword,
      });
      await user.save();
      return res.send("User registered and logged in successfully");
    }

    // 如果用户存在，则验证密码
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid username or password");
    }

    // 如果用户名和密码都有效，发送成功消息
    res.send("Logged in successfully");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});

//新增数据
User.create({
  name: "张三",
  price: 123456,
}).then((data) => {
    console.log(data);   //插入成功
  }).catch((res) => {
    console.log(res);   //插入失败
  });

app.get("/data", function (req, res) {
  //查询User全部数据
  User.find({}, function (err, doc) {
    res.json(doc);
  });
});




// Create task route
app.post("/tasks", (req, res) => {
  // Implement task creation logic here
});

// Get tasks route
app.get("/tasks", (req, res) => {
  // Implement task retrieval logic here
});

// Get task by ID route
app.get("/tasks/:id", (req, res) => {
  // Implement task retrieval by ID logic here
});

// Update task route
app.put("/tasks/:id", (req, res) => {
  // Implement task update logic here
});

// 启动服务器
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
