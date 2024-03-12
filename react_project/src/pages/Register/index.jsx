import { Button, Card, Form, Input, message, Select } from "antd";
import "./index.scss";
import register from "../../assets/register.png";
import { useNavigate } from "react-router-dom";
import { getRegister } from "../../apis/task";
const Register = () => {
  const {Option }= Select;
  //   使用dispach方法
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegister = async (values) => {
    console.log(values);
    //发起注册请求
    getRegister(values)
    
    //登录之后跳转到登录页面
    navigate("/login");
    message.success("注册成功");//提示登录成功的信息
  };
  return (
    <div className="register">
      <Card className="register-container">
        <img className="register-logo" src={register} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onRegister} validateTrigger="onBlur">
          {/* <Form validateTrigger="onBlur"> */}
          {/* 姓名 */}
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入姓名",
              },
            ]}>
            <Input  placeholder="请输入姓名"></Input>
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
            hasFeedback>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="验证密码"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请验证你的密码",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("输入密码和原始不一致"));
                },
              }),
            ]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              {
                required: true,
                message: "请输入年龄",
              },
            ]}>
            <Input  placeholder="请输入年龄"></Input>
          </Form.Item>
          {/* 籍贯 */}
          <Form.Item
            label="籍贯"
            name="native"
            rules={[
              {
                required: true,
                message: "请输入籍贯",
              },
            ]}>
            <Input  placeholder="请输入籍贯"></Input>
          </Form.Item>
          {/* 性别 */}

          <Form.Item
            label="性别"
            name="gender"
            rules={[
              {
                required: true,
                message: "请输入性别",
              },
            ]}>
            <Select placeholder="选择你的性别">
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>
          </Form.Item>
          {/* 手机号码 */}
          <Form.Item
            label="联系方式"
            name="mobile"
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
            <Input  placeholder="请输入手机号"></Input>
          </Form.Item>
          {/* 联系地址 */}
          <Form.Item
            label="联系地址"
            name="address"
            rules={[
              {
                required: true,
                message: "请输入联系地址",
              },
            ]}>
            <Input  placeholder="请输入联系地址"></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"  block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
