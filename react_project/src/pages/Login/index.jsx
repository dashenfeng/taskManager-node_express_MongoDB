import { Button, Card, Form, Input, message } from "antd";
import "./index.scss";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/modules/user";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/token";

const Login = () => {
  // 设置 cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  //   使用dispach方法1
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values, "finish");
    //触发异步的action:fetchLogin
    await dispatch(fetchLogin(values));
    //登录之后跳转到首页
    const token = getToken();
    if (token) {
      message.success("登录成功");
      // 假设设置一个名为 'loggedIn' 的 cookie，值为 'true'，有效期为 1 天
      setCookie("loggedIn", "true", 1);
      navigate("/");
      // return <Redirect to="/" />
    } else {
      message.warning("请注册账号");
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          {/* <Form validateTrigger="onBlur"> */}
          <Form.Item
            name="username"
            //规则按照顺序执行，等到所有的满足规则，才ok
            rules={[
              {
                required: true,
                message: "请输入手机号!",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号格式！",
              },
            ]}>
            <Input size="large" placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
                message: "请输入正确的密码格式（字母数字组合，六位以上）！",
              },
            ]}
            hasFeedback>
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>

        {/* 注册进入 */}
        <Link className="register-link" to="/register">
          没有账号？免费注册
        </Link>
      </Card>
    </div>
  );
};

export default Login;
