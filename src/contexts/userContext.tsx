"use client";

import { UserType } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

// Define the context shape
interface UserContextProps {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
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
  const [user, setUser] = useState<UserType | null>(null);
  const session = useSession();

  const fetchUserDetails = useCallback(async () => {
    try {
      // console.log("called:");
      const res = await axios.get(`/api/profile/${session?.data?.user?.id}`)
      // console.log("res:", res.data.user);

      setUser(res.data.user);
    } catch (error) {
      console.log("error in finding user details:", error);
    }
  }, [session?.data?.user?.id]);

  useEffect(() => {
    // console.log("session:", session);
    if (session.data) fetchUserDetails();
  }, [session.data, fetchUserDetails])

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
