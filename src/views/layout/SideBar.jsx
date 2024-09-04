import React, { useState } from "react";
import {
  Button,
  Input,
  Menu,
  Dropdown,
  Avatar,
  Badge,
  Drawer,
  Spin,
  List,
  Tooltip,
} from "antd";
import { BellOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accessChat, fetchChats } from "store/chat/chatAction";
import {
  clearNotifications,
  setNotifications,
} from "store/notification/notificationAction";
import { logout } from "store/auth/authActions";
import UserListItem from "components/UserListItem";
// import ChatLoading from "components/chat/ChatLoading";
import ProfileModal from "components/ProfileModel";

function SideBar() {
  const [search, setSearch] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { chats, selectedChat, loading } = useSelector(
    (state) => state.chat || {}
  );
  const { notifications } = useSelector((state) => state.notification);

  const handleSearch = async () => {
    if (!search) {
      // Display warning message or notification
      return;
    }

    // Implement the search logic (e.g., call an API to search users)
    // For demonstration, it's omitted here.
  };

  const handleChatAccess = (userId) => {
    dispatch(accessChat(userId, user.token));
    setDrawerVisible(false);
  };

  const handleLogout = () => {
    // dispatch(logoutUser());
    navigate("/");
  };

  const notificationsMenu = (
    <Menu>
      {!notifications.length && <Menu.Item>No New Messages</Menu.Item>}
      {notifications.map((notif) => (
        <Menu.Item
          key={notif._id}
          onClick={() => {
            // Handle notification click
            dispatch(clearNotifications());
          }}
        >
          {notif.chat.isGroupChat
            ? `New Message in ${notif.chat.chatName}`
            : `New Message from ${notif.sender.name}`}
        </Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item>
        <ProfileModal user={user}>My Profile</ProfileModal>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff",
          padding: "5px 10px",
          borderBottom: "5px solid #f0f0f0",
        }}
      >
        <Tooltip title="Search Users to chat">
          <Button
            icon={<SearchOutlined />}
            onClick={() => setDrawerVisible(true)}
            type="ghost"
          >
            Search User
          </Button>
        </Tooltip>
        <h1 style={{ margin: 0 }}>Talk-A-Tive</h1>
        <div>
          <Badge count={notifications.length}>
            <Dropdown overlay={notificationsMenu} trigger={["click"]}>
              <Button icon={<BellOutlined />} />
            </Dropdown>
          </Badge>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button>
              <Avatar size="small" src={user?.pic} /> <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      <Drawer
        title="Search Users"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <div style={{ display: "flex", paddingBottom: "16px" }}>
          <Input
            placeholder="Search by name or email"
            style={{ marginRight: "8px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Go</Button>
        </div>
        {"chatLoading" ? (
          // <ChatLoading />
          ""
        ) : (
          <List
            // dataSource={searchResult} // Ensure this state is managed correctly
            renderItem={(user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleChatAccess(user._id)}
              />
            )}
          />
        )}
        {"chatLoading" && (
          <Spin style={{ display: "flex", justifyContent: "center" }} />
        )}
      </Drawer>
    </>
  );
}

export default SideBar;
