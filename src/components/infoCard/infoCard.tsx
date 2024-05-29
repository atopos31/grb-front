import { Card, Descriptions } from "@douyinfe/semi-ui";
import "./infoCard.scss";
type carinfo = {
  title: string;
  data: { key: string; value: string | number }[];
};

const InfoCard = (props: carinfo) => {
  const { title, data } = props;
  return (
    <Card title={title} className="site-info">
      <Descriptions data={data} />
    </Card>
  );
};

export default InfoCard;
