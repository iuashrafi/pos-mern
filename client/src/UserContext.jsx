import { createContext, useEffect, useState } from "react";
import fetchAPI from "./lib/fetchAPI";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchAPI("/auth/profile", {
      method: "GET",
    })
      .then((data) => {
        setUser(data);
        setReady(true);
      })
      .catch((error) => {
        console.error("Error while fetching user state:", error);
      });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
