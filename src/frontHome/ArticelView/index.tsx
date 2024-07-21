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
import CommentForm from "../../components/commentForm/commentForm";
import CommentItem from "../../components/comment/comment";
import ChildCommentItem from "../../components/comment/childComment";
import {
  AComment,
  ChildComment,
  FormState,
  getCommentList,
} from "../../request/req_comment";
import { Modal } from "@douyinfe/semi-ui";

const ArticelView = () => {
  const isDark = useContext(ThemeContext);
  //测试文章
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //获取文章id
  const { uuid } = useParams();
  const [article, setArticle] = useState<ArticleItem>();
  useEffect(() => {
    if (uuid == undefined) return;
    //向后端获取文章内容
    const initArticle = async () => {
      const res = await getArticle(uuid);
      const Article = res.data;
      setArticle(Article);
    };
    initArticle();
  }, [uuid]);

  const [id] = useState("preview-only");
  const [scrollElement] = useState(document.documentElement);

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    website: "",
    content: "",
    isSave: false,
    parent_id: undefined,
    root_id: undefined,
  });

  const [comments, setComments] = useState<AComment[]>();
  const getComments = async () => {
    const res = await getCommentList(uuid);
    setComments(res.data);
  };
  useEffect(() => {
    getComments();
    console.log(comments);
  }, [uuid]);

  const [replyVisible, setReplyVisible] = useState<boolean>(false);
  const [replyItem, setReplyItem] = useState<
    AComment | ChildComment | undefined
  >(undefined);

  const replyRender = () => {
    // replyItem类型断言
    if (replyItem as AComment) {
      return <div>正在回复@{replyItem?.userName}:{replyItem?.content}</div>;
    } else if (replyItem as ChildComment) {
      return <div>正在回复@{replyItem?.userName}:{replyItem?.content}</div>;
    } else {
      return "错误";
    }
  };

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
        className="article-main"
        style={biggerThan768 ? { width: "80%" } : { width: "95%" }}
      >
        <div
          className="article"
          style={biggerThan768 ? { width: "80%" } : { width: "100%" }}
        >
          <div className="article-content">
            <div className="summary">
              <div className="summary-title">
                <img src="../src\assets\android.svg" alt="" />
                <span>由ChatGPT生成的文章摘要</span>
              </div>
              <div className="summary-content">
                <span>{article?.summary}</span>
              </div>
            </div>
            <MarkDown
              textContent={article?.content}
              darkMode={isDark}
            ></MarkDown>
          </div>
          <div className="article-comment">
            <CommentForm
              uuid={article?.uuid}
              formState={formState}
              setFormState={setFormState}
            />
            {comments?.map((item, key) => {
              return (
                <div key={key}>
                  <CommentItem key={key} item={item} setVisible={setReplyVisible} setItem={setReplyItem}/>
                  {item.child_comment.map((childitem, key) => {
                    return (
                      <ChildCommentItem
                        key={key}
                        item={childitem}
                        replayname={
                          item.child_comment.find(
                            (item) => item.id == childitem.parentId
                          )?.userName || ""
                        }
                        setVisible={setReplyVisible}
                        setItem={setReplyItem}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {biggerThan768 && (
          <div className="nav">
            <MdCatalog
              editorId={id}
              scrollElement={scrollElement}
              scrollElementOffsetTop={60}
            />
          </div>
        )}
      </div>
      <Modal
        title="回复"
        visible={replyVisible}
        onCancel={() => {
          setReplyVisible(false);
        }}
        closeOnEsc={true}
        centered={true}
      >
        {replyRender()}
      </Modal>
    </div>
  );
};

export default ArticelView;
