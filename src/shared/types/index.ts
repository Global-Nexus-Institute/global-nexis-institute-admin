export type UsersDataType = {
  _id: string;
  id: number;
  names: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type UserCreateType = {
  name: string;
  email: string;
  password: string;
  role: string;
  phonneNumber: string;
  profileImage?: string;
  address?: {
    city: string;
    country: string;
    street?: string;
    zipCode?: string;
  };
};

export type CoursesDataType = {
  _id: string; // 6116712193d255e2f7dfbd28cbe
  uuid: string; // 8f1b2e19-3d3f-4740-bb93-d1da991b6969
  name: string; // Data Science: Intermediaire
  slug: string; // data-science-intermediaire
  short_intro: string; // Explore advanced topics in data science, including machine learning and statistical analysis, at our intermediate level campus.
  is_featured: boolean; // false
  lesson_count: number; // 21
  student_count: number; // 11
  activity_count: number; // 110
  main_image: string; // https://prod-illumidesk-api-media-ueef29.s3.amazonaws.com/campuses/611abe06-3ac9-4a6f-81dc-f2abcb084623/2.jpg
  cost?: number; // 0
};

export type CourseDTO = {
  _id: string;
  uuid: string;
  name: string;
  slug: string;
  short_intro: string;
  is_featured: boolean;
  lesson_count: number;
  student_count: number;
  activity_count: number;
  main_image: string;
  cost: number;
};
