import { Breadcrumb, Button, Card, Form, Input, Select, Space } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import { Link } from "react-router-dom";
import { useChannel } from "../../hooks/useChannel";

const Publish = () => {
  const { Option } = Select;
  const { channelList } = useChannel();
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
          // onFinish={onFinish}
          // form={form}
        >
          {/* 标题输入栏 */}
          <Form.Item
            label="任务名称"
            name="title"
            rules={[{ required: true, message: "请输入任务名称" }]}>
            <Input
              placeholder="例如：构建一个后台管理系统"
              style={{ width: 400 }}
            />
          </Form.Item>
          {/* 频道的选择栏 */}
          <Form.Item
            label="任务分类"
            name="channel_id"
            rules={[{ required: true, message: "请选择任务分类" }]}>
            <Select placeholder="请选择任务分类" style={{ width: 400 }}>
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
            name="content"
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
