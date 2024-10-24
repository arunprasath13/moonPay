import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setFirstName(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: username,
      firstName: firstName,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/signup", {
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
            firstName: firstName,
          })
        );
        console.log("Signup successful", data);
      } else {
        console.error("Signup failed", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
    navigate("/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("userDetails");
    if (!token) {
      handleLogOut(); // Call the logout function if token is missing
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{
          backgroundColor: "grey",
          padding: "20px 40px",
          height: "500px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
        }}
        className="rounded-sm"
      >
        <Heading title="Sign Up" />
        <SubHeading value="Enter your information to create an account" />
        <InputBox
          label="First Name"
          placeholder="Enter your first Name"
          type="text"
          name="firstName"
          onChange={handleName}
        />
        <InputBox
          label="Username"
          placeholder="Enter your last Name"
          type="text"
          name="username"
          onChange={handleUserName}
        />
        <InputBox
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
          onChange={handlePassword}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Button value={"Sign In"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
