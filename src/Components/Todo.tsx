// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Form, message } from 'antd';
// import {Rule} from 'antd/lib/form';
// import { title } from 'process';
// import { render } from '@testing-library/react';
import axios from 'axios';
// import { FormInstance } from 'antd/lib/form';


interface Todotype {
  Sno: number;
  Activity: string;
  Status: string;
  DateToComplete: string;
  StartDate: string;
  StartTime: string;
  CompletedDate: string;
  CompletedTime: string;
}

let counts = 0;

const Todo = () => {
  const [formData, setformData] = useState<any>({});
  const [tableData, setTableData] = useState<any>([])

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const showModal3 = () => {
    setIsModalOpen3(true);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }


  const updateClick = () => {
    counts = counts + 1;
    if (counts > 1) {
      showModal3();
    }
    else {
      showModal2();
    }
  }

  useEffect(() => {
    showAll();
  }, []);

  const handleSubmit = () => {
    const reqFields = ['Activity', 'DateToComplete'];
    const isValid = reqFields.every(field => formData[field]);
    if (!isValid) {
      message.error("Please fill all fields");
      return;
    }
    axios.post("http://localhost:5566/todo/create", formData)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setIsModalOpen1(false);

  };

  // const updateHandler1 = () => {
  //   const reqFields = ['Status', 'StartDate', 'StartTime'];
  //   const isValid = reqFields.every(field => formData[field]);
  //   console.log(formData)

  //   if (!isValid) {
  //     message.error("Please fill all fields");
  //     return;
  //   }
  //   axios.post("http://localhost:5566/todo/create", formData)
  //     .then(response => {
  //       console.log('Response:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     }); 
  // };


  const showAll = () => {
    axios.post("http://localhost:5566/todo/readall")
      .then(response => {
        setTableData(response.data);
        console.log('Response:', response.data, '222');
      })
      .catch(error => {
        console.log('error:', error);
      });
  }


  const columns = [
    {
      title: 'S.no',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Activity',
      dataIndex: 'Activity',
      key: 'Activity',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Date To Complete',
      dataIndex: 'DateToComplete',
      key: 'DateToComplete',
    },
    {
      title: 'Start Date',
      dataIndex: 'StartDate',
      key: 'StartDate',
    },
    {
      title: 'Start Time',
      dataIndex: 'StartTime',
      key: 'StartTime',
    },
    {
      title: 'Completed Date',
      dataIndex: 'CompletedDate',
      key: 'CompletedDate',
    },
    {
      title: 'Completed Time',
      dataIndex: 'CompletedTime',
      key: 'CompletedTime',
    },
    {
      title: 'Action',
      key: "action",
      render: (text: any, record: any) => (
        <div>
          <Button onClick={updateClick}>Update</Button>
        </div>
      ),
    }
  ]




  return (
    <div>
      <br />
      <h1 style={{ fontWeight: 'bold', color: 'grey' }}>Todo Application</h1> <br /><br />
      <Button type='primary' onClick={showModal1}>Create a Todo</Button> <br /><br />

      <Table columns={columns} dataSource={tableData} ></Table>

      <Modal title="Create Your Todo" visible={isModalOpen1} onCancel={handleCancel} footer={null} >
        <Form>
          <p>Activity:</p><Input onChange={titleChange} name='Activity' value={formData.Activity || ''} placeholder='Enter Your Activity' /><br /><br />
          <p>Date To Complete:</p><Input onChange={titleChange} type="date" name='DateToComplete' value={formData.DateToComplete || ''} placeholder='Enter Your Date To Complete' /><br /><br />
          <Button type='primary' onClick={handleSubmit}>Submit</Button>

        </Form>
      </Modal>


      <Modal visible={isModalOpen2} onCancel={handleCancel} footer={null} >
        <Form>

          <p>Current Status:</p><Input name='Status' placeholder='Enter Your Current Status' defaultValue="InProgress" /><br /><br />
          <p>Activity Start Date:</p><Input onChange={titleChange} value={formData.StartDate || ''} type="date" name='StartDate' placeholder='Enter Your Activity Start Date' /><br /><br />
          <p>Activity Start Time:</p><Input onChange={titleChange} value={formData.StartTime || ''} type="time" name='StartTime' placeholder='Enter Your Activity Start Time' /><br /><br />
          <Button type='primary' >Update My Status</Button>
        </Form>
      </Modal>
      {/* onClick={updateHandler1} */}

      <Modal visible={isModalOpen3} onCancel={handleCancel} footer={null} >
        <Form>
          <p>Current Status:</p><Input name='Current Status' placeholder='Enter Your Current Status' defaultValue="Completed" /><br /><br />
          <p>Activity Completed Date:</p><Input type="date" name='Activity Completed Date' placeholder='Enter Your Activity Completed Date' /><br /><br />
          <p>Activity Completed Time:</p><Input type="time" name='Activity Completed Time' placeholder='Enter Your Activity Completed Time' /><br /><br />
          <Button type='primary'>Update My Status</Button>
        </Form>
      </Modal>


    </div>

  );
}

export default Todo;
