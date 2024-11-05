"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  TableColumnProps,
  Statistic,
  Card,
  Row,
  Col,
} from "antd";
import { useCourses } from "@/shared/hooks/courses/courses.hooks";
import { useAppSelector } from "@/lib/store/store.hooks";
import { RootState } from "@/lib/store/store";
import { CoursesDataType } from "@/shared/types";

interface Course {
  _id: string;
  name: string;
  description: string;
}

const Courses = () => {
  const [refresh, setRefresh] = useState(false);
  const [reload, setReload] = useState(false);
  const { fetchCourses, fetchFromIllimidesk, updateCourseCost } = useCourses();

  const { data: courses } = useAppSelector((store: RootState) => store.courses);

  useEffect(() => {
    fetchCourses();
  }, [refresh]);

  useEffect(() => {
    if (reload) {
      fetchFromIllimidesk().then(() => setReload(false));
    }
  }, [reload]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const columns: TableColumnProps<CoursesDataType>[] = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "short_intro", key: "description" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CoursesDataType) => (
        <Button
          danger
          className="bg-red-500 text-white"
          onClick={() => console.log("remove course")}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="h-full bg-gndarkblue">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold mb-4 text-white">Manage Courses</h1>
        <Button>Update Course</Button>
      </div>
      <Row className=" h-50 my-2 bodrder p-5 w-full gap-4" gutter={6}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Courses" value={courses.length} />
          </Card>
        </Col>
        <Col span={6}>
          {" "}
          <Card>
            <Statistic title="Total Paid" value={0} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Free" value={0} />
          </Card>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Table columns={columns} dataSource={courses} rowKey="uuid" />
    </div>
  );
};

export default Courses;
