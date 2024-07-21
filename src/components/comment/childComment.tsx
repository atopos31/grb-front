import { AComment, ChildComment } from "../../request/req_comment";
import { formatDateMilli } from "../../utils/time";
import "./childComment.scss";

interface ChildCommentItemProps {
  item: ChildComment;
  replayname?: string;
  setVisible: (value: ((prevState: boolean) => boolean) | boolean) => void;
  setItem: (value: ((prevState: AComment | ChildComment | undefined) => AComment | ChildComment | undefined) | AComment | ChildComment | undefined) => void;

}
const ChildCommentItem = ({ item, replayname ,setVisible,setItem}: ChildCommentItemProps) => {
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
    <div className="child-comment-item">
      <div className="child-comment-item-infos">
        <div className="child-comment-item-center">
          <div className="child-comment-item-avatar">
            <a onClick={handleClick} target="_blank">
              <img src={item.avatar} />
            </a>
          </div>
          <div className="child-comment-item-infos-name">{item.userName}</div>
          {replayname ? (
            <div className="child-comment-item-infos-reply">
              回复
              <span className="child-comment-item-infos-reply-name">
                @{replayname}
              </span>
              :
            </div>
          ) : (
            ""
          )}

          <div className="child-comment-item-infos-content">{item.content}</div>
        </div>

        <div className="child-comment-item-infos-buttom">
          <div className="child-comment-item-infos-buttom-creatime">
            {formatDateMilli(item.createdAt)}
          </div>
          <div className="child-comment-item-infos-buttom-reply"onClick={click}> 回复 </div>
        </div>
      </div>
    </div>
  );
};

export default ChildCommentItem;
