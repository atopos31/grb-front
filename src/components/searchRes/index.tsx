import { useNavigate } from "react-router-dom";
import { SearchHit } from "../../request/req_article_search"
import "./searchRes.css"

interface SeachResProps extends SearchHit {
    setSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }

export const SeachRes = (res: SeachResProps)=> {
    const Navigate = useNavigate();
    return (
        <div className="search-article-body" onClick={() => {
            Navigate(`/article/${res.uuid}`,);
            res.setSearchVisible(false);
          }}>
          <div className="search-article-title" dangerouslySetInnerHTML={{__html: res.title}}>
          </div>
          <div
            className="search-article-summary"
            dangerouslySetInnerHTML={{
              __html:
                res.summary
            }}
          ></div>
          <div className="search-article-content" dangerouslySetInnerHTML={{__html: res.content}}></div>
        </div>
    )
}