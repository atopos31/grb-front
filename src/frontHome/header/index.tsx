import { IconMenu, IconSearch } from "@douyinfe/semi-icons";
import { Button, Nav } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import useIsAtTop from "./until";
import Switch from "../../components/buttons/Switch";
import "./header.css"
interface HeadProps {
  setDark: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isDark: boolean;
  setVisible: (value: ((prevState: boolean) => boolean) | boolean) => void;
  visible: boolean;
}

const Head = ({ setDark, isDark,setVisible }: HeadProps) => {
  //路由跳转
  const navigate = useNavigate();
  //移动端适配
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");

  //滚动栏是否处于顶部
  const isAtTop = useIsAtTop();
  //开启状态栏
  const onSide = () => {
    setVisible(true);
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
            backgroundColor: "rgba(var(--semi-grey-1), 0.85)",
            border: isAtTop ? "none" : "",
          }}
          mode={"horizontal"}
          items={
            biggerThan768
              ? [
                  { itemKey: "/", text: "首页" },
                  { itemKey: "/comments", text: "留言板" },
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
                  onClick={onSide}
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

    </div>
  );
};
export default Head;
