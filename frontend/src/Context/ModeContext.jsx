/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("mode", mode);
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [mode]);
  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ModeContext.Provider value={{ toggleMode, mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) throw new Error("useMode must be used within a ModeProvider");
  return context;
}
