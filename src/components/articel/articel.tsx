import { IconBookmark, IconEyeOpened, IconFile, IconHistory, IconHourglass, IconPriceTag } from "@douyinfe/semi-icons";
import "./cover.css";
import { useMediaPredicate } from "react-media-hook";
import { Card } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

interface Articel {
  title: string;
  img: string;
  createTime: string;
  content: string;
}
interface CoverProps {
  title: string;
  createTime: string;
}

interface CoverWithProps {
  title: string;
  img: string;
  createTime: string;
}

const backgroundColor = "rgba(var(--semi-grey-5), .1) ";

const Articel = ({ title, createTime, img, content }: Articel) => {
  //移动端适配
  const biggerThan768 = useMediaPredicate("(min-width: 768px)");
  return (
    <Card
      cover={<Cover title={title} createTime={createTime} img={img} />}
      bordered={false}
      style={{
        backgroundColor: backgroundColor,
        width:"100%"
      }}
    >
      <div className="font" style={{ fontSize: "1rem" }}>
        {content}
      </div>
      <div className="tags" style={{display: "flex",padding: "30px 0 0 0",gap: "10px"}}><IconPriceTag />
        <div className="tag" style={{}}>蓝桥杯</div>
      </div>
    </Card>
  );
};

const Cover = ({ title, createTime, img }: CoverWithProps) => {
  if (img == "") {
    return <CoverNoWith title={title} createTime={createTime} />;
  } else {
    return <CoverWith title={title} img={img} createTime={createTime} />;
  }
};

export const CoverNoWith = ({ title, createTime }: CoverProps) => {
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
          <IconHistory/>
          {createTime}
        </a>|
        <a className="cover-info">
        <IconBookmark />
          比赛
        </a>|
        <a className="cover-info">
        <IconEyeOpened />
          123
        </a>|
        <a className="cover-info">
        <IconFile />
          32131字
        </a>|
        <a className="cover-info">
        <IconHourglass />
          23分钟
        </a>
        
      </div>
    </div>
  );
};

const CoverWith = ({ title, img, createTime }: CoverWithProps) => {
  return (
    <div className="coverwith">
      <img className="coverwith-cover" alt="example" src={img} />
      <div className="coverwith-content">
        <p className="coverwith-title">{title}</p>
        <div className="cover-infos" style={{color: "#ffffff"}}>
        <a className="cover-info">
          <IconHistory />
          {createTime}
        </a>
        |
        <a className="cover-info">
          <IconHistory />
          {createTime}
        </a>|
        <a className="cover-info">
        <IconBookmark />
          比赛
        </a>|
        <a className="cover-info">
        <IconEyeOpened />
          123
        </a>|
        <a className="cover-info">
        <IconFile />
          32131字
        </a>|
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
