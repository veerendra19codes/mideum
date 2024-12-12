"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the shape of the user object
interface UserProps {
  id?: string;
  name?: string;
  username?: string;
  bio?: string;
  image?: string;
}

// Define the context shape
interface UserContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  fetchUserDetails: () => void;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Custom hook to access the UserContext
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

// Context provider component
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const session = useSession();

  const fetchUserDetails = async () => {
    try {
      // console.log("called:");
      const res = await axios.get(`/api/profile/${session?.data?.user?.id}`)
      // console.log("res:", res.data.user);

      setUser(res.data.user);
    } catch (error) {
      console.log("error in finding user details:", error);
    }
  }
  useEffect(() => {
    // console.log("session:", session);
    if (session.data) fetchUserDetails();
  }, [session.data])

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
