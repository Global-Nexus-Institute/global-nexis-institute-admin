import { useAppDispatch } from "@/lib/store/store.hooks";

import {
  getUsersThunk,
  updateUserThunk,
  resetUserStateMessages,
  getStudentsThunk,
  getStaffThunk,
} from "@/lib/features/slices/users/users.slice";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const getUsers = async () => {
    await dispatch(getUsersThunk()).finally(() => {
      dispatch(resetUserStateMessages());
    });
  };

  const getStudents = async () => {
    await dispatch(getStudentsThunk()).finally(() => {
      dispatch(resetUserStateMessages());
    });
  };

  const getStaff = async () => {
    await dispatch(getStaffThunk()).finally(() => {
      dispatch(resetUserStateMessages());
    });
  };

  const updateUser = async (id: string, data: any) => {
    await dispatch(updateUserThunk({ id, data })).finally(() => {
      dispatch(resetUserStateMessages());
    });
  };

  return { getUsers, getStudents, getStaff, updateUser };
};
