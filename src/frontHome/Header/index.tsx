import { IconMenu, IconSearch } from "@douyinfe/semi-icons";
import { Button, Empty, Input, Modal, Nav, SideSheet, Spin } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import useIsAtTop from "./until";
import Switch from "../../components/buttons/Switch";
import "./header.css";
import { useEffect, useState } from "react";
import { searchArticle, SearchResults } from "../../request/req_article_search";
import { SeachRes } from "../../components/searchRes";
import { IllustrationNoResult } from '@douyinfe/semi-illustrations';
import { IllustrationNoResultDark } from '@douyinfe/semi-illustrations';
import HomeCard from "../../components/homeCard/homecard";
import InfoCard from "../../components/infoCard/infoCard";
import { SitekeyValueArray } from "../ContentHome";
import { getSiteInfo } from "../../request/req_siteinfo";
import { ReqCate, getCateList } from "../../request/req_cate";
import { ReqTag, getTagList } from "../../request/req_tag";
interface HeadProps {
  setDark: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isDark: boolean;
}

const Head = ({ setDark, isDark }: HeadProps) => {
  //路由跳转
  const navigate = useNavigate();
  //移动端适配
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");

  //滚动栏是否处于顶部
  const isAtTop = useIsAtTop();
  const [tags, settags] = useState<ReqTag[]>([]);
  const [cates, setcates] = useState<ReqCate[]>([]);
  const [siteinfo, setsiteinfo] = useState<{ key: string; value: string }[]>([]);
  const [visible,setVisible] = useState<boolean>(false);
  //开启状态栏
  const onSide = () => {
    setVisible(true);
  };
  // 关闭状态栏
  const offSide = () => {
    setVisible(false);
  };
  useEffect(() => {
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
    getCates();
    getTags();
    getSite();
  }, []);
  //主题切换
  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      setDark(false);
    } else {
      setDark(true);
    }
  };

  // 搜索框区域
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResults>();
  const search = async () => {
    setIsLoading(true)
    const res = await searchArticle(query);
    setSearchResult(res.data as SearchResults);
    setIsLoading(false)
  };

  useEffect(() => {
    search();
  }, [query]);

  return (
    <div className="container">
      <div className="Navf">
        <Nav
          style={{
            backgroundColor: isAtTop ? "rgba(var(--semi-grey-1), 0.85)" : "",
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
            <div className="NavHeader">
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
                onClick={() => {
                  setSearchVisible(true);
                }}
              >
                {biggerThan768 ? "搜索文章" : undefined}
              </Button>

              <Switch handleModeSwitch={switchMode} isDarkMode={isDark} />
            </>
          }
        />
      </div>
      <Modal
        visible={searchVisible}
        onCancel={() => setSearchVisible(false)}
        header={null}
        footer={
          <div style={{ color: "var(--semi-color-text-1)" }}>
            <span style={{ float: "left" }}>{
              (searchResult && searchResult?.hits && searchResult?.hits.length > 0 )
              ? `共搜索到${searchResult?.total}条结果，耗时${searchResult?.processingTimeMs}ms` : ""
              }
              
              </span>
            <span style={{ float: "right" }}>
            由
              <a
                style={{
                  color: "inherit",
                  textDecoration: "inherit",
                  textDecorationLine: "underline",
                }}
                target="_blank"
                href="https://www.meilisearch.com/"
              >
                 Meilisearch
              </a>
              驱动
            </span>
          </div>
        }
        style={{ maxWidth: 684, width: "90%" }}
      >
        <div className="search-body" style={{ padding: "20px 0px 20px 0px" }}>
          <Input
            placeholder="全文检索"
            value={query}
            onChange={(v) => setQuery(v)}
          ></Input>
          {
            isLoading ? <div className="search-loading" style={{height: "200px",display:"flex",alignItems:"center",justifyContent:"center"}}><Spin style={{width: 100}} tip="检索中" size="large"></Spin></div> :
            (searchResult && searchResult.hits && searchResult.hits.length > 0 ? searchResult.hits.map((item, key) => (
              <SeachRes
                key={key}
                title={item.title}
                uuid={item.uuid}
                summary={item.summary}
                content={item.content}
                setSearchVisible={setSearchVisible}
              />
            ) ): <Empty
            image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
            darkModeImage={<IllustrationNoResultDark style={{ width: 150, height: 150 }} />}
            description={'搜索无结果'}
            style={{padding:"30px"}}
        />)
          }
          
        </div>
      </Modal>
      <SideSheet
        title="星空未来的个人博客"
        visible={visible}
        onCancel={offSide}
        placement="left"
        width={270}
      >
        <div className="side-item">
          <p>留言板</p>
          <p>关于</p>
        </div>
        <HomeCard title="分类" color="violet" values={cates} />
        <br></br>
        <HomeCard title="标签" color="blue" values={tags} />
        <br></br>
        <InfoCard title="站点信息" data={siteinfo} />
      </SideSheet>
    </div>
  );
};
export default Head;
