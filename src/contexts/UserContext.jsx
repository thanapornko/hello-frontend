import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const addUser = newUser => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };
  return (
    <UserContext.Provider
      value={{
        addUser
      }}>
      {children}
    </UserContext.Provider>
  );
}
