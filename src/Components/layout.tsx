

import React, { Children, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons';
import TodoComponent from './TodoComponent';
import CreateTodo from './createTodo';
// import type { MenuProps } from 'antd';
// import { icons } from 'antd/es/image/PreviewGroup';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];


type NavigationMappingType = {
  "createTodo": string,
  "showAll": string
}

const navigationMapping: NavigationMappingType = {
  "createTodo": "/",
  "showAll": '/showAll'
}

const items = [
  {
    key: 'Todos',
    icons: <CaretDownOutlined style={{ color: 'white' }} />,
    label: 'Todos',
    children: [
      { key: 'createTodo', label: 'CreateTodo' },
      { key: 'showAll', label: 'ShowAll' }
    ]
  }
]

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible={false} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }: any) => {
          navigate(navigationMapping[key as keyof NavigationMappingType])
        }}
        />
      </Sider>
      <Layout>
        <Routes>
          <Route path='/showAll' element={<TodoComponent />} />
          <Route path='/' element={<CreateTodo />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default App;