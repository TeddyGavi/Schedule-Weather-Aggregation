import axios from 'axios';
import React, { FC, ReactNode, createContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  async function signIn(email: string, password: string, cb: () => void) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BE_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      setIsUserLoggedIn(() => true);
      cb();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function isLoggedIn(cb: () => void) {
    try {
      await axios.get(`${import.meta.env.vite_be_base_url}/auth/validate`, {
        withCredentials: true,
      });
      setIsUserLoggedIn(() => true);
      cb();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function logout(cb: () => void) {
    try {
      await axios.get(`${import.meta.env.vite_be_base_url}/auth/validate`, {
        withCredentials: true,
      });
      setIsUserLoggedIn(() => false);
      cb();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const value = { isUserLoggedIn, isLoggedIn, signIn, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
