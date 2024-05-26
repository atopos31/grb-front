import "./iindex.scss";
import { useMediaPredicate } from "react-media-hook";
import { Articel } from "../../components/articel/articel";
import { IconChevronDown } from "@douyinfe/semi-icons";
import SocialButton from "../../components/buttons/socialButton";
import { Card, Descriptions, Space, Tag } from "@douyinfe/semi-ui";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";

const cardConfigs = [
  {
    title: "测试",
    img: "https://www.hackerxiao.online/wp-content/uploads/2024/04/屏幕截图-2024-04-29-202839.png",
    createTime: "2023-6-23",
    content:
      "前言 大概在今年8月，我萌生了一个开发一个课表程序的想法，因为市面上的各种课表软件之类的，没办法做到和教务处数据实时同步，导入也是十分麻烦，尤其是查成绩，绩点之类的非常麻烦。所以，我的想法是做一个小程序或者APP，主要是具有一定的实用性，我觉得还是挺不错的。 竞赛 我用这个想法做了一套后端服务，主要是使用Go的开源http库resty和爬虫库col…",
  },
  {
    title: "测试",
    img: "https://www.hackerxiao.online/wp-content/uploads/2024/04/屏幕截图-2024-04-29-202839.png",
    createTime: "2023-6-23",
    content:
      "前言 大概在今年8月，我萌生了一个开发一个课表程序的想法，因为市面上的各种课表软件之类的，没办法做到和教务处数据实时同步，导入也是十分麻烦，尤其是查成绩，绩点之类的非常麻烦。所以，我的想法是做一个小程序或者APP，主要是具有一定的实用性，我觉得还是挺不错的。 竞赛 我用这个想法做了一套后端服务，主要是使用Go的开源http库resty和爬虫库col…",
  },
  {
    title: "测试",
    img: "https://www.hackerxiao.online/wp-content/uploads/2024/04/屏幕截图-2024-04-29-202839.png",
    createTime: "2023-6-23",
    content:
      "前言 大概在今年8月，我萌生了一个开发一个课表程序的想法，因为市面上的各种课表软件之类的，没办法做到和教务处数据实时同步，导入也是十分麻烦，尤其是查成绩，绩点之类的非常麻烦。所以，我的想法是做一个小程序或者APP，主要是具有一定的实用性，我觉得还是挺不错的。 竞赛 我用这个想法做了一套后端服务，主要是使用Go的开源http库resty和爬虫库col…",
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

const sitedata = [
  {
    key: "总访客",
    value: 1000,
  },
  {
    key: "浏览量",
    value: 23,
  },
  {
    key: "备案号",
    value: "辽ICP备2022010174号",
  },
];

const ContentHome = () => {
  const backgroundColor = "rgba(var(--semi-grey-5), .1) ";
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //跳转到文章部分
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 60,
      behavior: "smooth",
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
              欢迎呀! <span className="wave">👋</span>
            </h1>
            <h1>
              我是<span style={{ color: "#7880d1" }}>{userInfo.name}</span>
            </h1>
            <h3>一名Web开发者</h3>
            <div className="Social">
              {socialConfigs.map((item, index) => (
                <SocialButton
                  key={index}
                  SocialName={item.name}
                  url={item.url}
                />
              ))}
            </div>
          </div>
        </div>
        <img className="avatar" src={userInfo.avatar} />
        <IconChevronDown className="iconchevron" onClick={handleScrollDown} />
      </div>
      <div className="content" style={{ width: "100%" }}>
        {/* 文章列表 */}
        <div className="articels">
          {cardConfigs.map((cardConfig, index) => (
            <Articel key={index} {...cardConfig} />
          ))}
        </div>
        <div className="infos">
          <div className="cate-card">
            <Card title="标签" style={{ backgroundColor: backgroundColor }}>
              <Space wrap>
                {[
                  "amber",
                  "blue",
                  "cyan",
                  "green",
                  "grey",
                  "indigo",
                  "light-blue",
                  "light-green",
                  "lime",
                  "orange",
                  "pink",
                  "purple",
                  "red",
                  "teal",
                  "violet",
                  "yellow",
                  "white",
                ].map((item) => (
                  <Tag color={item as TagColor} key={item}>
                    {" "}
                    {item}{" "}
                  </Tag>
                ))}
              </Space>
            </Card>
          </div>
          <div className="cate-card" style={{ top: "85px" }}>
            <Card title="分类" style={{ backgroundColor: backgroundColor }}>
              <Space wrap>
                {[
                  "测试",
                  "技术",
                  "cyan",
                  "green",
                  "grey",
                  "indigo",
                  "light-blue",
                  "light-green",
                  "lime",
                  "orange",
                  "pink",
                  "purple",
                  "red",
                  "teal",
                  "violet",
                  "yellow",
                  "white",
                ].map((item,index) => (
                  <Tag
                  color='light-blue'
                    className="info-tag"
                    size="large"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      console.log(item);
                    }}
                    key={index}
                  >
                    {item}
                  </Tag>
                ))}
              </Space>
            </Card>
          </div>
          <div className="site">
            <Card title="站点信息" style={{ backgroundColor: backgroundColor }}>
              <Descriptions data={sitedata} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHome;
