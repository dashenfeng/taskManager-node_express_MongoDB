import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Space,
  Popconfirm,
  Tag
} from "antd";
// 引入汉化包 时间选择器显示中文
import locale from "antd/es/date-picker/locale/zh_CN";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useChannel } from "../../hooks/useChannel";

const Task = () => {
  const { channelList } = useChannel();
  const { RangePicker } = DatePicker;
  const { Option } = Select
    // 定义状态枚举
    const status = {
      1: <Tag color="warning">待审核</Tag>,
      2: <Tag color="success">审核通过</Tag>,
    };
  const columns = [
    {
      title: "任务名称",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过
      render: (data) => status[data],
    },
    {
      title: "提交时间",
      dataIndex: "pubdate",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              // onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              // onConfirm={()=>onConfirm(data)}
              okText="Yes"
              cancelText="No">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "任务列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}>
        <Form
          initialValues={{ status: "" }}
          // onFinish={onFinish}
        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="分类" name="channel_id">
            <Select placeholder="请选择任务分类" style={{ width: 120 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      {/* <Card title={`根据筛选条件共查询到 ${count} 条结果：`}> */}
      <Card title={`根据筛选条件共查询到 ${1} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          // dataSource={list}
          // pagination={{
          //   total: count,
          //   pageSize: reqData.per_page,
          //   onChange: onPageChange,
          // }}
        />
      </Card>
    </div>
  );
};

export default Task;
