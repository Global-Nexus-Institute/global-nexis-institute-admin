import { UsersDataType } from "@/shared/types";
import { Drawer } from "antd";
import React from "react";

interface UserDetailsDrawerProps {
  student: UsersDataType;
  isOpen: boolean;
  closeDrawer: () => void;
  width?: number;
}

const UserDetailsDrawer: React.FC<UserDetailsDrawerProps> = ({
  student,
  isOpen,
  width,
  closeDrawer,
}) => {
  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        open={isOpen}
        onClose={closeDrawer}
        width={width ?? 800}
      >
        <p>{student.names}</p>
        <a href={`/users/${student._id}`}>View details</a>
        <p>Number of courses</p>
        <p>Enrollment status</p>
      </Drawer>
    </div>
  );
};

export default UserDetailsDrawer;
