import { ReactNode, createContext, useState } from 'react';
import axiosInstance from '../fetching/axios-config';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
interface AuthContextProps {
  isUserLoggedIn: boolean | IUser;
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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | IUser>(false);

  async function signIn(
    email: string,
    password: string,
    cb: () => void,
  ): Promise<void> {
    try {
      await axiosInstance.post(`/auth/login`, {
        email,
        password,
      });

      setIsUserLoggedIn(true);
      cb();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function isLoggedIn(): Promise<void> {
    try {
      const user: IUser = await axiosInstance.get(`/users/profile`);
      setIsUserLoggedIn(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function logOut(cb: () => void): Promise<void> {
    try {
      await axiosInstance.get(`/auth/logout`);
      setIsUserLoggedIn(false);
      cb();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const value = {
    isUserLoggedIn,
    setIsUserLoggedIn,
    isLoggedIn,
    signIn,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
