import React, { useState } from "react";
import {
  HomeOutlined,
  SearchOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  BellFilled,
  UsergroupAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Row,
  Col,
  Tooltip,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavbarLink } from "components/NavbarLink";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import { logout } from "store/auth/authActions";
import { getItemFromStorage } from "utils/Helper";
import { StorageConstant } from "constants/Constants";

const { Header } = Layout;

function TopBar({ toggle, collapsed, isSmallScreen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = getItemFromStorage(StorageConstant?.info);
  const avatarUrl = userInfo ? userInfo.avatar : "";

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(logout());
    setTimeout(() => navigate("/login"), 1000);
  };
  const handleCancel = () => setIsModalOpen(false);

  const getItem = (label, key, icon, path) => ({
    key,
    icon,
    label: path ? <NavbarLink to={path}>{label}</NavbarLink> : label,
    path,
  });

  const tabs = [
    getItem("Home", "/", <HomeOutlined />, "/"),
    getItem("Search", "/search", <SearchOutlined />, "/search"),
    getItem("Chat", "/chat", <MessageOutlined />, "/chat"),
  ];

  const menuItems = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingOutlined />,
      onClick: () => navigate("/settings"),
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: showModal,
    },
  ];

  return (
    <Header
      style={{
        left: 0,
        postion: "absolute",
        display: "flex",
        alignItems: "center",
        padding: 0,
        position: "fixed",
        width: "100%",
        zIndex: 3,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      {/* <Header style={{ display: 'flex', alignItems: 'center' }}> */}
      <Row style={{ width: "100%" }} justify="space-between" align="middle">
        <div
          className="p-3 d-flex justify-content-center align-items-center"
          style={{ height: "64px" }}
        >
          <NavbarLink tp="/">
            {" "}
            <Title
              level={collapsed ? 4 : 3}
              style={{
                color: "#1890ff",
                margin: 0,
                transition: "opacity 0.3s",
                backgroundColor: "white",
              }}
            >
              Socialite
            </Title>
          </NavbarLink>

          {/* {isSmallScreen ? <Button
                    className='text-primary'
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggle}
                        style={{ marginLeft: '16px' }}
                        aria-label="Toggle menu"
                    />: ""} */}

          {/* <img src={collapsed ? "favicon.webp" : 'logo.webp'} alt="logo" className='w-75 color-blend' style={{ mixBlendMode: 'color' }} /> */}
        </div>

        {isSmallScreen ? (
          ""
        ) : (
          <Col xs={8} sm={5} md={6} lg={8} xl={8}>
            <Search placeholder="Search..." className="pt-3" />
          </Col>
        )}
        <Col
          xs={4}
          sm={6}
          md={8}
          lg={6}
          xl={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Tooltip title="Add User">
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottom"
            >
              <Button
                className="text-primary"
                type="text"
                icon={<UsergroupAddOutlined />}
                aria-label="Add user"
                style={{ fontSize: "24px", marginRight: "16px" }}
              />
            </Dropdown>
          </Tooltip>
          <Tooltip title="Notifications">
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottom"
            >
              <Button
                className="text-primary"
                type="text"
                icon={<BellFilled />}
                aria-label="Notifications"
                style={{ fontSize: "24px", marginRight: "16px" }}
              />
            </Dropdown>
          </Tooltip>
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottom"
          >
            <Button
              style={{ border: 0, background: "transparent" }}
              aria-label="User menu"
            >
              <Avatar src={avatarUrl} alt="User avatar" />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
        centered
        footer={[
          <Row justify="center" gutter={16} key="footer-buttons">
            <Col>
              <Button key="cancel" onClick={handleCancel}>
                No
              </Button>
            </Col>
            <Col>
              <Button key="ok" type="primary" onClick={handleOk}>
                Yes
              </Button>
            </Col>
          </Row>,
        ]}
      >
        <div className="p-3 m-3 d-flex justify-content-center">
          <ExclamationCircleOutlined
            style={{ color: "#ff4d4f", fontSize: 100 }}
          />
        </div>
        <p className="text-center">
          Logging out will end your current session.
        </p>
      </Modal>
    </Header>
  );
}

export default TopBar;
