// 用户相关的所有请求
import { request } from "../utils";

// 2. 获取用户信息
export function getProfileAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}

// 登录测试
export function getLogin(data) {
  return request({
    url: `/users`,
    method: "GET",
    params:data,
  });
}
// 注册测试
export function register() {
  return request({
    url: `/users`,
    method: "POST",
  });
}
