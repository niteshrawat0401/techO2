import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import GetUserData from "./GetUserData";

const init = {
  firstName: "",
  lastName: "",
  email: "",
  type: "",
  phoneNo: "",
};

const Dashboard = () => {
  const [userValue, setValue] = useState(init);
  const [data, setData] = useState([]);
  // console.log(calValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...userValue, [name]: value });
  };

  const getData = () => {
    let getId = JSON.parse(localStorage.getItem("pvtroute"));
    axios
      .get(`https://uptight-cod-hose.cyclic.app/auth/getUserData/${getId.userId}`)
      .then((res) => {
        setData(res.data.getUserData);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    let getId = JSON.parse(localStorage.getItem("pvtroute"));
    if (getId.type == "admin") {
      getAllData();
    } else {
      getData();
    }
  }, []);

  const getAllData = () => {
    axios
      .get(`https://uptight-cod-hose.cyclic.app/auth/getAll`)
      .then((res) => {
        setData(res.data.getAllData);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  let getId = JSON.parse(localStorage.getItem("pvtroute"));

  return (
    <div>
      {/* {   
      <>
      {getId.type === "admin" ? (null) : (
        <div className='data_box'>
        <h1 style={{ fontWeight: "bold",fontSize:"21px" }}>User Data</h1>
      <form 
      onSubmit={handleSubmit}
      >
        <br />
        <input
          type="text"
          name="firstName"
          className="name_inp"
          placeholder="FirstName"
          onChange={handleChange}
          value={userValue.firstName}
          required
        />
        <input
          type="text"
          name="lastName"
          className="last_inp"
          placeholder="LastName"
          onChange={handleChange}
          value={userValue.lastName}
          required
        />
        <input
          type="text"
          name="email"
          className="last_inp"
          placeholder="Email"
          onChange={handleChange}
          value={userValue.email}
          required
        />
        <select className='last_inp' name='type' onChange={handleChange}>
          <option value="">Type</option>
          <option value="user">user</option> */}
      {/* <option value="admin">admin</option> */}
      {/* </select>
        <input
          type="text"
          name="phoneNo"
          className="last_inp"
          placeholder="PhoneNo"
          onChange={handleChange}
          value={userValue.phoneNo}
          required
        />
        <input className="btn" type="submit" value="Create" />
      </form>
      </div> */}
      {/* )
      }
      </> */}

      {/* } */}
      <div>
        <GetUserData data={data} getAllData={getAllData} />
      </div>
    </div>
  );
};
export default Dashboard;
