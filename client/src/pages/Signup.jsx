import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/signup.css";

let init = {
  firstName: "",
  lastName : "",
  email : "",
  type : "",
  phoneNo : "",
  passWord: "",
};

export const Signup = () => {
  const [signup, setSignupdata] = useState(init);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupdata({ ...signup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/signup", signup)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log("error", err);
      });
  };

  return (
    <>
    <div className="signup_main_cont">
      <h1 style={{ fontWeight: "bold",fontSize:"21px",paddingTop:"1rem" }}>Register User</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          name="firstName"
          className="inp1"
          placeholder="UserName"
          onChange={handleChange}
          value={signup.firstName}
          required
        />
        <br />
        <input
          type="text"
          name="lastName"
          className="inp2"
          placeholder="Lastname"
          onChange={handleChange}
          value={signup.lastName}
          required
        />
        <br />
        <input
          type="text"
          name="email"
          className="inp2"
          placeholder="Email"
          onChange={handleChange}
          value={signup.email}
          required
        />
        <br/>
        <input
          type="password"
          name="type"
          className="inp2"
          placeholder="Type"
          onChange={handleChange}
          value={signup.type}
          required
        />
        <br/>
        <input
          type="number"
          name="phoneNo"
          className="inp2"
          placeholder="PhoneNo"
          onChange={handleChange}
          value={signup.phoneNo}
          required
        />
        <br />
        <input
          type="password"
          name="passWord"
          className="inp2"
          placeholder="PassWord"
          onChange={handleChange}
          value={signup.passWord}
          required
        />
        <br/>
        <input className="inp5" type="submit" value="Sign Up" />
      </form>
      <p className="my-4">
        Already have an account <Link className="text-blue-700	" to={"/"}>Login</Link>
      </p>
    </div>
    </>
  );
};