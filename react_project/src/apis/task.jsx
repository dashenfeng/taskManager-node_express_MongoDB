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


// 获取任务列表
export function findInfo() {
  return request({
    url: '/users/findTask',
    method: 'GET'
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

// 更新任务  ---还未测试
export function updateTask(taskId) {
  return request({
    url: '/users/updateTask',
    method: 'PUT',
    data: {taskId}
  })
}