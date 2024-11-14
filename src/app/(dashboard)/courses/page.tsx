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
  Space,
  Modal,
  Alert,
} from "antd";
import { useCourses } from "@/shared/hooks/courses/courses.hooks";
import { useAppSelector } from "@/lib/store/store.hooks";
import { RootState } from "@/lib/store/store";
import { CoursesDataType } from "@/shared/types";
import CustomButton from "@/components/custom-button/CustomButton";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditCourseForm from "./_components/course-forms/EditCourseForm";

interface Course {
  _id: string;
  name: string;
  description: string;
}

const Courses = () => {
  const [refresh, setRefresh] = useState(false);
  const [reload, setReload] = useState(false);
  const [courseDetail, setCourseDetail] = useState<CoursesDataType>();
  const [isOpen, setIsOpen] = useState(false);

  const { fetchCourses, fetchFromIllimidesk, updateCourseCost } = useCourses();

  const {
    data: courses,
    loading,
    updating,
    error,
    successMesage,
  } = useAppSelector((store: RootState) => store.courses);

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

  const openEditModal = () => setIsOpen(true);

  const closeEditModal = () => {
    setIsOpen(false);
    handleRefresh();
  };

  const columns: TableColumnProps<CoursesDataType>[] = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "short_intro", key: "description" },
    { title: "Price", dataIndex: "cost", key: "cost" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CoursesDataType) => (
        <Space>
          <CustomButton
            type="button"
            icon={<FontAwesomeIcon icon={faEdit} />}
            onClick={() => {
              setCourseDetail(record);
              openEditModal();
              console.log("edit course");
            }}
          />
          <CustomButton
            className="bg-red-500 text-white"
            title="delete"
            onClick={() => console.log("remove course")}
            icon={<FontAwesomeIcon icon={faTrash} />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="h-full bg-gndarkblue">
      {successMesage && (
        <Alert message={successMesage} type="success" closable />
      )}
      {error && <Alert message={error} type="error" closable />}
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

      <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={false}>
        <EditCourseForm courseDetail={courseDetail} onSubmit={closeEditModal} />
      </Modal>
    </div>
  );
};

export default Courses;
