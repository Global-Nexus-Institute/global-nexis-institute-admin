"use client";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, TableColumnProps } from "antd";
import { useAppSelector } from "@/lib/store/store.hooks";
import { RootState } from "@/lib/store/store";
import { useUsers } from "@/shared/hooks/users/users.hooks";
import { UsersDataType } from "@/shared/types";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UsersDataType[]>([]);
  const [refresh, setReferesh] = useState(false);

  const { data: students, loading } = useAppSelector(
    (state: RootState) => state.users,
  );

  const { getUsers } = useUsers();

  useEffect(() => {
    getUsers();
  }, [refresh]);

  const columns: TableColumnProps<UsersDataType>[] = [
    { title: "Name", dataIndex: "names", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: UsersDataType) => (
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
      setUsers(students.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <Table columns={columns} dataSource={students} rowKey="_id" />
    </div>
  );
};

export default UsersPage;
