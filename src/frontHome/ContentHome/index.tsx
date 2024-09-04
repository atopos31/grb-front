import "./iindex.scss";
import { useMediaPredicate } from "react-media-hook";
import { Articel } from "../../components/articel/articel";
import { IconChevronDown } from "@douyinfe/semi-icons";
import SocialButton from "../../components/buttons/socialButton";
import { Pagination } from "@douyinfe/semi-ui";
import HomeCard from "../../components/homeCard/homecard";
import InfoCard from "../../components/infoCard/infoCard";
import { useEffect, useState } from "react";
import { ReqTag, getTagList } from "../../request/req_tag";
import { ReqCate, getCateList } from "../../request/req_cate";
import { getSiteBasicInfo, getSiteInfo } from "../../request/req_siteinfo";
import { ArticleItem, getArticleList } from "../../request/req_article";

export const SitekeyValueArray: {[key: string]: string} = {
  "articlecount": "文章数",
  "categorycount": "分类数",
  "tagcount": "标签数",
  "viewscount": "访问量",
};
const ContentHome = () => {
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //主页下方按钮点击跳转到文章部分
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 60,
      behavior: "smooth",
    });
  };

  const [tags, settags] = useState<ReqTag[]>([]);
  const [cates, setcates] = useState<ReqCate[]>([]);
  const [siteinfo, setsiteinfo] = useState<{ key: string; value: string }[]>([]);
  const [userInfo,setUserInfo] = useState<{ name: string; avatar: string }>();
  const [socialConfigs, setsocialConfigs] = useState<{name:string,url:string}[]>([]);
  const [total,setTotal] = useState(0);
  useEffect(() => {
    const getBasicInfo= async () => {
      const res = await getSiteBasicInfo();
      setUserInfo(res.data.user)
      setsocialConfigs(res.data.social)
    };
    const getTags = async () => {
      const res = await getTagList();
      settags(res.data as ReqTag[]);
    };
    const getCates = async () => {
      const res = await getCateList();
      setcates(res.data as ReqCate[]);
    };
    const getSite = async () => {
      const res = await getSiteInfo();
      setsiteinfo(
        Object.entries(res.data).map(([key, value]) => ({
          key: SitekeyValueArray[key],
          value: value as string,
        }))
      );

    };
    getBasicInfo();
    getCates();
    getTags();
    getSite();
  }, []);

  // 分页数据渲染
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [articleList, setArticleList] = useState<ArticleItem[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      const res = await getArticleList(currentPage, pageSize);
      setTotal(res.data.count);
      let articleList : ArticleItem[] = res.data.list;
      setArticleList(articleList);
    };
    getArticles();
  }, [currentPage]);

  return (
    <div className="home-main">
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
              我是<span style={{ color: "#7880d1" }}>{userInfo?.name}</span>
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
        <img className="avatar" src={userInfo?.avatar} />
        <IconChevronDown className="iconchevron" onClick={handleScrollDown} />
      </div>
      <div className="home-content">
        {/* 文章列表 */}
        <div className="articels">
          {articleList.map((cardConfig, index) => (
            <Articel key={index} {...cardConfig} />
          ))}
          {/* 翻页器 */}
          <Pagination onChange={(currentPage: number, pageSize: number) => {setCurrentPage(currentPage); setPageSize(pageSize)}} total={total} pageSize={pageSize} style={{ marginBottom: 12 }}></Pagination>
        </div>
        <div className="infos">
          <div className="cate-card">
            <HomeCard title="分类" color="violet" values={cates} />
          </div>
          <div className="cate-card">
            <HomeCard title="标签" color="blue" values={tags} />
          </div>
          <div className="site">
            <InfoCard title="站点信息" data={siteinfo} />
          </div>
        </div>
      </div>
      {/* 侧边栏 */}

    </div>
  );
};

export default ContentHome;
