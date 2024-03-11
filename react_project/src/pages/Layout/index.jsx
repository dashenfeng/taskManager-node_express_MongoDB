import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
// import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Outlet, useNavigate } from "react-router-dom";
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout;

// 左侧边栏要显示的三个东西
const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "创建任务",
    key: "/publish",
    icon: <EditOutlined />,
  },
  {
    label: "任务管理",
    key: "/task",
    icon: <DiffOutlined />,
  },
];

const GeekLayout = () => {

// 测试结束↑
  const navigate = useNavigate();
  // 跳转到对应路由
  const onMenuClick = (route) => {
    console.log("菜单被点击了", route);
    const path = route.key;
    navigate(path);
  };

  // // 反向高亮
  // // 1. 获取当前路由路径
  // const location = useLocation()
  // console.log(location.pathname)
  // const selectedkey = location.pathname

  // // 触发个人用户信息action
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchUserInfo())
  // }, [dispatch])

  // // 退出登录确认回调
  // const onConfirm = () => {
  //   console.log('确认退出')
  //   dispatch(clearUserInfo())
  //   navigate('/login')
  // }

  // const name = useSelector(state => state.user.userInfo.name)
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              {/* <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}> */}
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {/* <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu> */}
          <Menu
            mode="inline"
            theme="dark"
            onClick={onMenuClick}
            items={items}
            style={{ height: "100%", borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由的出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
