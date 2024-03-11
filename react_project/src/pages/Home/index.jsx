import { Card, Descriptions } from "antd";
import dayjs from "dayjs";

const Home = () => {
  const date=dayjs(new Date()).format('YYYY年MM月DD日')
  return (
    <div >
      <Card  >
        <div style={{color:'orange',textAlign:'center',fontSize:'30px',fontWeight:'bold'}}>
        欢迎你!超级管理员
        </div>

      <h3>个人中心</h3>
      <div >
        <Descriptions  bordered column={2}>
          <Descriptions.Item label="姓名">ww</Descriptions.Item>
          <Descriptions.Item label="年龄">25</Descriptions.Item>
          <Descriptions.Item label="籍贯">江苏宿迁</Descriptions.Item>
          <Descriptions.Item label="性别">女</Descriptions.Item>
          <Descriptions.Item label="联系方式">15651272069</Descriptions.Item>
          <Descriptions.Item label="联系地址">上海</Descriptions.Item>
        </Descriptions>
      </div>
      <div  style={{color:'grey',marginTop:'20px'}}>{date}</div>
      </Card>

    </div>
  );
};

export default Home;
