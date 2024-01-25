import { Button, Card, Form, Input, message } from "antd";
import "./index.scss";
import { request } from "../../utils";
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
        <img className="login-logo" alt="logo" />
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
