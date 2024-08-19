"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const { createContext, useState, useContext } = require("react");
const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";
const LOCAL_STORAGE_KEY = "is-logged-in";
const LOCAL_USERNAME_KEY = "username";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedAuthStatus) {
      const storedAuthStatusInt = parseInt(storedAuthStatus);
      setIsAuthenticated(storedAuthStatusInt === 1);
    }
  }, []);

  const login = (username: string) => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");

    if (username) {
      localStorage.setItem(LOCAL_USERNAME_KEY, username);
      setUsername(username);
    } else {
      localStorage.removeItem(LOCAL_USERNAME_KEY);
    }

    const nextUrl = searchParams.get("next");

    if (
      nextUrl &&
      nextUrl.startsWith("/") &&
      !["/login", "/logout"].includes(nextUrl)
    ) {
      router.replace(nextUrl);
    } else {
      router.replace(LOGIN_REDIRECT_URL);
    }
  };

  const logout = () => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const loginRequiredRedirect = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`;

    if (LOGIN_REQUIRED_URL === pathname) {
      loginWithNextUrl = `${LOGIN_REQUIRED_URL}`;
    }

    router.replace(loginWithNextUrl);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loginRequiredRedirect }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
