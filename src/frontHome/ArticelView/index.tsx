import MarkDown from "../../components/MarkDown";
import "./articel.scss";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { Cover } from "../../components/articel/articel";
import { useMediaPredicate } from "react-media-hook";
import "markdown-navbar/dist/navbar.css";
import "./navbar.css";
import { useParams } from "react-router-dom";
import { MdCatalog } from "md-editor-rt";

const ArticelView = () => {
  const [content, setContent
  ] = useState("");
  const isDark = useContext(ThemeContext);
  //测试文章
  const textContent = `
## 项目简介
本项目后端使用gin、gorm和ssh、sftp开发。旨在编写一个轻量，易用，多平台的运维项目。
前端使用react、typescript、vite构建。
现阶段目的是做一个阉割版的xshell并简单的实现ansible或者saltstack的部分功能。

### 目前已经实现的功能
- 隧道, 类似ssh的-L和-R
- cron任务和长进程的管理
- ssh命令批量执行
- 文件批量的上传 流式传输支持大文件
- 基于sftp文件浏览器
\`\`\`js
console.log("hello world");
//测试
\`\`\`
![](https://www.hackerxiao.online/wp-content/uploads/2023/09/head.jpg)

### 查看前端代码请移步到

### 查看后端代码请移步到`;
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //获取文章id
  const {uuid} = useParams();
  useEffect(() => {
    console.log(uuid);
    //向后端获取文章内容
    setContent(textContent);
  }, []);


  const [id] = useState('preview-only');
  const [scrollElement] = useState(document.documentElement);

  return (
    <div className="articleview">
      <div
        className="head"
        style={biggerThan768 ? { width: "80%" } : { width: "90%" }}
      >
        <Cover
          title={"ceshi"}
          createTime={"2023.4.5"}
          img={
            "https://www.hackerxiao.online/wp-content/uploads/2024/04/屏幕截图-2024-04-29-202839.png"
          }
        ></Cover>
      </div>
      <div
        className="article"
        style={biggerThan768 ? { width: "80%" } : { width: "90%" }}
      >
        <div
          className="content"
          style={biggerThan768 ? { width: "80%" } : { width: "100%" }}
        >
          <MarkDown textContent={content} darkMode={isDark}></MarkDown>
        </div>
        {biggerThan768 && (
          <div
            className="nav"
          >
            <MdCatalog editorId={id} scrollElement={scrollElement} scrollElementOffsetTop={80}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticelView;
