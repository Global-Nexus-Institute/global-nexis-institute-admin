import { useAppDispatch, useAppSelector } from "@/lib/store/store.hooks";
import { useRouter } from "next/navigation";
import {
  loginUserThunk,
  logoutUserThunk,
  setAuthUser,
  setLoginError,
  signupUserThunk,
} from "@/lib/features/slices/auth.slice";
import { useEffect, useState } from "react";
import {
  User,
  getAuth,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { RootState } from "@/lib/store/store";
import { UserCreateType } from "@/shared/types";
import { login, logout } from "@/shared/api/auth.api";
export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [session, setSession] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<
    "loading" | "unauthenticated" | "authenticated"
  >("loading");

  const authState = useAppSelector((store: RootState) => store.auth);

  const loginUser = async (email: string, password: string) => {
    setLoginLoading(true);
    await dispatch(loginUserThunk({ email, password })).finally(() => {
      setLoginLoading(false);
    });
  };

  // keep user signed in
  const signedInUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        const store = {
          UID: user.uid,
          email: user.email as string,
          displayName: user.displayName as string,
        };
        user.getIdToken(true).then(async (token) => {
          // console.log("🚀 ~ user.getIdToken ~ token:", user);
          try {
            const profileDataResponse = await login(token);
            if (profileDataResponse.data.statusCode != 200) {
              logout();
              setLoginError(
                `Login error. ${profileDataResponse.data.message ?? ""}`,
              );
            } else {
              //login complete and ok
              setSession(user);
              localStorage.setItem("LOCAL_USER_TOKEN", token);
              const authUser = profileDataResponse.data.data;
              dispatch(setAuthUser(authUser));
              setAuthStatus("authenticated");
            }
          } catch (error: any) {
            logout();
            setLoginError(`Login error. ${error?.message ?? ""}`);
          }
        });
      } else {
        setAuthStatus("unauthenticated");
        setSession(null);
        localStorage.removeItem("LOCAL_USER_TOKEN");
      }
    });
  };

  useEffect(() => {
    signedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed out or session is expired, handle logout
        logout();
        console.log("User is signed out or session expired");
        // User will be redirected to login
      }
    });

    return () => unsubscribe();
  }, []);

  const logOutUser = async () => {
    dispatch(logoutUserThunk()).finally(() => {
      console.log("Logged out");
    });
  };

  const createUser = async (user: UserCreateType) => {
    await dispatch(signupUserThunk(user));
  };

  return {
    loginLoading,
    authStatus,
    session,
    signedInUser,
    loginUser,
    logOutUser,
    createUser,
  };
};
