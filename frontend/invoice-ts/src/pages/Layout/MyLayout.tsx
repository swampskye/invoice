import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Breadcrumb, Layout, Menu, theme, Popconfirm } from "antd";
import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../store/modules/user";

const { Header, Content, Footer } = Layout;
const items = [
  {
    label: "Statistic",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Launch",
    key: "/launch",
    icon: <DiffOutlined />,
  },
  {
    label: "Result",
    key: "/result",
    icon: <EditOutlined />,
  },
  {
    label: "Profile",
    key: "/profile",
    icon: <EditOutlined />,
  },
];
type Props = {};

const MyLayout = (props: Props) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const name = useSelector((state: any) => state.user.userInfo.username);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = (route: any) => {
    const path = route.key;
    navigator(path);
  };
  const onConfirm = () => {
    // clear user token
    dispatch(clearToken());
    navigator("/login");
  };
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="demo-logo"
          style={
            {
              // background: `url('../../assets/favicon.ico') no-repeat center / 160px auto`,
            }
          }
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={onMenuClick}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Popconfirm
          title="LogOut?"
          okText="Confirm"
          cancelText="Cancel"
          onConfirm={onConfirm}
        >
          {/* <span style={{ color: "white" }}> {name} LogOut</span> */}
          <span style={{ color: "white" }}> {name} LogOut</span>
        </Popconfirm>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
          items={[{ title: "Home" }, { title: "Home" }]}
        ></Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 580,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          marginTop: "auto",
          position: "sticky",
          bottom: 0,
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MyLayout;
