import React, { useState } from 'react';
import {  Avatar, Typography, Button, Divider, Modal, Card } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItemFromStorage } from 'utils/Helper';
import { StorageConstant } from 'constants/Constants';


const { Title, Text } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

 const userInfo =  getItemFromStorage(StorageConstant?.info)

  const handleOpenSettings = () => {
    setIsSettingsModalVisible(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsModalVisible(false);
  };
  const handleNavigate = () => {
    navigate('/settings');
  };


  return (
    <>
    {/* <Layout style={{ padding: '24px' }}> */}
      <Card style={{ background: '#fff', padding: '24px',margin: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Avatar size={64} src="" />
          <div style={{ marginLeft: '16px' }}>
            <Title level={3}>{userInfo.fullName}</Title>
            <Text type="secondary">Online</Text>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Button icon={<EditOutlined />} onClick={handleOpenSettings}>Edit Profile</Button>
            <Button icon={<SettingOutlined />} style={{ marginLeft: '8px' }} onClick={handleNavigate}>Settings</Button>
          </div>
        </div>
        <Divider />
        <div style={{ marginBottom: '24px' }}>
          <Title level={4}>About Me</Title>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel eros at magna finibus malesuada.</Text>
        </div>
        <Divider />
        <div>
          <Title level={4}>Chat History</Title>
          {/* Replace with actual chat history or component */}
          <Text>No chat history available.</Text>
        </div>
      </Card>

      {/* Settings Modal */}
      <Modal
        title="Edit Profile"
        visible={isSettingsModalVisible}
        onCancel={handleCloseSettings}
        footer={[
          <Button key="cancel" onClick={handleCloseSettings}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleCloseSettings}>Save</Button>,
        ]}
      >
        {/* Replace with form for editing profile details */}
        <div>Profile settings form goes here.</div>
      </Modal>
     {/* </Layout> */}
    </>  
    );
};

export default ProfilePage;
