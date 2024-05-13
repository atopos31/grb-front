import {createBrowserRouter} from "react-router-dom";
import {App} from "../App";
import ContentHome from "../frontHome/ContentHome";
import ArticelView from "../frontHome/ArticelView";

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
])

export default router;