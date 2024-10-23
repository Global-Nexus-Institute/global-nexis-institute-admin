import {backend, endpoints } from "./api-client.config";

export const getUsers = () => backend.get(endpoints.users.root);

export const updateUser = (id: string, data: any) => backend.put(`${endpoints.users.root}/${id}`, data);