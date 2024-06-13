import {
  IconBookmark,
  IconEyeOpened,
  IconFile,
  IconHistory,
  IconHourglass,
  IconPriceTag,
} from "@douyinfe/semi-icons";
import "./cover.css";
import { Card } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { ArticleItem } from "../../request/req_article";
import { formatDateString } from "../../utils/time";

interface Articel {
  title: string;
  img: string | undefined;
  createTime: string;
  content: string;
}
interface CoverProps {
  title: string;
  createTime: string;
  updateTime: string;
}

interface CoverWithProps {
  title: string;
  img: string | undefined;
  createTime: string;
  updateTime: string;
}

const backgroundColor = "rgba(var(--semi-grey-5), .1) ";

const Articel = (articleItem: ArticleItem) => {
  return (
    <Card
      cover={<Cover title={articleItem.title} createTime={formatDateString(articleItem.created_at)} updateTime={formatDateString(articleItem.updated_at)} img={articleItem.cover_image} />}
      bordered={false}
      style={{
        backgroundColor: backgroundColor,
        width: "100%",
      }}
    >
      <div className="font" style={{ fontSize: "1rem" }}>
        {articleItem.summary}
      </div>
      <div
        className="tags"
        style={{ display: "flex", padding: "30px 0 0 0", gap: "10px" }}
      >
        <IconPriceTag />
        {articleItem.tags.map((tag)=>{return <div className="tag" >{tag.name}</div>})}
      </div>
    </Card>
  );
};

const Cover = ({ title, createTime, img,updateTime }: CoverWithProps) => {
  if (img == undefined || img == "") {
    return <CoverNoWith title={title} createTime={createTime} updateTime={updateTime} />;
  } else {
    return (
      <CoverWith title={title} img={img as string} createTime={createTime} updateTime={updateTime} />
    );
  }
};

export const CoverNoWith = ({ title, createTime ,updateTime}: CoverProps) => {
  const Navigate = useNavigate();
  return (
    <div className="cover">
      <a
        className="cover-title"
        onClick={() => {
          Navigate("/article/231123");
        }}
      >
        {title}
      </a>
      <div className="cover-infos">
        <a className="cover-info">
          <IconHistory />
          {createTime}
        </a>
        |
        <a className="cover-info">
          <IconHistory />
          {updateTime}
        </a>
        |
        <a className="cover-info">
          <IconBookmark />
          比赛
        </a>
        |
        <a className="cover-info">
          <IconEyeOpened />
          123
        </a>
        |
        <a className="cover-info">
          <IconFile />
          32131字
        </a>
        |
        <a className="cover-info">
          <IconHourglass />
          23分钟
        </a>
      </div>
    </div>
  );
};

const CoverWith = ({ title, img, createTime,updateTime }: CoverWithProps) => {
  return (
    <div className="coverwith">
      <img className="coverwith-cover" alt="example" src={img} />
      <div className="coverwith-content">
        <p className="coverwith-title">{title}</p>
        <div className="cover-infos" style={{ color: "#ffffff" }}>
          <a className="cover-info">
            <IconHistory />
            {createTime}
          </a>
          |
          <a className="cover-info">
            <IconHistory />
            {updateTime}
          </a>
          |
          <a className="cover-info">
            <IconBookmark />
            比赛
          </a>
          |
          <a className="cover-info">
            <IconEyeOpened />
            123
          </a>
          |
          <a className="cover-info">
            <IconFile />
            32131字
          </a>
          |
          <a className="cover-info">
            <IconHourglass />
            23分钟
          </a>
        </div>
      </div>
    </div>
  );
};

export { Articel, Cover };
