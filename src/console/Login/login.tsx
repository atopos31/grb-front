import { useEffect, useState } from "react";
import { GetDefaultThemeIsdark } from "../../utils/theme";
import "./login.css";
import { Button, Input, Radio, Toast } from "@douyinfe/semi-ui";
import { LoginUser } from "../../request/req_user";
import { setToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";
const defultTheme = GetDefaultThemeIsdark();
const usernameKey = "username";
const passwordKey = "password";
const Login = () => {
  //全局黑暗 白天模式切换
  const [isDark, _setDark] = useState<boolean>(defultTheme);
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

  useEffect(() => {
    const username = localStorage.getItem(usernameKey);
    const password = localStorage.getItem(passwordKey);
    if (username && password) {
      setUsername(username);
      setPassword(password);
      setRememberPass(true);
    }
  }, []);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberPass, setRememberPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const res: any = await LoginUser(username, password);
    if (res.code == 200) {
      Toast.success({ content: "登录成功" });
      setToken(res.data);
      if (rememberPass) {
        localStorage.setItem(usernameKey, username);
        localStorage.setItem(passwordKey, password);
      } else {
        localStorage.removeItem(usernameKey);
        localStorage.removeItem(passwordKey);
      }
      navigate("/console");
    } else if (res.code == 402) {
      Toast.error({ content: "账号或密码错误" });
    } else {
      Toast.error({ content: "服务器错误" });
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <p style={{ height: 100, fontSize: 30 }}>GRB后台管理系统</p>
        <Input
          placeholder="用户名"
          size="large"
          value={username}
          onChange={(value) => {
            setUsername(value);
          }}
        ></Input>
        <br></br>
        <Input
          placeholder="密码"
          size="large"
          mode="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
        ></Input>
        <br></br>
        <Radio
          name="demo-radio"
          mode="advanced"
          checked={rememberPass}
          onChange={(e) => {
            setRememberPass(e.target.checked);
          }}
        >
          记住密码
        </Radio>
        <br></br>

        <Button
          onClick={() => {
            handleLogin();
          }}
        >
          登录
        </Button>
      </div>
    </div>
  );
};

export default Login;
