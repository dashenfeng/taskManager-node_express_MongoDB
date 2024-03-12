import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useChannel } from "../../hooks/useChannel";
import { addTask, updateTask } from "../../apis/task";
import { useEffect } from "react";
const Publish = () => {
  const { Option } = Select;
  const { channelList } = useChannel();
  const navigate = useNavigate();
  
  // 提交表单
  const onFinish = (formValue) => {
    // console.log(formValue, "formValue");
    const { name, classes, detail } = formValue;
    const reqData = {
      name,
      classes,
      detail,
      time: Date.now(),
    };
    // // 提交  根据是否有id调用不同接口（编辑|新增）
    const submitData = async () => {
      let res;
      res = await addTask(reqData); // 新增
      return res;
    };
    const upData = async (data) => {
      // console.log(data,"传入的参数");
      const res = await updateTask(data);
      return res;
    };

    if (articleId) {
      upData({...reqData,articleId,classes:classes ==="emergency"?2:1});
      // console.log(articleId,"更新数据");
    } else {
      submitData();
      // console.log(reqData);
    }
    message.success("提交成功");
    navigate("/task");
  };

  // 回填数据

  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const name = searchParams.get("name");
  const detail = searchParams.get("detail");
  const classes = searchParams.get("classes") == 1 ? "normal" : "emergency";

  // 获取实例
  const [form] = Form.useForm();
  useEffect(() => {
    // 1. 通过id获取数据
    async function getArticleDetail() {
      const data = {
        name,
        classes,
        detail,
        articleId,
      };
  
      form.setFieldsValue({
        ...data,
      });
    } // 只有有id的时候才能调用此函数回填
    if (articleId) {
      getArticleDetail();
    }
    // 2. 调用实例方法 完成回填
  }, [articleId, form, name, classes, detail]);

  return (
    <div className="home">
      <Card
        title={
          //面包屑导航组件
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "创建任务" },
            ]}
          />
        }>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}>
          {/* 标题输入栏 */}
          <Form.Item
            label="任务名称"
            name="name"
            rules={[{ required: true, message: "请输入任务名称" }]}>
            <Input
              placeholder="例如：构建一个后台管理系统"
              style={{ width: 400 }}
            />
          </Form.Item>
          {/* 频道的选择栏 */}
          <Form.Item
            label="任务状态"
            name="classes"
            rules={[{ required: true, message: "请选择任务状态" }]}>
            <Select placeholder="请选择任务状态" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* 内容区域 */}
          <Form.Item
            label="任务描述"
            name="detail"
            rules={[{ required: true, message: "请输入任务描述" }]}>
            {/* 富文本编辑器的位置 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入任务描述"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                提交任务
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
