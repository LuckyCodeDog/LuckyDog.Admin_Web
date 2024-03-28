

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Headers from '../layout/header';
import Slider from '../layout/slider';
import { Breadcrumb, Layout, Menu, theme, Card } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  return (
    <Layout style={{minHeight: '100vh',}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Slider></Slider>
      </Sider>
      <Layout>
        <Header style={{padding: 0,background: colorBgContainer,}}>
            <Headers></Headers>
        </Header>
        <Content style={{margin: '0 16px',}}>
          <Breadcrumb style={{margin: '16px 0',}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          {/* set  route out let here */}
          <Outlet></Outlet>
        </Content>
        <Footer style={{textAlign: 'center',}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Main;
