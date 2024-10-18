// features/slice/auth.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, signup } from "@/shared/api/auth.api";
import { CoursesDataType } from "@/shared/types";
import {
  fetchCourseFromIllumidesk,
  fetchCourses,
  updateCourseCost,
} from "@/shared/api/courses.api";
import { stat } from "fs";

interface CoursesState {
  data: CoursesDataType[] | [];
  singleCourse: CoursesDataType | null;
  loading: boolean;
  updating: boolean;
  successMesage: string | null;
  error: string | null;
}

const initialState: CoursesState = {
  data: [],
  singleCourse: null,
  loading: false,
  updating: false,
  successMesage: null,
  error: null,
};

// Thunk for login
export const fetchCoursesThunk = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    try {
      // Fetch courses form our database
      const res = await fetchCourses();
      console.log("Courses:", res.data);
      return res.data; // Handle response from Flask (e.g., user data or session)
    } catch (error: any) {
      console.log("Login error:", error);
      return error.response.data ?? error.response.message;
    }
  },
);

// Fettch courses from illumidesk
export const fetchCourseFromIllumidestThunk = createAsyncThunk(
  "courses/fetchCourseFromIllumidestThunk",
  async () => {
    try {
      const res = await fetchCourseFromIllumidesk();
      return res.data;
    } catch (error: any) {
      return error.response.data ?? error.response.message;
    }
  },
);

// update course cost
export const updateCourseCostThunk = createAsyncThunk(
  "course/updateCourseCostThunk",
  async ({ id, cost }: { id: string; cost: number }) => {
    try {
      const res = await updateCourseCost(id, cost);
      console.log("Add cost :", res.data);
      return res.data;
    } catch (error: any) {
      console.log("Sign up error:", error.response.data.error);
      return error.response.data.error;
    }
  },
);

// Create authentication slice
const CourseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMesage = action.payload;
    },
    resetMessages: (state) => {
      state.successMesage = null;
      state.error = null;
    },
    resetCurseState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // fetch courses cases
      .addCase(fetchCoursesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.successMesage = "Login successful";
      })
      .addCase(fetchCoursesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout cases
    builder
      .addCase(fetchCourseFromIllumidestThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseFromIllumidestThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCourseFromIllumidestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.successMesage = null;
      });

    // add courses cost
    builder
      .addCase(updateCourseCostThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseCostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCourse = action.payload;
        state.successMesage = action.payload.message;
      })
      .addCase(updateCourseCostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the reducer to be added to the store
export const { setErrorMessage, setSuccessMessage, resetCurseState, resetMessages } =
  CourseSlice.actions;
export default CourseSlice.reducer;
