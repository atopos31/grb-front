import { useEffect, useState } from "react";
import CpuUsageChart from "../../components/host/host";
import { Cmn, getSystemInfo, HstSSE, Info } from "../../request/req_system";
import { Card, Toast } from "@douyinfe/semi-ui";

import "./home.scss";

const ConsoleHome = () => {
  const [host, setHost] = useState<Cmn>();
  const [info, setInfo] = useState<Info>();

  useEffect(() => {
    const hostSSE = HstSSE();
    hostSSE.onmessage = (e) => {
      setHost(JSON.parse(e.data));
    };
    hostSSE.onerror = () => {
      Toast.error("获取主机信息错误");
    };
  }, []);
  const getInfo = async () => {
    const res: any = await getSystemInfo();
    console.log(res);

    setInfo(res.data);
  };

  useEffect(() => {
    getInfo();
  },[]);

  return (
    <div style={{ padding: 10, width: "100%" }}>
      <Card title="系统信息">
        <div id="cal-heatmap" className="heatmap">
          <div className="system">
            <p>OS：{info?.os}</p>
            <p>平台：{info?.platform}</p>
            <p>版本：{info?.platform_version}</p>
            <p>内核版本：{info?.kernel_version}</p>
            <p>架构：{info?.arch}</p>
          </div>
          <CpuUsageChart
            cpuPrecent={host?.cpuPrecent}
            mem={host?.mem}
            net={host?.net}
          />
        </div>
      </Card>
    </div>
  );
};

export default ConsoleHome;
