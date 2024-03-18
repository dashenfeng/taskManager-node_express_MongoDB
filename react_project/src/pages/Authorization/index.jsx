import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Select,
  Table,
  Space,
  Tag,
  Modal,
  Radio,
  Input,
} from "antd";
// 引入汉化包 时间选择器显示中文
import { EditOutlined } from "@ant-design/icons";
import {
  findUserInfo,
  updateUserAuth,
} from "../../apis/task";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Task = () => {
  const [thisUserId, setThisUserId] = useState("");
  // 筛选功能
  // 1. 准备参数
  const [reqData, setReqData] = useState({
    classes: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  const [list, setList] = useState([]); // 角色列表(所有人的)
  const [thisUserInfo, setThisUserInfo] = useState({});

  // 查找用户信息(所有的)
  const fetchData = async (limitObj) => {
    try {
      const res = await findUserInfo(limitObj);
      const { resultList } = res; // 一个用户信息组成的数组
      // console.log(resultList, "taskResultList");
      resultList.sort((a, b) => b.time - a.time);

      //时间的格式化
      const currentList = resultList.map((obj) => {
        const formattedTime = dayjs(obj.createDate).format("YYYY年MM月DD日");
        return { ...obj, time: formattedTime };
      });

      console.log(currentList, "要存进去的数据源");
      setList(currentList);
    } catch (error) {
      console.log("查找用户信息发生错误", error.message);
    }
  };
  useEffect(() => {
    // 获取『当前』用户信息，得到权限相关的东西
    let { isAdmin, authority,isBlocked } = JSON.parse(localStorage.getItem("user_id")); // 登录的这个用户的信息
    console.log(isAdmin, authority,isBlocked, "userAh");
    // setUserInfo(authority);
    // setIsAdmin(isAdmin);

    fetchData(reqData); // 获取数据
  }, [reqData]);

  // 分页
  const onPageChange = (page) => {
    // console.log(page);
    // 修改参数依赖项 引发数据的重新获取列表渲染
    setReqData({
      ...reqData,
      page,
    });
  };

  // // TODO:删除该用户信息（删除账号）
  // const onConfirm = async (user) => {
  //   console.log(user._id, "user._id");
  //   let result = await deleteUser(user._id);
  //   console.log(result, "result");
  //   // console.log(data, "deleteData");
  //   // await deleteTask(data._id); // 这个接口里面是_id而不是id
  //   // 创建一个新的任务数组，排除被删除的任务
  //   // const updatedList = list.filter((item) => item._id !== data._id);
  //   // 更新状态,重新渲染页面
  //   // setList(updatedList);
  // };

  // 编辑状态弹出框
  const [thisAuth, setThisAuth] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (user) => {
    console.log(user, "context");
    let tempArr = [];
    // console.log(user.authority.isAdd, "user.authority.isAdd");
    user.isAdd && tempArr.push("新增任务");
    user.isDelete && tempArr.push("删除任务");
    user.isEdit && tempArr.push("修改任务");
    user.isFind && tempArr.push("查看任务");

    setThisUserId(user._id);
    setThisAuth(tempArr);
    setIsModalOpen(true);
    setThisUserInfo(user);
  };
  const onFinish = async (values) => {
    // 提交更新后的数据
    console.log("Success:", values);
    console.log(thisUserId, "thisUserId");
    // 处理auth
    const { auth } = values;
    console.log(auth, "auth");//["新增任务","修改任务"...]
    const tempAuthority = {
      isAdd: false,
      isDelete: false,
      isEdit: false,
      isFind: false,
    };
    for (let value of auth) {
      switch (value) {
        case "addAuth":
          tempAuthority.isAdd = true;
          break;
        case "deleteAuth":
          tempAuthority.isDelete = true;
          break;
        case "modifiedAuth":
          tempAuthority.isEdit = true;
          break;
        case "findAuth":
          tempAuthority.isFind = true;
          break;
        case "新增任务":
          tempAuthority.isAdd = true;
          break;
        case "删除任务":
          tempAuthority.isDelete = true;
          break;
        case "修改任务":
          tempAuthority.isEdit = true;
          break;
        case "查找任务":
          tempAuthority.isFind = true;
          break;
        default:
          break;
      }
    }
    console.log(tempAuthority,'更新后准备发请求的auth');

    let result = await updateUserAuth({
      ...values,
      _id: thisUserId,
      isAdd: tempAuthority.isAdd,
      isDelete: tempAuthority.isDelete,
      isEdit: tempAuthority.isEdit,
      isFind: tempAuthority.isFind,
    });
    console.log(result, "updateUserAuth_result");
    // console.log(list, "所有角色列表");

    fetchData(reqData);
    setIsModalOpen(false); //关闭
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // 单选框 是否禁用
  const [radioValue, setRadioValue] = useState(false);
  const radioChange = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
  };

  // 下拉选择框
  const options = [
    {
      label: "新增任务",
      value: "addAuth",
    },
    {
      label: "删除任务",
      value: "deleteAuth",
    },
    {
      label: "修改任务",
      value: "modifiedAuth",
    },
    {
      label: "查找任务",
      value: "findAuth",
    },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleCancel = ()=>{
    setIsModalOpen(false)
    // 在这里也可以在关闭时把值给复原
  }

  // 定义状态枚举
  const status = {
    false: <Tag color="success">正常</Tag>,
    true: <Tag color="red">禁用</Tag>,
  };
  const haveAuth = {
    true: <Tag color="#f50">Admin</Tag>,
    false: <Tag color="#2db7f5">normal</Tag>,
  };
  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
      width: 150,
      ellipsis: true,
    },
    {
      title: "权限字符",
      dataIndex: "isAdmin",
      width: 400,
      ellipsis: true,
      render: (data) => haveAuth[data],
    },
    {
      title: "状态",
      dataIndex: "isBlocked",
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
            {!data.isAdmin && (
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => showModal(data)}
              />
            )}
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
              { title: "权限管理" },
            ]}
          />
        }>
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
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            state: thisUserInfo.isBlocked, // 设置表单项的初始值
            name: thisUserInfo.name,
            auth: thisAuth,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="角色名称"
            name="name"
            rules={[
              {
                required: true,
                message: "内容不能为空!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="角色权限"
            name="auth">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="添加权限"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
          <Form.Item label="状态" name="state">
            <Radio.Group onChange={radioChange} value={radioValue}>
              <Radio value={false}>正常</Radio>
              <Radio value={true}>禁用</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button type="primary" htmlType="submit">
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Task;
