// LoginModal.jsx
import React from 'react';
import { Modal, Button, Space } from 'antd';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { auth, googleProvider, facebookProvider, signInWithPopup } from './firebase';
import NotificationContext from '../NotificationContext';

const LoginModal = ({ open, onClose }) => {
let notificationContext = React.useContext(NotificationContext);

  const handleLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in as:', user.displayName);
      notificationContext.openNotificationWithIcon('success', 'Login Successful', `Welcome ${user .displayName}!`);
      onClose(); // Close modal after login
    } catch (err) {
       notificationContext.openNotificationWithIcon('error', 'Login Unsuccessful', `Login failed : Contact support if the issue persists.`);
      console.error('OAuth Error:', err);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Login / Signup">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button icon={<GoogleOutlined />} block onClick={() => handleLogin(googleProvider)}>
          Continue with Google
        </Button>
        <Button icon={<FacebookFilled />} block onClick={() => handleLogin(facebookProvider)}>
          Continue with Facebook
        </Button>
      </Space>
    </Modal>
  );
};

export default LoginModal;
