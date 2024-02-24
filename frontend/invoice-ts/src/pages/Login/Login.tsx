import { Avatar, Button, Card, Form, Input, message } from "antd";
import "./index.scss";
import { AccountBookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/modules/user";
type Props = {};

const Login = (props: Props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      await dispatch(fetchLogin(values));
      navigator("/");
      message.success("login successfully");
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        {/* <img
          className="login-logo"
          // src="../../assets/1x1_small.jpg"
          src="../../assets/1x1_small.jpg"
          alt="logo"
        /> */}
        {/* <Avatar size={64} src="../../assets/1x1_small.jpg1x1" /> */}
        <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          <Avatar
            style={{ backgroundColor: "azure", verticalAlign: "middle" }}
            size={64}
            icon={<AccountBookOutlined style={{ color: "purple" }} />}
          />
        </div>
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "Please enter your username." },
              //   {
              //     pattern: /^1[3-9]\d{9}$/,
              //     message: "Please enter valid phone number",
              //   },
            ]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            label="密   码"
            name="password"
            rules={[{ required: true, message: "Please enter your password." }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="default"
          htmlType="submit"
          size="large"
          block
          onClick={() => {
            navigator("/register");
          }}
        >
          注册
        </Button>
      </Card>
    </div>
  );
};

export default Login;
