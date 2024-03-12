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
// const Home = lazy(() => import("../pages/Home"));
// const Task = lazy(() => import("../pages/Task"));
// const Publish = lazy(() => import("../pages/Publish"));

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
            {" "}
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
export default router;
