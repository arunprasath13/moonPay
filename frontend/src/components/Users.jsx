import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    // Use axios to fetch data with the token in the Authorization header
    axios
      .get("http://localhost:3000/api/v1/bulk", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then((response) => {
        console.log(response.data.user); // Log the fetched data
        setUsers(response.data.user); // Assuming `user` is the correct key for the users data
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log any errors
      });
  }, []);

  return (
    <div className="">
      <h1 className="fon">Users List</h1>
      <ul>
        <hr></hr>
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                border: "1px solid grey",
                marginTop: "10px",
                alignItems: "center",
              }}
            >
              <li key={index}>{user.username || "No name available"}</li>
              <Button value={"Send Money"} onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.username)
              }}/>
            </div>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default Users;
