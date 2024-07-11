import MarkDown from "../../components/MarkDown";
import "./articel.scss";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { CoverNoWith } from "../../components/articel/articel";
import { useMediaPredicate } from "react-media-hook";
import { useParams } from "react-router-dom";
import { MdCatalog } from "md-editor-rt";
import { ArticleItem, getArticle } from "../../request/req_article";
import { formatDateMilli } from "../../utils/time";

const ArticelView = () => {
  const isDark = useContext(ThemeContext);
  //测试文章
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //获取文章id
  const { uuid } = useParams();
  const [article, setArticle] = useState<ArticleItem>();
  useEffect(() => {
    if (uuid == undefined) return;
    console.log(uuid);
    //向后端获取文章内容
    const initArticle = async () => {
      const res = await getArticle(uuid);
      const Article = res.data;
      setArticle(Article);
    }
    initArticle()
  }, []);

  const [id] = useState("preview-only");
  const [scrollElement] = useState(document.documentElement);

  return (
    <div className="articleview">
      <div
        className="head"
        style={biggerThan768 ? { width: "80%" } : { width: "90%" }}
      >
        <CoverNoWith
          uuid={Number(uuid)}
          title={article?.title}
          createTime={formatDateMilli(article?.created_at)}
          updateTime={formatDateMilli(article?.updated_at)}
          category={article?.category}
        ></CoverNoWith>
      </div>
      <div
        className="article"
        style={biggerThan768 ? { width: "80%" } : { width: "95%" }}
      >
        <div
          className="article-content"
          style={biggerThan768 ? { width: "80%" } : { width: "100%" }}
        >
          <div className="summary">
            <div className="summary-title">
              <img src="../src\assets\android.svg" alt="" />
              <span>由ChatGPT生成的文章摘要</span>
            </div>
            <div className="summary-content">
              <span>
                {article?.summary}
              </span>
            </div>
          </div>
          <MarkDown textContent={article?.content} darkMode={isDark}></MarkDown>
        </div>
        {biggerThan768 && (
          <div className="nav">
            <MdCatalog
              editorId={id}
              scrollElement={scrollElement}
              scrollElementOffsetTop={80}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticelView;
