import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../../store/modules/user";

const { Header, Sider } = Layout;

// 左侧边栏要显示的东西
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
  {
    label: "权限管理",
    key: "/Authorization",
    icon: <UserOutlined />,
    ishidden: 1,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const onMenuClick = (route) => {
    const path = route.key;
    navigate(path); // 跳转到对应路由
  };

  // 反向高亮
  const location = useLocation(); // 获取当前路由路径
  console.log(location.pathname);
  const selectedkey = location.pathname;

  // 退出登录确认回调
  const dispatch = useDispatch();
  const onConfirm = () => {
    // console.log("确认退出");
    document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    dispatch(clearUserInfo());
    navigate("/login");
  };

  const name = useSelector((state) => state.user.userInfo.name);

  // 对菜单列表进行二次筛选
  let { isAdmin } = JSON.parse(localStorage.getItem("user_id"));
  let lastItem;
  if (!isAdmin) {
    lastItem = items.filter((obj) => !("ishidden" in obj));
  }else{
    lastItem = items
  }
  // console.log(lastItem,'lastItem');

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            onClick={onMenuClick}
            selectedKeys={selectedkey}
            items={lastItem}
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
