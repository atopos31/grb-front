import { Empty } from "@douyinfe/semi-ui";
import "./404.scss";

import { IllustrationNotFound } from "@douyinfe/semi-illustrations";
import { IllustrationNotFoundDark } from "@douyinfe/semi-illustrations";

const NotFound = () => {
  const emptyStyle = {
    padding: 30,
  };
  return (
    <div className="notfound-main">
      <Empty
        image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
        darkModeImage={
          <IllustrationNotFoundDark style={{ width: 150, height: 150 }} />
        }
        description={"Are you OK ?"}
        style={emptyStyle}
      />
    </div>
  );
};

export default NotFound;
