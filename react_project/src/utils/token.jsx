// 封装基于ls存取删三个方法

function setToken (token) {
  return localStorage.setItem("token_key", token)
}

function getToken () {
  return localStorage.getItem("TOKENKEY")
}

function removeToken () {
  return localStorage.removeItem('token_key')
}

export {
  setToken,
  getToken,
  removeToken
}