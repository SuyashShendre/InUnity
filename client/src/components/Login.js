import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../common";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let formData = { email, password };

    try {

      const data = await axios.post(
        `${baseUrl}/users/login`,
        formData
      );

      localStorage.setItem("user", JSON.stringify(data.data.data));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/");
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="m-5">
      <form onSubmit={handleLoginSubmit}>
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
      Not a member ! Register <Link to="/register" >Here</Link>
    </div>
  );
};

export default Login;


