import axios from 'axios';
import { ReactNode, createContext, useState } from 'react';
interface AuthContextProps {
  isUserLoggedIn: boolean;
  isLoggedIn: () => Promise<void>;
  signIn: (email: string, password: string, cb: () => void) => Promise<void>;
  logOut: (cb: () => void) => Promise<void>;
}
const initProps: AuthContextProps = {
  isUserLoggedIn: false,
  isLoggedIn: async (): Promise<void> => {},
  signIn: async (
    email: string = '',
    password: string = '',
    cb: () => void,
  ): Promise<void> => {
    console.log(email, password);
    cb();
  },
  logOut: async (cb: () => void): Promise<void> => {
    cb();
  },
};

export const AuthContext = createContext(initProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  async function signIn(
    email: string,
    password: string,
    cb: () => void,
  ): Promise<void> {
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
      throw error;
    }
  }

  async function isLoggedIn(): Promise<void> {
    try {
      await axios.get(`${import.meta.env.VITE_BE_BASE_URL}/auth/validate`, {
        withCredentials: true,
      });
      setIsUserLoggedIn(() => true);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function logOut(cb: () => void): Promise<void> {
    try {
      await axios.get(`${import.meta.env.VITE_BE_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      setIsUserLoggedIn(() => false);
      cb();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const value = { isUserLoggedIn, isLoggedIn, signIn, logOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
