"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, TableColumnProps, Card, Col, Row, Statistic } from "antd";
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
      <h1 className="text-2xl text-white font-bold mb-4">Manage Users</h1>
      <Row className=" h-50 my-2 bodrder p-5 w-full gap-4" gutter={6}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Students" value={students.length} />
          </Card>
        </Col>
        <Col span={6}>
          {" "}
          <Card>
            <Statistic title="Total Enrolled" value={0} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Pending" value={0} />
          </Card>
        </Col>
        <Col span={6}></Col>
      </Row>
      <UserTable students={students} />
    </div>
  );
};

export default UsersPage;
