// features/slice/auth.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "../../firebase";
import { login, logout, signup } from "@/shared/api/auth.api";
import { UserCreateType, UsersDataType } from "@/shared/types";
import { act } from "react";

interface AuthState {
  user: UsersDataType | null;
  loading: boolean;
  successMesage: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  successMesage: null,
  error: null,
};

// const auth = getAuth();
// Thunk for login
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // Firebase sign-in
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("Login user:", user, auth);

      // Get the Firebase token
      const token = await user.getIdToken();

      // Send the token to Flask backend
      const response = await login(token);

      if (response.status == 200) {
        // take action on sucessfull login
        localStorage.setItem("LOCAL_USER_TOKEN", token);
      }

      return response.data; // Handle response from Flask (e.g., user data or session)
    } catch (error: any) {
      console.log("Login error:", error);
      return rejectWithValue(error.message);
    }
  },
);

// Thunk for logout
export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUserThunk",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth); // Sign out from Firebase
      // Optionally, notify the Flask backend about the logout
      await logout();
      localStorage.removeItem("LOCAL_USER_TOKEN");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);


// Thunk sign up
export const signupUserThunk = createAsyncThunk(
  "auth/signupUserThunk",
  async (data: UserCreateType, { rejectWithValue }) => {
    try {
      const userCredential = await signup(data);
      const user = userCredential.data;
      console.log("Sign up user:", user);
      return user;
    } catch (error: any) {
      console.log("Sign up error:", error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  },
);

// Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginError: (state, action) => {
      state.error = action.payload;
    },
    setLoginSuccess: (state, action) => {
      state.successMesage = action.payload;
    },
    setAuthUser: (state, { payload }: PayloadAction<UsersDataType>) => {
      state.user = payload as UsersDataType;
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // You can store user info returned from Flask
        state.successMesage = "Login successful";
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.successMesage = null;
      });
    // signup cases
    builder
      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMesage = action.payload.message;
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthState, setAuthUser, setLoginError, setLoginSuccess } = authSlice.actions;
// Export the reducer to be added to the store
export default authSlice.reducer;
