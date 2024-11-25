import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [currTheme, setCurrTheme] = useState("light");

  const handleTheme = () => {
    if (currTheme === "light") {
      setCurrTheme("dark");
    } else {
      setCurrTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ currTheme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
