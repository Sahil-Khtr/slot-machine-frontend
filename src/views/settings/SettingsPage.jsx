import React from 'react';
import { Layout, Typography, Card, Form, Input, Button, Switch, Divider } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const SettingsPage = () => {
  const handleSaveGeneralSettings = (values) => {
    console.log('General Settings:', values);
    // Implement logic to save general settings
  };

  const handleSaveAccountSettings = (values) => {
    console.log('Account Settings:', values);
    // Implement logic to save account settings
  };

  const handleSaveSecuritySettings = (values) => {
    console.log('Security Settings:', values);
    // Implement logic to save security settings
  };

  return (
   
      <Content style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Title level={3}>Settings</Title>

        {/* General Settings */}
        <Card title="General Settings" style={{ marginBottom: '24px' }}>
          <Form
            layout="vertical"
            onFinish={handleSaveGeneralSettings}
          >
            <Form.Item
              label="Theme"
              name="theme"
              initialValue="light"
              rules={[{ required: true, message: 'Please select a theme!' }]}
            >
              <Input placeholder="Enter theme name" />
            </Form.Item>
            <Form.Item
              label="Language"
              name="language"
              initialValue="English"
              rules={[{ required: true, message: 'Please select a language!' }]}
            >
              <Input placeholder="Enter language" />
            </Form.Item>
            <Form.Item
              label="Receive Newsletter"
              name="newsletter"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Account Settings */}
        <Card title="Account Settings" style={{ marginBottom: '24px' }}>
          <Form
            layout="vertical"
            onFinish={handleSaveAccountSettings}
          >
            <Form.Item
              label="Email"
              name="email"
              initialValue="user@example.com"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Change Password"
              name="password"
              rules={[{ required: true, message: 'Please enter new password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Security Settings */}
        <Card title="Security Settings" style={{ marginBottom: '24px' }}>
          <Form
            layout="vertical"
            onFinish={handleSaveSecuritySettings}
          >
            <Form.Item
              label="Two-factor Authentication"
              name="twoFactorAuth"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Account Deactivation"
              name="accountDeactivation"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
  );
};

export default SettingsPage;
