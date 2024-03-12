import { Link, useNavigate } from "react-router-dom";
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
  Tag,
} from "antd";
// 引入汉化包 时间选择器显示中文
import locale from "antd/es/date-picker/locale/zh_CN";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useChannel } from "../../hooks/useChannel";
import { deleteTask, findInfo, updateTask } from "../../apis/task";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Task = () => {
  const navigate = useNavigate();
  const { channelList } = useChannel();
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [list, setList] = useState([]); // 任务列表

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await findInfo();
        const { resultList } = res;
        console.log(res)
        // console.log(resultList, "taskResultList");
        //时间的格式化
        const currentList = resultList.map(obj => {
          // const formattedTime = new Date(obj.time).for();
          const formattedTime=dayjs(obj.time).format("YYYY年MM月DD日 hh:mm:ss")
          return { ...obj, time: formattedTime };
        });
        console.log(currentList,"格式化时间后的列表");
        setList(currentList);
      } catch (error) {
        console.log("error in findInfo!!");
      }
    };
    fetchData();
  }, []);

  // 删除回调
  const onConfirm = async (data) => {
    console.log(data, "deleteData");
    await deleteTask(data._id); // 这个接口里面是_id而不是id
    // 创建一个新的任务数组，排除被删除的任务
    const updatedList = list.filter((item) => item._id !== data._id);
    // 更新状态,重新渲染页面
    setList(updatedList);
  };

  //编辑文章的回调
  const onWriteTask = async (data) => {
    // console.log(data.classes, "编辑文章");
    navigate(`/publish?id=${data._id}&name=${data.name}&detail=${data.detail}&classes=${data.classes}`)
  };

  // 定义状态枚举
  const status = {
    1: <Tag color="success">正常</Tag>,
    2: <Tag color="warning">紧急</Tag>,
  };
  const columns = [
    {
      title: "任务名称",
      dataIndex: "name",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "classes",
      // 这里的data也就是dataIndex的值
      render: (data) => status[data],
    },
    {
      title: "提交时间",
      dataIndex: "time",
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
              onClick={() => onWriteTask(data)}
            />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              onConfirm={() => onConfirm(data)}
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
      {/* {list.length && <div>{list[0]['name']}</div>} */}
      {/* 测试代码 */}
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
              <Radio value={1}>正常</Radio>
              <Radio value={2}>紧急</Radio>
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
          rowKey="_id"
          columns={columns}
          dataSource={list}
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
