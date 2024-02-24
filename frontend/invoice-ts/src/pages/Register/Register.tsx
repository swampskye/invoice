import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  message,
} from "antd";
import "./index.scss";
import { AccountBookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchLogin, fetchRegister } from "../../store/modules/user";
import { useState } from "react";
type Props = {};

const Register = (props: Props) => {
  const [role, setRole] = useState("user");
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    console.log(values);
    if (values.password !== values.password_confirmation) {
      message.error("两次密码不一致");
      return;
    }
    try {
      await dispatch(fetchRegister(values));
      message.success("login successfully");
      navigator("/login");
    } catch (error: any) {
      //   console.log("register failed, reason: ", error.response.data);
      message.error(error.response.data.message);
    }
  };
  //   const onRoleChange = ({ target: { value } }: RadioChangeEvent) => {
  //     console.log("role:", value);
  //     setRole(value);
  //   };
  return (
    <div className="register">
      <Card className="register-container">
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
              { required: true, message: "请输入用户名" },
              //   {
              //     pattern: /^1[3-9]\d{9}$/,
              //     message: "Please enter valid phone number",
              //   },
            ]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input size="large" placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item
            label="密码确认"
            name="password_confirmation"
            rules={[{ required: true, message: "请输入确认密码" }]}
          >
            <Input type="password" size="large" placeholder="再输入一遍" />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: "请选择角色" }]}
          >
            <Radio.Group>
              <Radio value="user"> USER </Radio>
              <Radio value="admin"> ADMIN </Radio>
            </Radio.Group>
            {/* <Radio.Group value="user" onChange={onRoleChange}>
              <Radio value="user"> USER </Radio>
              <Radio value="admin"> ADMIN </Radio>
            </Radio.Group> */}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              确认注册
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="default"
          //   htmlType="submit"
          size="large"
          block
          onClick={() => {
            navigator("/login");
          }}
        >
          回到登录
        </Button>
      </Card>
    </div>
  );
};

export default Register;
