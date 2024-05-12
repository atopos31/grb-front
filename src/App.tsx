import { Outlet } from "react-router-dom";
import Head from "./frontHome/header";
import "./App.css";
import { useEffect, useState } from "react";
import React from "react";

//主題上下文 全局可以获取到
const ThemeContext = React.createContext(false);

export function App() {
  //全局黑暗 白天模式切换
  const [isDark, setDark] = useState(true);
  //当isdark发生变化时改变背景颜色
  useEffect(() => {
    if (isDark) {
      document.body.setAttribute("theme-mode", "dark");
    } else {
      document.body.removeAttribute("theme-mode");
    }
    return () => {};
  }, [isDark]);
  return (
    <ThemeContext.Provider value={isDark}>
      <>
        <Head setDark={setDark} isDark={isDark} />
        <Outlet />
      </>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
