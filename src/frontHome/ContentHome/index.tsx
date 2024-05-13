import "./iindex.css";
import { useMediaPredicate } from "react-media-hook";
import { Articel } from "../../components/articel/articel";
import { IconChevronDown } from "@douyinfe/semi-icons";
import SocialButton from "../../components/buttons/socialButton";

const cardConfigs = [
  {
    title: "第15届蓝桥杯软件赛省赛Python大学B组经历分享",
    createTime: "2023-6-23",
    img: "",
    content:
      "前言 去年参加过14届的c/c++组，荣幸获得省四(doge)，其实当时还是挺失望的，一是没想到连个省三也没混上，然后指望水个奖来挽救一下英语挂科，最后在英语补考和准备比赛两件事上都没抓住哈哈哈，可能是低估去年的难度了，填空一个没对，大题只暴力了一个，分数大概是个位数。 所以，今年我跑来Python组了，说到底我还是比较讨厌算法的，抱着水一水的态度…",
  },
  {
    title: "第15届蓝桥杯软件赛省赛Python大学B组经历分享",
    img: "https://www.hackerxiao.online/wp-content/uploads/2024/04/屏幕截图-2024-04-29-202839.png",
    createTime: "2023-6-23",
    content:
      "前言 去年参加过14届的c/c++组，荣幸获得省四(doge)，其实当时还是挺失望的，一是没想到连个省三也没混上，然后指望水个奖来挽救一下英语挂科，最后在英语补考和准备比赛两件事上都没抓住哈哈哈，可能是低估去年的难度了，填空一个没对，大题只暴力了一个，分数大概是个位数。 所以，今年我跑来Python组了，说到底我还是比较讨厌算法的，抱着水一水的态度…",
  },
  {
    title: "第15届蓝桥杯软件赛省赛Python大学B组经历分享",
    img: "https://www.hackerxiao.online/wp-content/uploads/2024/04/屏幕截图-2024-04-29-202839.png",
    createTime: "2023-6-23",
    content:
      "前言 去年参加过14届的c/c++组，荣幸获得省四(doge)，其实当时还是挺失望的，一是没想到连个省三也没混上，然后指望水个奖来挽救一下英语挂科，最后在英语补考和准备比赛两件事上都没抓住哈哈哈，可能是低估去年的难度了，填空一个没对，大题只暴力了一个，分数大概是个位数。 所以，今年我跑来Python组了，说到底我还是比较讨厌算法的，抱着水一水的态度…",
  },
];

const socialConfigs = [
  {
    name: "QQ",
    url: "https://qm.qq.com/cgi-bin/qm/qr?k=VtBQ5sayA-LfE4Umu0Jc4ofcIi_9eaLv",
  },
  {
    name: "Github",
    url: "https://github.com/atopos31",
  },
  {
    name: "Juejin",
    url: "https://juejin.cn/user/1157118868073149",
  },
  {
    name: "Email",
    url: "mailto:hackerxiao@foxmail.com",
  },
];

const userInfo = {
  name: "Hackerxiao",
  avatar: "https://www.hackerxiao.online/wp-content/uploads/2023/09/head.jpg",
};

const ContentHome = () => {
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //跳转到文章部分
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 60,
      behavior: "smooth",
    });
  };
  return (
    <>
      {/*介绍和头像 */}
      <div
        className="home"
        style={
          biggerThan768
            ? {}
            : { flexDirection: "column", justifyContent: "center" }
        }
      >
        <div
          className="SayWords"
          style={biggerThan768 ? { order: 0 } : { order: 2 }}
        >
          <div
            style={
              biggerThan768 ? { fontSize: "2.5rem" } : { fontSize: "1.5rem" }
            }
          >
            <h1>
              Hi! <span className="wave">👋</span>
            </h1>
            <h1>
              I'm <span style={{ color: "#7880d1" }}>{userInfo.name}</span>
            </h1>
            <h3>A Web Developer</h3>
            <div className="Social">
              {socialConfigs.map((item) => (
                <SocialButton SocialName={item.name} url={item.url} />
              ))}
            </div>
          </div>
        </div>
        <img className="avatar" src={userInfo.avatar} />
        <IconChevronDown className="iconchevron" onClick={handleScrollDown} />
      </div>
      {/* 文章列表 */}
      <div className="articels">
        {cardConfigs.map((cardConfig, index) => (
          <Articel key={index} {...cardConfig} />
        ))}
      </div>
    </>
  );
};

export default ContentHome;
