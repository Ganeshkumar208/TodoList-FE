import { Button, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
// import TodoModal from "./TodoModal";
import { useNavigate } from "react-router-dom";


interface CreateInter {
  Activity: string;
  DateToComplete: string;
}

const CreateTodo = () => {
  const navigate = useNavigate();

  const [Activity, setActivity] = useState("");
  const [DateToComplete, setDateToComplete] = useState("")
  // const [visible, setVisible] = useState(false);
  // const [formData, setFormData] = useState([]);
  // const [currentItem, setCurrentItem] = useState(null);
  // const [StartDate, setStartDate] = useState<Date | null>(null);
  // const [CompletedDate, setCompletedDate] = useState<Date | null>(null);
  // const [Status, setStatus] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false);
  // const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  // const showAll = (page: number = 1) => {
  //   setLoading(true);
  //   axios.post("http://localhost:5566/todo/readAll", { page })
  //     .then((response) => {
  //       const { todos, totalCount } = response.data;
  //       setFormData(todos);
  //       setPagination((prev) => ({ ...prev, current: page, total: totalCount }));
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching todos:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   showAll();
  // }, []);

  // const onInputChange = (e:React.ChangeEventHandler<HTMLInputElement>, key: string) => {
  //   //  setUpdatedData({ ...updatedData, [key]: e.target.value });
  //       const {value} = e.target;
  // }

  const handleOk = () => {
    const reqBody: CreateInter = { Activity: Activity, DateToComplete: DateToComplete, };
    axios.post('http://localhost:5566/todo/create', reqBody)
      .then((response) => {
        console.log("response", response.data);
        setActivity('');
        setDateToComplete('');
        navigate('/showAll');
      })
      .catch((error) => {
        console.log('error occured', error);
      })
  }

  return (
    <>
      {/* #274046,#e6dada */}
      {/* <div style={{fontWeight:'bolder',color:"whitesmoke",background:'#355c7d'}}>TODO APPLICATION</div> */}

      {/* <Button style={{
          background: 'navyblue',
          marginLeft: "-5px", width: '150px',
          height: '50px', boxShadow: '10px 10px  5px black',
          fontWeight: 'bold', color: 'black',
        }}
          type="primary"
          onClick={() => { setVisible(true); setCurrentItem(null); }}>
          Create Todo
        </Button>
        <br /><br /><br /><br />
        <TodoModal
        visible={visible}
        setVisible={setVisible}
        handleOk={handleOk}
        currentItem={currentItem} /> */}

      <div style={{ background: 'linear-gradient(#0D324D,#0FFDVC)', marginTop: "5%", marginLeft: "30%" }}>
        <div>
          <h1 style={{ fontFamily: 'cursive', color: 'teal', marginBottom: '100px', marginLeft: '80px', fontWeight: 'bolder' }}>Create Your TODO</h1>
          <hr style={{
            border: 'none',
            borderTop: '3px solid black',
            width: '100%',
            marginLeft: '-200px',
            marginTop: '-60px'
          }} />
        </div>

        <div style={{ marginTop: '70px' }}>
          <label style={{ width: "30%", marginLeft: '40px', fontWeight: 'bolder' }}>Activity:</label><br /><br />
          <Input name='Activity' value={Activity} placeholder='Enter Your Activity' style={{ width: '40%', marginLeft: '40px', color: 'whitesmoke', background: 'linear-gradient(#274046,#e6dada)' }}
            onChange={(e) => setActivity(e.target.value)} /><br /><br />

          <label style={{ width: "30%", marginLeft: '40px', fontWeight: 'bolder' }}>Date To Complete:</label><br /><br />
          <Input type="date" name='Date To Complete' value={DateToComplete} placeholder='Enter Your Activity' style={{ width: '40%', marginLeft: '40px', color: 'whitesmoke', background: 'linear-gradient(#274046,#e6dada)' }}
            onChange={(e) => setDateToComplete(e.target.value)}
            min={new Date().toISOString().split('T')[0]} /><br /><br />

          <Button style={{ background: '#E97451', width: '150px', marginLeft: "50px", fontWeight: 'bold', boxShadow: '10px 10px  5px black' }}
            onClick={handleOk}
          >Submit</Button>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
