//路由配置
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Task from "../pages/Task";
import Publish from "../pages/Publish";
import { Suspense } from "react";
import Register from "../pages/Register";
import { AuthRoute } from "../components/AuthRoute";
import { LoginRoute } from "../components/LoginRoute";

// 假设有一个isUserLoggedIn函数用来检查用户是否已经登录
// const isUserLoggedIn = () => {
//   // 这里应该是你的逻辑来检查用户是否已经登录
//   if(token){
//     return true
//   }else{
//     return false
//   }
// 返回 true 如果用户已经登录，否则返回 false
// };

//路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={"加载中"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "task",
        element: <Task />,
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"加载中"}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LoginRoute>
        <Login />
      </LoginRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <LoginRoute>
        <Register />
      </LoginRoute>
    ),
  },
]);
// const isUserLoggedIn = "false";
// router.listen((location) => {
//   if (location.pathname === "/login" && isUserLoggedIn()) {
//     history.push("/"); // 用户尝试访问登录页面但已登录，重定向到主页
//     console.log("用户已经登陆");
//   }
// });
export default router;
