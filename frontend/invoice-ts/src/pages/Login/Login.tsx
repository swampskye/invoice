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
    await dispatch(fetchLogin(values));
    navigator("/");
    message.success("login successfully");
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
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please enter your username." },
              //   {
              //     pattern: /^1[3-9]\d{9}$/,
              //     message: "Please enter valid phone number",
              //   },
            ]}
          >
            <Input size="large" placeholder="username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password." }]}
          >
            <Input type="password" size="large" placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
