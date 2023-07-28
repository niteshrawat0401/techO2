import React, { useEffect, useState } from 'react'
import "./style.css";
import axios from 'axios';
import Getbmi from './Getbmi';

const init = {
    firstName : "",
    lastName : "",
    email : "",
    type : "",
    phoneNo : ""
}

const Dashboard = () => {
  const [userValue, setValue] = useState(init);
  const [data, setData] = useState([]);
  // console.log(calValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...userValue, [name]: value });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    let getId = JSON.parse(localStorage.getItem("pvtroute"))
    axios
      .post(`http://localhost:8080/user/createData/${getId.userId}`, userValue)
      .then((res) => {
        alert("Add Data Successfully");
        getData();
        setValue({...init})
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log("error", err);
      });
  }
  const getData = ()=>{
    let getId = JSON.parse(localStorage.getItem("pvtroute"))
    axios
      .get(`http://localhost:8080/user/getUserData/${getId.userId}`)
      .then((res) => {
        setData(res.data.getUserData)
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  useEffect(()=>{
    getData()
  })

  return (
    <div>
      <div className='data_box'>
        <h1 style={{ fontWeight: "bold",fontSize:"21px" }}>User Data</h1>
      <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          name="type"
          className="last_inp"
          placeholder="Type"
          onChange={handleChange}
          value={userValue.type}
          required
        />
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
      </div>
      <div><Getbmi data={data}/></div>
    </div>
  )
}
export default Dashboard