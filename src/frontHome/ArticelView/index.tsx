// import MarkDown from "../../components/MarkDown";
import "./articel.scss";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { CoverNoWith } from "../../components/articel/articel";
import { useMediaPredicate } from "react-media-hook";
import { useNavigate, useParams } from "react-router-dom";
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
  replyComment,
} from "../../request/req_comment";
import { Modal, Spin, TextArea, Toast } from "@douyinfe/semi-ui";
import MarkDown from "../../components/MarkDown";

const ArticelView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isDark = useContext(ThemeContext);
  //测试文章
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  //获取文章id
  const { uuid } = useParams();
  const [article, setArticle] = useState<ArticleItem>();

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

  const [replyVisible, setReplyVisible] = useState<boolean>(false);
  const [replyItem, setReplyItem] = useState<
    AComment | ChildComment | undefined
  >(undefined);
  const Navigate = useNavigate();
  const initdata = async () => {
    if (uuid == undefined) return;
    setIsLoading(true);
    const resC = await getCommentList(uuid);
    setComments(resC.data);
    const resA: any = await getArticle(uuid);
    if (resA.code != 200) {
      // 跳转到404
      Navigate("/404");
    }
    const Article = resA.data;
    setArticle(Article);
    setIsLoading(false);
  };

  useEffect(() => {
    initdata();
  }, [uuid]);

  const [replyContent, setReplyContent] = useState<string>("");

  const replyRender = () => {
    return (
      <div>
        正在回复@{replyItem?.userName}:{replyItem?.content}
        <TextArea
          style={{ marginTop: "20px" }}
          maxCount={100}
          showClear
          value={replyContent}
          onChange={(v) => {
            setReplyContent(v);
          }}
        />
      </div>
    );
  };

  const reply = async () => {
    let res: any;
    if ((replyItem as ChildComment).rootId) {
      res = await replyComment(
        formState,
        replyContent,
        article?.uuid,
        (replyItem as ChildComment).rootId,
        (replyItem as ChildComment).id
      );
    } else  {
      res = await replyComment(
        formState,
        replyContent,
        article?.uuid,
        replyItem?.id
      );
    } 

    if (res.code == 200) {
      Toast.success("回复成功");
      setReplyContent("")
      setReplyVisible(false)
    } else if (res.code == 400) {
      Toast.error("参数不全，确认填好信息？");
    }

  };

  return isLoading ? (
    <div className="isloading">
      <Spin style={{ width: "500px" }} tip="加载中" size="large"></Spin>
    </div>
  ) : (
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
                <img src="/android.svg" alt="" />
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
                  <CommentItem
                    key={key}
                    item={item}
                    setVisible={setReplyVisible}
                    setItem={setReplyItem}
                  />
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
          setReplyContent("");
        }}
        onOk={reply}
        closeOnEsc={true}
        centered={true}
        style={{maxWidth: "648px",width: "90%"}}
      >
        {replyRender()}
      </Modal>
    </div>
  );
};

export default ArticelView;
