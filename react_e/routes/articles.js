var express = require('express');
var router = express.Router();

// /api/articles
router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log(req.auth); //当jwt通过之后，就会返回这玩意 { username: 'admin', iat: 1710139509, exp: 1712731509 }
  res.json({
    code:1,
    msg:'发布文章成功'
  })
});

// 根据id获取
// /api/articles/user/:uid
// http://localhost:3000/api/articles/user/2
router.get('/user/:uid', function(req, res, next) {
  console.log(req.params);
  res.json({
    code:1,
    msg:'发布文章成功'
  })
});

// 根据文章id删除
router.delete('/:uid', function(req, res, next) {
  console.log(req.params);
  res.json({
    code:1,
    msg:'删除文章通过id'
  })
});
// 根据文章id编辑
router.patch('/:uid', function(req, res, next) {
  console.log(req.params);
  console.log(req.body);
  res.json({
    code:1,
    msg:'编辑文章通过id'
  })
});

module.exports = router;
