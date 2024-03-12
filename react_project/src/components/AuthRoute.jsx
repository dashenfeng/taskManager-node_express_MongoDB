//高阶组件，测试有无Token
import PropTypes from "prop-types";
import { getToken } from "../utils/token";
import { Navigate } from "react-router-dom";

export function AuthRoute({ children }) {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} replace />;
  }
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
