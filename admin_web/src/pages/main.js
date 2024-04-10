

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
import { Breadcrumb, Layout, Menu, theme, Card, Image } from 'antd';
import Breadcrumbs from '../components/Breadcrums';
const { Header, Content, Footer, Sider } = Layout;


const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  return (
    <Layout style={{minHeight: '100vh',}}>
      <Sider width={"270"} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Slider></Slider>
      </Sider>
      <Layout>
        <Header style={{padding: 0,background: colorBgContainer,}}>
            <Headers></Headers>
        </Header>
        <Content style={{margin: '0 16px',}}>
          <Breadcrumbs></Breadcrumbs>
          {/* set  route out let here */}
          <Outlet></Outlet>
        </Content>
        <Footer style={{textAlign: 'center',}}>
         Lucky Dog Admin ©{new Date().getFullYear()} Created by Han Qin
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Main;
