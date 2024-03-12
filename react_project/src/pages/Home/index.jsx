import { Card, Descriptions } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const Home = () => {
  const date=dayjs(new Date()).format('YYYY年MM月DD日')
  const {userInfo}=useSelector(state=>state.user)
  // console.log(userInfo);
  return (
    <div >
      <Card  >
        <div style={{color:'red',textAlign:'center',fontSize:'30px',fontWeight:'bold'}}>
        欢迎努力的你！
        </div>
      <h3>个人中心</h3>
      <div >
        <Descriptions  bordered column={2}>
          <Descriptions.Item label="姓名">{userInfo.name}</Descriptions.Item>
          <Descriptions.Item label="年龄">{userInfo.age}</Descriptions.Item>
          <Descriptions.Item label="籍贯">{userInfo.native}</Descriptions.Item>
          <Descriptions.Item label="性别">{userInfo.gender==="male"?"男":"女"}</Descriptions.Item>
          <Descriptions.Item label="联系方式">{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label="联系地址">{userInfo.address}</Descriptions.Item>
        </Descriptions>
      </div>
      <div  style={{color:'grey',marginTop:'20px'}}>{date}</div>
      </Card>

    </div>
  );
};

export default Home;
