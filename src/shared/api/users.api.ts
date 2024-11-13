import {backend, endpoints } from "./api-client.config";

export const getUsers = () => backend.get(endpoints.users.root);
export const getStudents = () => backend.get(`${endpoints.users.root}/students`);
export const getStaffs = () => backend.get(`${endpoints.users.root}/staff`);

export const updateUser = (id: string, data: any) => backend.put(`${endpoints.users.root}/${id}`, data);