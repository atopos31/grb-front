import { Outlet } from "react-router-dom";
import Head from "./frontHome/Header";
import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import Footer from "./frontHome/Footer";

//用户初次访问 使用系统主题
const SysDefultTheme = window.matchMedia("(prefers-color-scheme: light)")
  .matches
  ? false
  : true;

//如果访问过 有记录的话 优先用户的选择
const localDefultTheme = localStorage.getItem("theme-mode");
const defultTheme = localDefultTheme
  ? localDefultTheme === "dark"
  : SysDefultTheme;
//主題上下文 全局可以获取到
const ThemeContext = React.createContext(defultTheme);

export function App() {
  //全局黑暗 白天模式切换
  const [isDark, setDark] = useState(defultTheme);

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

export { ThemeContext };
