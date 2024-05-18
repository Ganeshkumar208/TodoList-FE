// import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Todo from './Components/Todo';
import TodoComponent from './Components/TodoComponent';
import CreateTodo from './Components/createTodo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { Layout } from 'antd';



function App() {
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout>
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<TodoComponent/>} />
            {/* <Route path='/createtodo' element={<CreateTodo/>} /> */}
          </Routes>
      </Router>
    </div>
    </Layout>
  );
}

export default App;
