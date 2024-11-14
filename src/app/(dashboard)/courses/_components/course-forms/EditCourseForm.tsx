import CustomButton from "@/components/custom-button/CustomButton";
import { InputField } from "@/components/input-field/InputField";
import { RootState } from "@/lib/store/store";
import { useAppSelector } from "@/lib/store/store.hooks";
import { useCourses } from "@/shared/hooks/courses/courses.hooks";
import { CoursesDataType } from "@/shared/types";
import { Radio } from "antd";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";

export default function EditCourseForm({
  courseDetail,
  onSubmit,
}: {
  courseDetail?: CoursesDataType;
  onSubmit: () => void;
}) {
  const [mode, setMode] = useState<"edit-cost" | "edit-details">();
  const { updateCourseCost } = useCourses();

  const { loading, updating } = useAppSelector(
    (store: RootState) => store.courses,
  );
  let courseId: string;
  useEffect(() => {
    if (courseDetail) {
      courseId = courseDetail._id;
    }
  }, [courseDetail]);
  return (
    <div>
      <h1>EditCourseForm</h1>
      <div>
        <h3>Choose Mode:</h3>
        <div>
          <Radio.Group onChange={(value) => setMode(value.target.value)}>
            <Radio value={"edit-cost"}>Edit Course Price</Radio>
            <Radio value={"edit-details"}>Edit Course Details</Radio>
          </Radio.Group>
        </div>
      </div>
      {mode == "edit-cost" && (
        <div className="mt-5">
          <Formik
            initialValues={{ cost: courseDetail?.cost ?? 100 }}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
              if (courseDetail && values.cost)
                console.log("Payload", courseDetail?._id, values.cost);
              updateCourseCost(courseDetail?._id ?? "", values.cost)
                .then(onSubmit)
                .finally(resetForm);
            }}
          >
            {({ handleSubmit, values, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <h3>Course Name: {courseDetail?.name}</h3>
                  <InputField
                    name="cost"
                    label="Cost"
                    id="cost"
                    value={values.cost}
                    type="number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mt-8">
                  <CustomButton
                    type="submit"
                    loading={loading || updating}
                    height={40}
                    width={200}
                    className="mt-5 bg-blue-500 text-white"
                    text={loading || updating ? "Updating..." : "Submit"}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
