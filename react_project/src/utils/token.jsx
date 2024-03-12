// 封装基于ls存取删三个方法

function setToken(token) {
  return localStorage.setItem("token_key", token);
}

function getToken() {
  return localStorage.getItem("token_key");
}

function removeToken() {
  return localStorage.removeItem("token_key");
}
function setUserInfo(userInfo) {
  return localStorage.setItem("user_id", JSON.stringify(userInfo));
}

function getUserInfo() {
  return JSON.parse(localStorage.getItem("user_id"));
}

function removeUserInfo() {
  return localStorage.removeItem("user_id");
}

export {
  setToken,
  getToken,
  removeToken,
  getUserInfo,
  removeUserInfo,
  setUserInfo,
};
