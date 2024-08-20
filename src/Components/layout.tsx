import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons';
import TodoComponent from './TodoComponent';
import CreateTodo from './createTodo';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import addtodo from '../Components/Images/to-do-list.png'
import showtodo from '../Components/Images/juggle.png'



const { Sider } = Layout;

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
      {
        key: 'createTodo',
        icon: (
          <img
            src={addtodo}
            alt="Add Todo Icon"
            style={{ width: '20px', height: '20px' }}
          />
        ),
        label: (
          <span style={{ fontWeight: 'bolder', fontFamily: 'monospace', color: 'aquamarine' }}>Create Todo</span>
        )
      },
      {
        key: 'showAll',
        icon: (
          <img
            src={showtodo}
            alt="Add Todo Icon"
            style={{ width: '20px', height: '20px' }}
          />
        ),
        label: (
          <span style={{ fontWeight: 'bolder', fontFamily: 'monospace', color: 'aquamarine' }}>ShowAll</span>
        )
      }
    ]
  }
]

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: "red" }}>
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