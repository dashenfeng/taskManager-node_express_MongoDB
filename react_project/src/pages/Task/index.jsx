import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
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
import { deleteTask, findInfo } from "../../apis/task";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Task = () => {
  const navigate = useNavigate();
  const { channelList } = useChannel();
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  // 筛选功能
  // 1. 准备参数
  const [reqData, setReqData] = useState({
    classes: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  //获取任务列表
  const [list, setList] = useState([]); // 任务列表
  useEffect(() => {
    const fetchData = async (limitObj) => {
      try {
        // console.log(classes,begin_pubdate,end_pubdate,'classes,begin_pubdate,end_pubdate');
        const res = await findInfo(limitObj);
        const { resultList } = res;
        // console.log(res);
        // console.log(resultList, "taskResultList");
        resultList.sort((a, b) => b.time - a.time);
        //时间的格式化
        const currentList = resultList.map((obj) => {
          const formattedTime = dayjs(obj.time).format("YYYY年MM月DD日");
          const currentDetail = obj.detail.replace(/<\/?p[^>]*>/gi, "");
          return { ...obj, time: formattedTime, detail: currentDetail };
        });

        setList(currentList);
      } catch (error) {
        console.log("error in findInfo!!");
      }
    };
    fetchData(reqData);
  }, [reqData]);

  // 2. 获取筛选数据
  const onFinish = (formValue) => {
    // console.log(formValue.date[0].format("YYYY年MM月DD日"), "筛选数据"); // 如果只填了classes，没填这个就会报错
    // 3. 把表单收集到数据放到参数中(不可变的方式)
    if (formValue.date) {
      setReqData({
        ...reqData,
        classes: formValue.classes,
        begin_pubdate: formValue.date[0].format("YYYY年MM月DD日"),
        end_pubdate: formValue.date[1].format("YYYY年MM月DD日"),
      });
    }else{
      setReqData({
        ...reqData,
        classes: formValue.classes,
        // begin_pubdate: formValue.date[0].format("YYYY年MM月DD日"),
        // end_pubdate: formValue.date[1].format("YYYY年MM月DD日"),
      });
    }
  };

  // 分页
  const onPageChange = (page) => {
    // console.log(page);
    // 修改参数依赖项 引发数据的重新获取列表渲染
    setReqData({
      ...reqData,
      page,
    });
  };

  // 删除回调
  const onConfirm = async (data) => {
    // console.log(data, "deleteData");
    await deleteTask(data._id); // 这个接口里面是_id而不是id
    // 创建一个新的任务数组，排除被删除的任务
    const updatedList = list.filter((item) => item._id !== data._id);
    // 更新状态,重新渲染页面
    setList(updatedList);
  };

  //编辑文章的回调
  const onWriteTask = async (data) => {
    // console.log(data.classes, "编辑文章");
    navigate(
      `/publish?id=${data._id}&name=${data.name}&detail=${data.detail}&classes=${data.classes}`
    );
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
      width: 150,
      ellipsis: true,
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
      title: "任务描述",
      dataIndex: "detail",
      width: 400,
      ellipsis: true,
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
        {/* 筛选区域 */}
        <Form onFinish={onFinish}>
          <Form.Item label="状态" name="classes">
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
      <Card title={`根据筛选条件共查询到 ${list.length} 条结果：`}>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: list.length,
            pageSize: reqData.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Task;
