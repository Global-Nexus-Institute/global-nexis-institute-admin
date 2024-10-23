import axios from "axios";

import { baseEndpoint } from "../constants";
import { sign } from "crypto";

export const backend = axios.create({
  baseURL: baseEndpoint,
  headers: {
    Accept: "application/json",
  },
});

export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
  },
  users: {
    root: "/users",
  },

  courses: { root: "/courses" },
};
