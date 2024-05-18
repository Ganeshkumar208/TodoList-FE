import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

export interface TodoModalProps {
  visible: boolean;
  setVisible: any;
  handleOk: any;
  currentItem?: any;
}

interface DataInterface {
  Sno?: string;
  Activity?: string;
  Status?: string;
  DateToComplete?: string;
  StartDate?: string;
  StartTime?: string;
  CompletedDate?: string;
  CompletedTime?: string;
}

const defaultData = {
  Sno: "",
  Activity: "",
  Status: "",
  DateToComplete: "",
  StartDate: "",
  StartTime: "",
  CompletedDate: "",
  CompletedTime: "",
}

const TodoModal: React.FC<TodoModalProps> = ({
  visible,
  setVisible,
  handleOk,
  currentItem,
}) => {
  const [updatedData, setUpdatedData] = useState<DataInterface | null>(
    defaultData
  );
  // const [data, setData] = useState<DataInterface | null>(null);

  useEffect(() => {
    if (currentItem) {
      if (currentItem?.Status === "open") {
        setUpdatedData({ ...currentItem, Status: "Inprogress" });
      } else {
        setUpdatedData({ ...currentItem, Status: "Completed" });
      }
    }
  }, [currentItem]);

  let condition = updatedData?.Activity !== "" && updatedData?.DateToComplete

  const condition1 =
    updatedData?.Status === "Inprogress" &&
    updatedData?.StartDate &&
    updatedData?.StartTime;
  const condition2 =
    updatedData?.Status === "Completed" &&
    updatedData?.CompletedDate &&
    updatedData?.CompletedTime;

  if (updatedData?.Status === "Inprogress") {
    condition = condition1;
  }

  if (updatedData?.Status === "Completed") {
    condition = condition2;
  }


  const onOkClick = () => {
    if (condition) {
      handleOk(updatedData);
      setUpdatedData(null);
    }
  };



  const onInputChange = (e: any, key: string) => {
    //  setUpdatedData({ ...updatedData, [key]: e.target.value });
    const { value } = e.target;

    if (
      key === "StartedTime" &&
      updatedData?.CompletedDate === updatedData?.StartDate &&
      updatedData?.CompletedTime &&
      value > updatedData?.CompletedTime
    ) {
      setUpdatedData({ ...updatedData, [key]: updatedData?.CompletedTime } as DataInterface);
    } else if (
      key === "CompletedTime" &&
      updatedData?.StartDate === updatedData?.CompletedDate &&
      updatedData?.StartTime &&
      value < updatedData?.StartTime
    ) {
      setUpdatedData({ ...updatedData, [key]: updatedData?.StartTime });
    } else {
      setUpdatedData({ ...updatedData, [key]: value })
    }
  };


  return (
    <Modal
      title={currentItem ? "Update Todo" : "Create Todo"}
      open={visible}
      onOk={onOkClick}
      onCancel={() => {
        setVisible(false);
        window.location.reload();
        setUpdatedData(null);
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "25px",
          marginLeft: "20%",
          width: "50%",
        }}
      >
        <label style={{ width: "30%" }}>Activity:</label>
        <Input
          placeholder="Enter Your Activity"
          value={updatedData?.Activity}
          onChange={(e) => onInputChange(e, "Activity")}
          disabled={currentItem}
        />
      </div>

      {updatedData?.Status ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            margin: "25px",
            marginLeft: "20%",
            width: "50%",
          }}
        >
          <label style={{ width: "30%" }}>Status:</label>
          <Input
            value={updatedData?.Status}
            onChange={(e) => onInputChange(e, "Status")}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            margin: "25px",
            marginLeft: "20%",
            width: "50%",
          }}
        >
          <label style={{ width: "30%" }}>Complete by Date:</label>
          <Input
            type="date"
            placeholder="Enter Date"
            value={updatedData?.DateToComplete}
            onChange={(e) => onInputChange(e, "DateToComplete")}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      )}

      {updatedData?.Status === "Inprogress" && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              margin: "25px",
              marginLeft: "20%",
              width: "50%",
            }}
          >
            <label style={{ width: "30%" }}>Started Date:</label>
            <Input
              type="date"
              placeholder="Enter Start Date"
              value={updatedData?.StartDate}
              onChange={(e) => onInputChange(e, "StartDate")}
              max={updatedData?.DateToComplete}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              margin: "25px",
              marginLeft: "20%",
              width: "50%",
            }}
          >
            <label style={{ width: "30%" }}>Started Time:</label>
            <Input
              type="time"
              placeholder="Enter Start Time"
              value={updatedData?.StartTime}
              onChange={(e) => onInputChange(e, "StartTime")}
            />
          </div>
        </>
      )}

      {updatedData?.Status === "Completed" && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              margin: "25px",
              marginLeft: "20%",
              width: "50%",
            }}
          >
            <label style={{ width: "30%" }}>Completed Date:</label>
            <Input
              type="date"
              placeholder="Enter Completed Date"
              value={updatedData?.CompletedDate}
              onChange={(e) => onInputChange(e, "CompletedDate")}
              max={updatedData?.DateToComplete}
              min={updatedData?.StartDate}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              margin: "25px",
              marginLeft: "20%",
              width: "50%",
            }}
          >
            <label style={{ width: "30%" }}>Completed Time:</label>
            <Input
              type="time"
              placeholder="Enter Completed Time"
              value={updatedData?.CompletedTime}
              onChange={(e) => onInputChange(e, "CompletedTime")}
              min={
                updatedData?.StartDate === updatedData?.CompletedDate &&
                  updatedData?.StartTime &&
                  updatedData?.CompletedTime &&
                  updatedData?.StartTime >= updatedData?.CompletedTime
                  ? undefined
                  : updatedData?.StartTime
              }
            />
          </div>
        </>
      )}
    </Modal>
  );
};

export default TodoModal;


