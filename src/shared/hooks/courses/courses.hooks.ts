import { useAppDispatch, useAppSelector } from "@/lib/store/store.hooks";
import { useRouter } from "next/navigation";
import {
  fetchCourseFromIllumidestThunk,
  fetchCoursesThunk,
  resetMessages,
  updateCourseCostThunk,
} from "@/lib/features/slices/courses/courses.slice";
import { useState } from "react";
import { RootState } from "@/lib/store/store";
import { CourseDTO, CoursesDataType } from "@/shared/types";
export const useCourses = () => {
  const dispatch = useAppDispatch();

  const fetchCourses = async () => {
    await dispatch(fetchCoursesThunk()).finally(() => {
      dispatch(resetMessages());
    });
  };

  const fetchFromIllimidesk = async () => {
    dispatch(fetchCourseFromIllumidestThunk()).finally(() => {
      dispatch(fetchCourses);
    });
  };

  const updateCourseCost = async (id: string, cost: number) => {
    await dispatch(updateCourseCostThunk({ id, cost })).finally(() => {
      dispatch(resetMessages());
    });
  };

  return {
    fetchCourses,
    fetchFromIllimidesk,
    updateCourseCost,
  };
};
