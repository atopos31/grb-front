import { Card, Space, Tag } from "@douyinfe/semi-ui";
import "./homecard.scss";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";

type cardinfo = {
  title: string;
  color: TagColor | undefined;
  values: { name: string; id: number }[];
}

const HomeCard = (props:cardinfo) => {
  const { title,color, values } = props;
  return (
    <Card title={title} className="tagCard">
      <Space wrap>
        {values.map((item) => (
          <Tag
            color={color}
            className="stag"
            size="large"
            onClick={() => {
              // TODO 跳转到指定分页
              console.log(item);
            }}
            key={item.id}
          >
            {item.name}
          </Tag>
        ))}
      </Space>
    </Card>
  );
};

export default HomeCard;
