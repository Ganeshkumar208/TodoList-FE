import { Button, Table, Select, DatePicker, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoModal from "./TodoModal";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useFetcher } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'

const TodoComponent = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [StartDate, setStartDate] = useState<Date | null>(null);
  const [CompletedDate, setCompletedDate] = useState<Date | null>(null);
  const [Status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const showAll = (page: number = 1) => {
    setLoading(true);
    axios.post("http://localhost:5566/todo/readAll", { page })
      .then((response) => {
        const { todos, totalCount } = response.data;
        setFormData(todos);
        setPagination((prev) => ({ ...prev, current: page, total: totalCount }));
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    showAll();
  }, []);

  const handleOk = (formData: any) => {
    const reqBody = { Activity: formData.Activity, DateToComplete: formData.DateToComplete };
    if (!currentItem) {
      axios.post("http://localhost:5566/todo/create", reqBody)
        .then(() => {
          setVisible(false);
          showAll();
        })
        .catch((error) => {
          console.error("Error creating to-do:", error);
        });
    } else {
      axios.post(`http://localhost:5566/todo/update/${formData.id}`, formData)
        .then(() => {
          setVisible(false);
          setCurrentItem(null);
          showAll();
        })
        .catch((error) => {
          console.error("Error updating to-do:", error);
        });
    }
  };

  const handleStatus = (value: string) => {
    setStatus(value);
    const params: { status?: string } = {};
    if (value !== "") {
      params.status = value;
    }
    setPagination((prevState) => ({ ...prevState, current: 1 }));
    axios
      .post(`http://localhost:5566/todo/readAll`, { page: 1, ...params })
      .then((response) => {
        const { todos, totalCount } = response.data;
        setFormData(todos);
        setPagination((prevState) => ({ ...prevState, total: totalCount }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const limitShowAll = () => {
    if (Status && StartDate && CompletedDate && StartDate < CompletedDate) {
      axios
        .post(`http://localhost:5566/todo/ByDate/${Status}/${StartDate.toISOString()}/${CompletedDate.toISOString()}`)
        .then((response) => {
          const { totalCount } = response.data;
          setFormData(response.data);
          setPagination((prevState) => ({ ...prevState, total: totalCount }));
          console.log(response.data.status)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSave = async () => {
    let fileName = prompt('Enter the File Name:') || 'table.xlxs';
    if (!fileName.endsWith('.xlsx')) {
      fileName += '.xlsx'
    }
    let allData: any = [];

    const fetchPage = async (page: number) => {
      const response = await axios.post("http://localhost:5566/todo/readAll", { page });
      const { todos } = response.data;
      allData = allData.concat(todos);
      if (todos.length === pagination.pageSize) {
        await fetchPage(page + 1);
      }
    }
    setLoading(true);
    await fetchPage(1);

    const worksheetData = [
      Object.keys(allData[0]),
      ...allData.map((row: any) => Object.values(row)),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
    console.log({ allData });
    setLoading(false);
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
      render: (item: any) => (
        <Button
          onClick={() => {
            setVisible(true);
            setCurrentItem(item);
          }}
        >
          Update
        </Button>
      ),
    }
  ];

  return (
    <>
      {/* #274046,#e6dada */}
      <div style={{ fontWeight: 'bolder', color: "whitesmoke", background: '#355c7d', textAlign: 'center' }}>TODO APPLICATION</div>
      <div style={{ backgroundImage: "linear-gradient(#355c7d,#a280)" }}>
        <br /><br />
        {/* <Button style={{
          background: 'lightblue',
          marginLeft: "-5px", width: '150px',
          height: '50px', boxShadow: '10px 10px  5px black',
          fontWeight: 'bold', color: 'black'
        }}
          type="primary"
          onClick={() => { setVisible(true); setCurrentItem(null); }}>
          Create Todo
        </Button> */}
        <br /><br /><br /><br />
        <Select style={{
          width: '150px',
          marginLeft: '300px',
          marginRight: "50px",
          boxShadow: '10px 10px  5px black',
          fontWeight: 'bold'
        }}
          defaultValue="" onChange={handleStatus}
          options={[
            { label: "All", value: "" },
            { label: 'open', value: 'open' },
            { label: 'Inprogress', value: 'Inprogress' },
            { label: 'Completed', value: 'Completed' },
          ]} />
        <DatePicker value={StartDate}
          style={{
            background: '#E5AA70',
            width: '150px', marginLeft: "10px",
            boxShadow: '10px 10px  5px black',
            marginRight: '20px',
            fontWeight: 'bold',
            color: 'black'
          }}
          onChange={(date) => setStartDate(date)} />
        <DatePicker value={CompletedDate}
          style={{
            background: '#E5AA70',
            width: '150px',
            marginLeft: "10px",
            boxShadow: '10px 10px  5px black',
            fontWeight: 'bold',
            color: 'black'
          }}
          onChange={(date) => setCompletedDate(date)} />
        <Button onClick={limitShowAll}
          style={{ background: '#E97451', width: '150px', marginLeft: "50px", fontWeight: 'bold', boxShadow: '10px 10px  5px black' }}
        >Filter</Button>
        <br /><br /><br />
      </div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          style={{ background: '#89CFF0' }}
          dataSource={formData}
          columns={columns}
          pagination={pagination}
          onChange={(pagination) => showAll(pagination.current)}
        />
      )}
      <Button type='primary'
        style={{ width: '10%', height: '50px', marginLeft: '1180px' }}
        onClick={handleSave}>
        Save Your File
      </Button>
      <TodoModal
        visible={visible}
        setVisible={setVisible}
        handleOk={handleOk}
        currentItem={currentItem} />
    </>
  );
};

export default TodoComponent;

