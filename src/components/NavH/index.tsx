import { IconSemiLogo } from "@douyinfe/semi-icons";
import { Avatar, Dropdown, Nav, Toast } from "@douyinfe/semi-ui";
import Switch from "../buttons/Switch";
import { useMediaPredicate } from "react-media-hook";
import { useEffect, useState } from "react";
import { GetUserInfo } from "../../request/req_user";
import { useNavigate } from "react-router-dom";

interface NavHprops {
  setDark: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isDark: boolean;
}

const NavH = ({ setDark, isDark }: NavHprops) => {
  //移动端适配
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //主题切换
  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      setDark(false);
    } else {
      setDark(true);
    }
  };
  const navigate = useNavigate();


  const [username,setUsername] = useState("")
  const [avatar,setAvatar] = useState("")
  const getUserInfo = async ()=>{
    const res:any = await GetUserInfo()
    if(res.code === 200){
      setUsername(res.data.username)
      setAvatar(res.data.avatar)
    } else {
      Toast.error("获取个人信息失败")
    }
  }
  useEffect(()=>{
    getUserInfo()
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    location.href = "/console/login"
  }

  return (
    <Nav
      mode={"horizontal"}
      onSelect={(key) => console.log(key)}
      header={{
        logo: <IconSemiLogo style={{ height: "36px", fontSize: 36 }} />,
        text: biggerThan768 ? "GRB后台管理" : "",
        link: "javascript:void(0);",
        linkOptions: {onClick:()=>{navigate("/console")}},
      }}
      footer={
        <>
          <div className="drop" style={{ marginRight: 10 }}>
            <Dropdown
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>退出登录</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Avatar src={avatar} size="small" color="light-blue" style={{ margin: 4 }}>
              </Avatar>
              <span>{username}</span>
            </Dropdown>
          </div>

          <Switch handleModeSwitch={switchMode} isDarkMode={isDark} />
        </>
      }
    />
  );
};

export default NavH;
