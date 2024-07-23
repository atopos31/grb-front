import { Outlet, useLocation } from "react-router-dom";
import Head from "./frontHome/Header";
import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import Footer from "./frontHome/Footer";
import { GetDefaultThemeIsdark } from "./utils/theme";

const defultTheme = GetDefaultThemeIsdark()
//主題上下文 全局可以获取到
export const ThemeContext = React.createContext(defultTheme);

export function App() {
  //全局黑暗 白天模式切换
  const [isDark, setDark] = useState<boolean>(defultTheme);

  const loaction = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0)
  },[loaction])


  //当isdark发生变化时全局改变背景颜色
  useEffect(() => {
    if (isDark) {
      document.body.setAttribute("theme-mode", "dark");
      window.localStorage.setItem("theme-mode", "dark");
    } else {
      document.body.removeAttribute("theme-mode");
      window.localStorage.setItem("theme-mode", "light");
    }
  }, [isDark]);
  return (
    <ThemeContext.Provider value={isDark}>
      <>
        {/* 顶部栏 */}
        <Head setDark={setDark} isDark={isDark} />
        {/* 子路由切换 */}
        <Outlet />
        {/* 底部栏 TODO 由后端传入底部栏信息 */}
        <Footer />
      </>
    </ThemeContext.Provider>
  );
}

