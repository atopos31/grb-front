import { IconMenu, IconSearch } from "@douyinfe/semi-icons";
import { Button, Nav, SideSheet } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import useIsAtTop from "./until";
import Switch from "../../components/buttons/Switch";
import "./header.css"
interface HeadProps {
  setDark: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isDark: boolean;
}

const Head = ({ setDark, isDark }: HeadProps) => {
  //路由跳转
  const navigate = useNavigate();
  //移动端适配
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //侧边栏是否显示
  const [visible, setVisible] = useState(false);
  //滚动栏是否处于顶部
  const isAtTop = useIsAtTop();
  //开启/关闭状态栏
  const change = () => {
    setVisible(!visible);
  };
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
    <div
      className="container"
    >
      <div className="Navf"
      >
        <Nav
          style={{
            borderRadius: "20px",
            padding: "10px",
            //不在顶的时候 改变状态 透明 边框为空
            background: isAtTop ? "transparent" : "",
            border: isAtTop ? "none" : "",
          }}
          mode={"horizontal"}
          items={
            biggerThan768
              ? [
                  { itemKey: "/", text: "首页" },
                  { itemKey: "/about", text: "关于" },
                ]
              : undefined
          }
          onSelect={(key) => navigate(key.itemKey.toString())}
          header={
            <div className="NavHeader"
            >
              {biggerThan768 ? undefined : (
                <Button
                  onClick={change}
                  type="tertiary"
                  style={{ background: "transparent" }}
                  icon={<IconMenu />}
                ></Button>
              )}
              <a
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => navigate("/")}
              >
                星空未来的个人博客
              </a>
            </div>
          }
          footer={
            <>
              <Button
                style={{ borderRadius: "20px", marginRight: 10 }}
                type="tertiary"
                icon={<IconSearch />}
              >
                {biggerThan768 ? "搜索文章" : undefined}
              </Button>

              <Switch handleModeSwitch={switchMode} isDarkMode={isDark} />
            </>
          }
        />
      </div>
      {/* 侧边栏 */}
      <SideSheet
        title="星空未来的个人博客"
        visible={visible}
        onCancel={change}
        placement="left"
        width={270}
      >
        <p>分类</p>
        <p>关于</p>
      </SideSheet>
    </div>
  );
};
export default Head;
