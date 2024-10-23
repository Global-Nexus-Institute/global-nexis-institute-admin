"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, TableColumnProps } from "antd";
import { useAppSelector } from "@/lib/store/store.hooks";
import { RootState } from "@/lib/store/store";
import { useUsers } from "@/shared/hooks/users/users.hooks";
import { UsersDataType } from "@/shared/types";
import UserTable from "./_components/user-table/UserTable";

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


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <UserTable students={students} />
    </div>
  );
};

export default UsersPage;
