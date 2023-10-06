import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../common";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let formData = { email, password, username };

    try {

      await axios.post(
        `${baseUrl}/users/register`,
        formData
      );
      navigate("/login");
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return <div className="m-5">
    <form onSubmit={handleLoginSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputUsername">Username</label>
        <input type="text" className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" placeholder="Enter username" onChange={(e) => {
          setUsername(e.target.value);
        }} />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => {
          setEmail(e.target.value);
        }} />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value);
        }} />
      </div>
      <br />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    Already a member ! Login <Link to="/login" >Here</Link>
  </div>;
};

export default Register;
