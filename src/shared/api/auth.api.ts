import { UserCreateType } from "../types";
import { backend, endpoints } from "./api-client.config";

export const login = (token: string) =>
  backend.post(endpoints.auth.login, { token });

export const logout = () => backend.get(endpoints.auth.logout);

export const signup = (user: UserCreateType) =>
  backend.post(endpoints.auth.signup, {user: user});
