import "./footer.scss";

interface badge {
  nameLeft: string;
  nameRight: string;
  href: string;
  logo: string;
  colorRight: string;
}

const Footer = () => {
  const badges: badge[] = [
    {
      nameLeft: "前端框架",
      nameRight: "React v18.3.1",
      href: "https://react.dev/",
      logo: "typescript",
      colorRight: "rgb(88 196 220)",
    },
    {
      nameLeft: "后端框架",
      nameRight: "Gin v1.10.1",
      href: "https://gin-gonic.com/zh-cn/",
      logo: "go",
      colorRight: "rgb(88 196 220)",
    },
    {
      nameLeft: "构建工具",
      nameRight: "Vite v5.2.11",
      href: "https://cn.vitejs.dev/",
      logo: "vite",
      colorRight: "blue",
    },
    {
      nameLeft: "托管于",
      nameRight: "华为云",
      href: "https://www.huaweicloud.com/",
      logo: "huawei",
      colorRight: "red",
    },
    {
      nameLeft: "对象存储",
      nameRight: "七牛云",
      href: "https://marketing.qiniu.com/",
      logo: "minio",
      colorRight: "blue",
    },
    {
      nameLeft: "",
      nameRight: "Github开源地址",
      href: "https://github.com/atopos31/grb-front",
      logo: "github",
      colorRight: "black",
    },
  ];

  return (
    <div className="footer">
      <p className="content">@2022-2024 All Rights Reserved</p>
      <div
        className="badge"
      >
        {/* 了解更多，访问https://shields.io */}
        {badges.map((badge) => (
          <a href={badge.href}>
            <img
              alt="Static Badge"
              src={`https://img.shields.io/badge/${badge.nameLeft}-${badge.nameRight}-${badge.colorRight}?logo=${badge.logo}`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
