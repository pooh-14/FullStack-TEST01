import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    role: "Buyer",
  });
  const router = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    // console.log([event.target.name])
    console.log(userData)
  };

  const selectRole = (event) => {
    setUserData({ ...userData, role: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      userData.name &&
      userData.email &&
      userData.password &&
      userData.confirmPassword &&
      userData.number &&
      userData.role
    ) {
      if (userData.password == userData.confirmPassword) {
        const response = await axios.post("http://localhost:8008/register", {
          userData,
        });
        console.log(response);
        if (response.data.success) {
          setUserData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            number: "",
            role: "Buyer",
          });
          router("/login");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Passwords do not match!");
      }
    } else {
      toast.error("All feilds are Mandatory!");
    }
  };

  return (
    <div style={{ width: "40%", margin: "auto", marginTop: "50px" }}>
      <form
        style={{ width: "60%", margin: "auto", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        <label>Select Role :</label>
        <br />
        <select onChange={selectRole}>
          <option value="Buyer">Buyer</option>
          <option value="Seller">seller</option>
          <option value="Admin">Admin</option>
        </select>
        <br />
        <label>Enter Name :</label>
        <br />
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <br />
        <label>Enter Email :</label>
        <br />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <br />
        <label>Enter Number :</label>
        <br />
        <input
          type="number"
          name="number"
          value={userData.number}
          onChange={handleChange}
        />
        <br />
        <label>Enter Password :</label>
        <br />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <br />
        <label>Confirm Password :</label>
        <br />
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
