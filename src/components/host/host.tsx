import { Progress } from "@douyinfe/semi-ui";
import "./host.scss"
import { Cmn } from "../../request/req_system";
import { IconArrowDown, IconArrowUp } from "@douyinfe/semi-icons";

const CpuUsageChart = ({ cpuPrecent, mem,net }: Cmn) => {
  return (
    <div className="host">
      <div className="host-cpu">
        <Progress
          percent={cpuPrecent}
          showInfo
          type="circle"
          format={(per) => `${per}%`}
        />
        <span>CPU</span>
      </div>

      <div className="host-mem">
        <Progress
          percent={mem?.usedPercent}
          showInfo
          type="circle"
          format={(per) => `${per}%`}
        />
        <span>内存</span>
      </div>

      <div className="host-net">
        <div className="host-net-data">
          <span><IconArrowUp size="small"/> {bytesToSize(net?.bytesSent ?? 0)}</span>
          <span><IconArrowDown size="small" /> {bytesToSize(net?.bytesRecv ?? 0)}</span>
        </div>
        <span>网络</span>
      </div>
    </div>
  );
};

export default CpuUsageChart;

function bytesToSize(bytes: number ): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}
