import React, { useState } from 'react'
import { Layout } from 'antd';
import { Link } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './App.less';

const { Header, Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapse] = useState(false)
  return (
    <div className="App" >
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <ul >
            <li key="react" >
              <Link to="/react">React</Link>
            </li>
            <li key="vue" >
              <Link to="/vue">Vue</Link>
            </li>
            <li key="angular" >
              <Link to="/angular">Angular</Link>
            </li>
          </ul>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => { setCollapse(!collapsed) },
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <div id="vue" />
            <div id="react-app" />
            <app-root></app-root>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
export default App;