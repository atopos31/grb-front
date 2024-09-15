import { useEffect, useState } from "react";
import CpuUsageChart from "../../components/host/host";
import { Host, HstSSE } from "../../request/req_host";
import { Toast } from "@douyinfe/semi-ui";

const ConsoleHome = () => {
  const [host, setHost] = useState<Host>();

  useEffect(() => {
    const hostSSE = HstSSE()
    hostSSE.onmessage = (e) => {
      setHost(JSON.parse(e.data))
    }
    hostSSE.onerror = () => {
      Toast.error("获取主机信息错误")
    }
  }, []);


  return (
    <div style={{ padding: 10, width: "100%" }}>
      <div id="cal-heatmap">
        <CpuUsageChart
          cpuPrecent={host?.cpuPrecent}
          mem={host?.mem}
          net={host?.net}
        />
      </div>
    </div>
  );
};

export default ConsoleHome;
