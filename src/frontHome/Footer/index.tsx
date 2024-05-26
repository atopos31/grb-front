import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <p className="content">@2022-2024 All Rights Reserved</p>
      <div
        className="badge"
        style={{
          padding: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="https://react.dev/">
          <img
            alt="Static Badge"
            src="https://img.shields.io/badge/前端框架-React v18.3.1-rgb(88 196 220)?logo=typescript"
          />
        </a>

        <a href="https://gin-gonic.com/zh-cn/">
          <img
            alt="Static Badge"
            src="https://img.shields.io/badge/后端框架-Gin v1.10.1-rgb(88 196 220)?logo=go"
          />
        </a>
        <a href="https://cn.vitejs.dev/">
          <img
            alt="Static Badge"
            src="https://img.shields.io/badge/构建工具-Vite v5.2.11 -blue?logo=vite"
          />
        </a>
        <a href="https://activity.huaweicloud.com/">
          <img
            alt="Static Badge"
            src="https://img.shields.io/badge/托管于-华为云-red?logo=huawei"
          />
        </a>
        <a href="https://marketing.qiniu.com/">
          <img
            alt="Static Badge"
            src="https://img.shields.io/badge/对象存储-七牛云-blue?logo=minio"
          />
        </a>

        <a href="https://github.com/atopos31/grb-front">
          <img
            alt="Static Badge"
            src="https://img.shields.io/badge/Github开源地址-black?logo=github"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
