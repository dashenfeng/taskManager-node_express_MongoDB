const mongoose = require('mongoose')


//链接mongo 并且使用task_manager这个集合
const DB_URL = 'mongodb://localhost/task_manager'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
    console.log('mongo connect success')
})

// 创建模型
const User = mongoose.model(
    "user",
    new mongoose.Schema({
      user: { type: String, require: true },
      age: { type: Number, require: true, default: 0 },
    })
  );