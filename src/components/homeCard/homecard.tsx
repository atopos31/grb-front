import { Card, Space, Tag } from "@douyinfe/semi-ui";
import "./homecard.scss";

type cardinfo = {
  title: string;
  values: { name: string; id: number }[];
}

const HomeCard = (props:cardinfo) => {
  const { title, values } = props;
  return (
    <Card title={title} className="tagCard">
      <Space wrap>
        {values.map((item, index) => (
          <Tag
            color="light-blue"
            className="stag"
            size="large"
            onClick={() => {
              // TODO 跳转到指定分页
              console.log(item);
            }}
            key={index}
          >
            {item.name}
          </Tag>
        ))}
      </Space>
    </Card>
  );
};

export default HomeCard;
