import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  // Popconfirm,
} from "antd";
// 引入汉化包 时间选择器显示中文
import locale from "antd/es/date-picker/locale/zh_CN";

// 导入资源
import { Table } from "antd";
const Task = () => {
  const { RangePicker } = DatePicker;
  // const { Option } = Select
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
        <Form initialValues={{ status: "" }} 
        // onFinish={onFinish}
        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {/* {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))} */}
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
          // columns={columns}
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
