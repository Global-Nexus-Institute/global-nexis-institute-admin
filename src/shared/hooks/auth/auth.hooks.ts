import { useAppDispatch, useAppSelector } from "@/lib/store/store.hooks";
import { useRouter } from "next/navigation";
import {
  loginUserThunk,
  logoutUserThunk,
  signupUserThunk,
} from "@/lib/features/slices/auth.slice";
import { useState } from "react";
import { User } from "firebase/auth";
import { RootState } from "@/lib/store/store";
import { UserCreateType } from "@/shared/types";
export const useAuth = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loginLoading, setLoginLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [session, setSession] = useState<User | null>(null);
    const [authStatus, setAuthStatus] = useState<
        "loading" | "unauthenticated" | "authenticated"
    >("loading");

    const authState =  useAppSelector((store: RootState) => store.auth);

    const loginUser = async (email: string, password: string) => {
        setLoginLoading(true);
        await dispatch(loginUserThunk({email, password})).finally(() => {
            setLoginLoading(false)
        });
    }

    const logOutUser = async () => {
        dispatch(logoutUserThunk()).finally(() => {
            console.log("Logged out");
        });
    }

    const createUser = async (user: UserCreateType) => {
      await dispatch(signupUserThunk(user));
    };

    return {
        loginLoading,
        
        loginUser,
        logOutUser,
        createUser,
    }
}