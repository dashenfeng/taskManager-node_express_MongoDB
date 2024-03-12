// 统一中转工具模块函数
// import {request} from '@/utils'

import { request } from './request'
import { setToken, getToken, removeToken ,getUserInfo,  removeUserInfo,
  setUserInfo,} from './token'

export {
  request,
  setToken,
  getToken,
  removeToken,getUserInfo,
  removeUserInfo,
  setUserInfo,
}