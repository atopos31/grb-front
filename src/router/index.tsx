import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import ContentHome from "../frontHome/ContentHome";
import Console from "../console";
import ConsoleHome from "../console/home";
import ArticleEditor from "../console/ArticleEditor";
import ArticleManage from "../console/ArticleManage";
import Login from "../console/Login/login";
import About from "../frontHome/About";
import CategoryManage from "../console/CateManage";
import TagManage from "../console/TagManage";
import { lazy, Suspense } from "react";
import { Spin } from "@douyinfe/semi-ui";
import ArticelView from "../frontHome/ArticelView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        //首页
        index: true,
        element: <ContentHome />,
      },
      {
        //关于
        path: "about",
        element: <About />,
      },
      {
        //文章页 uuid对应文章id
        path: "article/:uuid",
        element: <ArticelView/>,
      },
    ],
  },
  {
    path: "/console",
    //TODO 鉴权 利用守卫路由
    element: <Console />,
    children: [
      {
        index: true,
        element: <ConsoleHome />,
      },
      {
        path: "article",
        children: [
          // 设置不同的key可以让路由切换时重新加载渲染
          {
            path: "editor/:euuid",
            element: <ArticleEditor key="editor" />,
          },
          {
            path: "editor",
            element: <ArticleEditor key="new" />,
          },
          {
            path: "manage",
            element: <ArticleManage />,
          },
        ],
      },
      {
        path: "tags",
        element: <TagManage />,
      },
      {
        path: "categories",
        element: <CategoryManage />,
      },
    ],
  },
  {
    path: "/console/login",
    element: <Login />,
  },
]);

export default router;
