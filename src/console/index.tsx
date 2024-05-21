import { useEffect, useState } from "react";
import { ThemeContext } from "../App";
import { Outlet } from "react-router-dom";
import "./index.css";
import NavH from "../components/NavH";
import NavV from "../components/NavV";

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

const Console = () => {
  //全局黑暗 白天模式切换
  const [isDark, setDark] = useState(defultTheme);

  //当isdark发生变化时改变背景颜色
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
      <div className="consoleHome">
        <NavH setDark={setDark} isDark={isDark}/>
        <div className="console-main">
          <NavV />
          <Outlet />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Console;
