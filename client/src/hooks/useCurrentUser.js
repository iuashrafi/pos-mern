import { useContext } from "react";
import { UserContext } from "../UserContext";
export const useCurrentUser = (getObj = false) => {
  // Note: UserContext contains - { user, setUser, ready }
  const user = useContext(UserContext);
  if (getObj) {
    // if we want the full UserContext object
    return user;
  }

  return user ? user.user : null;
};
