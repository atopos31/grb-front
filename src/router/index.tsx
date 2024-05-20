import {createBrowserRouter} from "react-router-dom";
import {App} from "../App";
import ContentHome from "../frontHome/ContentHome";
import ArticelView from "../frontHome/ArticelView";
import Console from "../console";
import ConsoleHome from "../console/home";
import ArticleEditor from "../console/ArticleEditor";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                //首页
                index: true,
                element: <ContentHome/>
            },
            {
                //关于
                path: "about",
                element: <div>About</div>
            },
            {
                //文章页 uuid对应文章id
                path: 'article/:uuid',
                element: <ArticelView/>
            }
        ]
    },
    {
        path: "/console",
        //TODO 鉴权 利用守卫路由
        element: <Console/>,
        children: [
            {
                index: true,
                element: <ConsoleHome/>
            },
            {
                path: "editor",
                element: <ArticleEditor/>
            }
        ]
    }
])

export default router;