//高阶组件，测试有无Token
import PropTypes from "prop-types";
import { getToken } from "../utils/token";
import { Navigate,useLocation } from "react-router-dom";

export function LoginRoute({ children }) {
  const url = useLocation()
  console.log(url.pathname,'url__useLocation');
  const token = getToken();
  if (!token) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} replace />;
  }
}

LoginRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
