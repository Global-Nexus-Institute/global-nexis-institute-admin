"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "antd";

interface User {
  _id: string;
  name: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <Button
          danger
          className="bg-red-500 text-white"
          onClick={() => deleteUser(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </div>
  );
};

export default UsersPage;
