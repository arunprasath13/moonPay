import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const navigate = useNavigate();
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")

  const handleUserName = (e) => {
    setUserName(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = async () => {
    const payload = {
      username:username,
      password:password
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/dashboard");
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            username: username,
            password: password,
          })
        );
        console.log("Signup successful", data);
      } else {
        console.error("Signup failed", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{
          backgroundColor: "grey",
          padding: "20px 40px",
          minHeight: "300px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius:"5px"
        }}
        className=" rounded-sm"
      >
        <Heading title="Sign In" className="" />
        <SubHeading value="Enter your information to login into your account" />
        <InputBox label="username" placeholder="Enter your username" type="text" onChange={handleUserName}/>
        <InputBox
          label="Password"
          placeholder="Enter your password"
          type="password"
          onChange = {handlePassword}
        />
        <div className="" style={{display:"flex","justifyContent":"center","alignItems":"center",marginTop:"20px"}}>
          <Button value={"Sign In"} onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  );
};

export default Signin;
