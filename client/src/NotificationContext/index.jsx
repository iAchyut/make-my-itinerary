import React from 'react';
import { createContext } from "react";
import { notification } from 'antd';

const NotificationContext = createContext(null);

export function NotificationContextProvider({ children }) {
  const [api, contextHolder] = notification.useNotification();
  
  const openNotificationWithIcon = (type, title, desc, placement="bottomLeft") => {
    api[type || 'success']({
      message: title || 'Notification Title',
      description: desc ||
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement : placement,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotificationWithIcon }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
