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
      <Suspense fallback={"加载中"}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: <Register />,
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
