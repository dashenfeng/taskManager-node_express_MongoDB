// 和用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken, removeToken } from '../../utils'
import { getLogin, getProfileAPI } from '../../apis/user'

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: getToken() || '',
    // token:  '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})


// 解构出actionCreater

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数

const userReducer = userStore.reducer

// 登录获取token异步方法封装
const fetchLogin = (data) => {
  return async (dispatch) => {
    const res = await getLogin(data) // 发起登录请求
    console.log(res.token,"登录请求返回结果")
    dispatch(setToken(res.token))
    console.log(res.userInfo,"登录用户信息")
    dispatch(setUserInfo(res.userInfo))
  }
}

// // 获取个人用户信息异步方法
// const fetchUserInfo = () => {
//   return async (dispatch) => {
//     const res = await getProfileAPI()
//     dispatch(setUserInfo(res.data))
//   }
// }

export { fetchLogin, clearUserInfo }

export default userReducer