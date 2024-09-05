import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const pretheme=localStorage.getItem("Theme");
  const [theme, settheme] = useState(`${pretheme}`);
  
  const triggerTheme = () => {
    if (theme == "light") {
      settheme("dark");
    } else {
      settheme("light");
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, triggerTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
