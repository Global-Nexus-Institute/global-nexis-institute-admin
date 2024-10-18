"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, TableColumnProps } from "antd";
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
  const { fetchCourses, fetchFromIllimidesk, updateCourseCost } = useCourses()

  const {data: courses} = useAppSelector((store: RootState) => store.courses);

  useEffect(() => {
    fetchCourses();
  }, [refresh]);

  useEffect(() => {
    if (reload) {
      fetchFromIllimidesk().then(() => setReload(false));
    }
  },[reload]);

const handleRefresh = () => {
  setRefresh(!refresh);
};

  const columns: TableColumnProps<CoursesDataType>[]  = [
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
    <div>
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
        <Button>Update Course</Button>
      </div>
      <div>some states</div>
      <Table columns={columns} dataSource={courses} rowKey="uuid" />
    </div>
  );
};

export default Courses;
