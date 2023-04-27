import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";
import * as authApi from "../apis/authApi";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from "../utils/localStorage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] =
    useState(
      getAccessToken() ? jwtDecode(getAccessToken()) : null
    );

  const login = async (email, password) => {
    const res = await authApi.login({
      email,
      password
    });
    setAccessToken(res.data.accessToken);
    setAuthenticatedUser(jwtDecode(res.data.accessToken));
  };

  const logout = () => {
    removeAccessToken();
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
}
