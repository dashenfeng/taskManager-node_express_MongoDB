// 封装和文章相关的接口函数

import { request } from "../utils"

// 1. 获取任务紧急度列表
export function getChannelAPI () {
  return request({
    url: '/users/channels',
    method: 'GET'
  })
}

// 2. 提交文章表单
export function createArticleAPI (data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

// 更新文章表单
export function updateArticleAPI (data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}


// 获取文章列表
export function getArticleListAPI (params) {
  return request({
    url: "/mp/articles",
    method: 'GET',
    params
  })
}


// 删除文章
export function delArticleAPI (id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE'
  })
}


// 获取文章详情
export function getArticleById (id) {
  return request({
    url: `/mp/articles/${id}`
  })
}

// ------------新增---------------------

// 注册
export function getRegister(data) {
  return request({
    url: '/users',
    method: 'POST',
    data
  })
}


// 获取任务列表 limitObj为筛选的条件信息
export function findInfo(limitObj) {
  return request({
    url: '/users/findTask',
    method: 'GET',
    params:limitObj
  })
}

// 新增任务
export function addTask(newObj) {
  return request({
    url: '/users/addTask',
    method: 'POST',
    data: newObj
  })
}

// 删除任务
export function deleteTask(taskId) {
  return request({
    url: '/users/deleteTask',
    method: 'DELETE',
    data: {taskId}
  })
}

// 更新任务
export function updateTask(data) {
  console.log(data,'更新数据的data');
  return request({
    url: '/users/updateTask',
    method: 'PUT',
    data
  })
}

// 获取用户信息，用来权限管理
// 获取任务列表
export function findUserInfo() {
  return request({
    url: '/users/findUserInfo',
    method: 'GET',
  })
}



// 更新任务
export function updateUserAuth(data) {
  console.log(data,'更新用户权限的data');
  return request({
    url: '/users/updateUserAuth',
    method: 'PUT',
    data
  })
}


// 删除用户  不知道为什么删不掉
export function deleteUser(_id) {
  return request({
    url: '/users/deleteUser',
    method: 'DELETE',
    data: {_id}
  })
}