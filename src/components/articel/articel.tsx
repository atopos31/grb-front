import {
  IconBookmark,
  IconHistory,
  IconPriceTag,
} from "@douyinfe/semi-icons";
import "./cover.css";
import { Card } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { ArticleItem, Category } from "../../request/req_article";
import { formatDateMilli } from "../../utils/time";

interface Articel {
  title: string;
  img: string | undefined;
  createTime: string;
  content: string;
  category_id: number;
  category: Category;
}
interface CoverProps {
  title: string | undefined;
  createTime: string;
  updateTime: string;
  uuid: number;
  category: Category | undefined;
}

interface CoverWithProps {
  title: string;
  img: string | undefined;
  createTime: string;
  updateTime: string;
  uuid: number;
  category: Category;
}

const backgroundColor = "rgba(var(--semi-grey-0), 0.75) ";

const Articel = (articleItem: ArticleItem) => {
  return (
    <Card
      cover={
        <Cover
          uuid={articleItem.uuid}
          title={articleItem.title}
          createTime={formatDateMilli(articleItem.created_at)}
          updateTime={formatDateMilli(articleItem.updated_at)}
          img={articleItem.cover_image}
          category={articleItem.category}
        />
      }
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
        {articleItem.tags.map((tag,key) => {
          return <div key={key} className="tag">{tag.name}</div>;
        })}
      </div>
    </Card>
  );
};

const Cover = ({
  title,
  createTime,
  img,
  updateTime,
  uuid,
  category
}: CoverWithProps) => {
  if (img == undefined || img == "") {
    return (
      <CoverNoWith
        uuid={uuid}
        title={title}
        createTime={createTime}
        updateTime={updateTime}
        category={category}
      />
    );
  } else {
    return (
      <CoverWith
        uuid={uuid}
        title={title}
        img={img as string}
        createTime={createTime}
        updateTime={updateTime}
        category={category}
      />
    );
  }
};

export const CoverNoWith = ({
  title,
  createTime,
  updateTime,
  uuid,
  category
}: CoverProps) => {
  const Navigate = useNavigate();
  return (
    <div className="cover">
      <a
        className="cover-title"
        href={`/article/${uuid}`}
        onClick={(event) => {
          event.preventDefault();
          Navigate(`/article/${uuid}`);
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
          {category?.name}
        </a>
      </div>
    </div>
  );
};

const CoverWith = ({ title, img, createTime, updateTime,uuid ,category}: CoverWithProps) => {
  const Navigate = useNavigate();
  return (
    <div className="coverwith">
      <img className="coverwith-cover" alt="example" src={img} />
      <div className="coverwith-content">
        <a
          className="coverwith-title"
          href={`/article/${uuid}`}
          onClick={(event) => {
            event.preventDefault();
            Navigate(`/article/${uuid}`);
          }}
        >
          {title}
        </a>
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
            {category.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export { Articel, Cover };
