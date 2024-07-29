import { useEffect, useState } from "react";
import CpuUsageChart from "../../components/host/host";
import { Host, HstSSE } from "../../request/req_host";

const ConsoleHome = () => {
  const [host, setHost] = useState<Host>();

  // 模拟获取CPU使用率
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const usage = Math.floor(Math.random() * 100); // 随机生成0-100之间的数
  //     const host: Host = {
  //       cpuPrecent: usage,
  //       mem: {
  //         usedPercent: usage,
  //         total: 100,
  //         used: 100 - usage,
  //       },
  //       net: {
  //         bytesRecv: 23,
  //         bytesSent: 12,
  //       },
  //     };
  //     setHost(host);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

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
