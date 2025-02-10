import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  __v?: number;
}

const TrafficReliefDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const API_URL = "https://traffic-relief-dashboard.onrender.com/api/users";

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add a new user
  const addUser = async () => {
    try {
      const response = await axios.post<User>(API_URL, newUser, {
        headers: { "Content-Type": "application/json" },
      });
      setUsers([...users, response.data]);
      setNewUser({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username} - {user.email}</li>
        ))}
      </ul>

      <h2>Add User</h2>
      <input type="text" name="username" value={newUser.username} onChange={handleChange} placeholder="Username" />
      <input type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Password" />
      <button onClick={addUser}>Add User</button>
    </div>
  );
};

export default TrafficReliefDashboard;
