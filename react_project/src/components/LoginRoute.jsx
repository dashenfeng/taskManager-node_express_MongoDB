//高阶组件，测试有无Token
import PropTypes from "prop-types";
import { getToken } from "../utils/token";
import { Navigate,useLocation } from "react-router-dom";


// 获取 cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

export function LoginRoute({ children }) {
  const url = useLocation()
  console.log(url.pathname,'url__useLocation');
  const token = getToken();

  if (url === '/login') {
    const loggedIn = getCookie('loggedIn');
    if (loggedIn) {
      // 如果存在登录标识的 cookie，则说明用户已登录，可以直接跳转到其他页面
      return <Navigate to={"/"} replace />;
    }
  }

  if (!token) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} replace />;
  }
}

LoginRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
