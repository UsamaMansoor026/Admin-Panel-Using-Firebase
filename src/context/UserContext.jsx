import { createContext, useState } from "react";

const userDataFromLocalStorage = localStorage.getItem("user");
export const UserContext = createContext(userDataFromLocalStorage);

export const UserContextProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(userDataFromLocalStorage);

  const handleUserStatus = (user) => {
    const userData = JSON.stringify(user);
    localStorage.setItem("user", userData);
    setUserStatus(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserStatus(null);
  };

  return (
    <UserContext.Provider value={{ userStatus, handleUserStatus, logout }}>
      {children}
    </UserContext.Provider>
  );
};
