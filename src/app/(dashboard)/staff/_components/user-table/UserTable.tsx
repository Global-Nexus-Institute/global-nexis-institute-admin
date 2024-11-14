import { UsersDataType } from "@/shared/types";
import { TableColumnProps, Button, Table } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "@/components/custom-button/CustomButton";
import UserDetailsDrawer from "../drawer/UserDetailsDrawer";

interface UserTableProps {
  students: UsersDataType[];
}

const UserTable: React.FC<UserTableProps> = ({ students }) => {
  const [student, setStudent] = useState<UsersDataType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns: TableColumnProps<UsersDataType>[] = [
    { title: "Name", dataIndex: "names", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: UsersDataType) => (
        <div className="flex gap-2">
          <CustomButton
            type="button"
            icon={<FontAwesomeIcon icon={faEye} />}
            onClick={() => {
              setStudent(record);
              setIsDrawerOpen(true);
            }}
          />
          <CustomButton
            type="button"
            icon={<FontAwesomeIcon icon={faEdit} />}
          />
          <CustomButton
            className="bg-red-500 text-white"
            title="delete"
            onClick={() => deleteUser(record._id)}
            icon={<FontAwesomeIcon icon={faTrash} />}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={students} rowKey="_id" />
      <UserDetailsDrawer
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        student={
          student ?? {
            _id: "",
            id: 0,
            firstName: "",
            lastName: "",
            names: "",
            email: "",
            role: "",
            createdAt: "",
            updatedAt: "",
          }
        }
        width={800}
      />
    </>
  );
};

export default UserTable;
