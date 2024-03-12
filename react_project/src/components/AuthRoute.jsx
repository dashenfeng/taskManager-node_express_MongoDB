//高阶组件，测试有无Token
import PropTypes from "prop-types";
import { getToken } from "../utils/token";
import { Navigate } from "react-router-dom";

export function AuthRoute({ children }) {
  console.log("1111111111111");
  const token = getToken();
  console.log(token, "当前的token值");
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} replace />;
  }
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
