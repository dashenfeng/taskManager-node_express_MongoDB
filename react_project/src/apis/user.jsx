// 用户相关的所有请求
import { request } from "../utils";
// 1. 登录请求

export function loginAPI(formData) {
  return request({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}

// 2. 获取用户信息

export function getProfileAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}

// 登录测试
export function testLogin(data) {
  return request({
    url: `/users`,
    method: "GET",
    data,
  });
}
// 注册测试
export function testZhuce() {
  return request({
    url: `/users`,
    method: "POST",
  });
}
