import { backend, endpoints } from "./api-client.config";

export const fetchCourses = async () => backend.get(endpoints.courses.root);

export const fetchCourseFromIllumidesk = async () => backend.get(`${endpoints.courses.root}/update-courses`);
export const updateCourseCost = async (id: string, cost: number) => backend.post(`${endpoints.courses.root}/${id}`, cost)