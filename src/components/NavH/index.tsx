import { IconSemiLogo } from "@douyinfe/semi-icons";
import { Avatar, Dropdown, Nav } from "@douyinfe/semi-ui";
import Switch from "../buttons/Switch";
import { useMediaPredicate } from "react-media-hook";

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

  return (
    <Nav
      mode={"horizontal"}

      onSelect={(key) => console.log(key)}
      header={{
        logo: <IconSemiLogo style={{ height: "36px", fontSize: 36 }} />,
        text: biggerThan768 ? "GRB后台管理" :  "",
        link: "/console",
      }}
      footer={
        <>
        <div className="drop" style={{marginRight:10}}>
        <Dropdown
            render={
              <Dropdown.Menu>
                <Dropdown.Item>详情</Dropdown.Item>
                <Dropdown.Item>退出</Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <Avatar size="small" color="light-blue" style={{ margin: 4 }}>
              BD
            </Avatar>
            <span>Bytedancer</span>
          </Dropdown>
        </div>

          <Switch handleModeSwitch={switchMode} isDarkMode={isDark} />
        </>
      }
    />
  );
};

export default NavH;
