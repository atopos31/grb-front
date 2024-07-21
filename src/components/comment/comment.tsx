import { AComment, ChildComment } from "../../request/req_comment";
import { formatDateMilli } from "../../utils/time";
import "./comment.scss";

interface ChildCommentItemProps {
  item: AComment;
  setVisible: (value: ((prevState: boolean) => boolean) | boolean) => void;
  setItem: (value: ((prevState: AComment | ChildComment | undefined) => AComment | ChildComment | undefined) | AComment | ChildComment | undefined) => void;
}

const CommentItem = ({ item,setVisible,setItem }: ChildCommentItemProps) => {
  const handleClick = () => {
    if (item.web_site == "") {
      return;
    }
    let webSite = item.web_site;
    if (!/^https?:\/\//i.test(webSite)) {
      webSite = "https://" + webSite;
    }
    window.open(webSite);
  };
  const click = ()=> {
    setItem(item)
    setVisible(true)

  }
  return (
    <div className="comment-item">
      <div className="comment-item-avatar">
        <a onClick={handleClick} target="_blank">
          <img src={item.avatar} />
        </a>
      </div>
      <div className="comment-item-infos">
        <div className="comment-item-infos-name">{item.userName}</div>
        <div className="comment-item-infos-content">{item.content}</div>
        <div className="comment-item-infos-buttom">
          <div className="comment-item-infos-buttom-creatime">
            {formatDateMilli(item.createdAt)}
          </div>
          <div className="comment-item-infos-buttom-reply" onClick={click}> 回复 </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
