import { useEffect, useState } from "react";
import CpuUsageChart from "../../components/host/host";
import { Host, HstSSE } from "../../request/req_host";

const ConsoleHome = () => {
  const [host, setHost] = useState<Host>();

  useEffect(() => {
    const hostSSE = HstSSE()
    hostSSE.onmessage = (e) => {
      setHost(JSON.parse(e.data))
    }
  }, []);


  return (
    <div style={{ padding: 10, height: "100%", width: "100%" }}>
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
