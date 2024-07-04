import { useEffect, useState } from "react";
import { ReqManageCate, getCateManageList } from "../../request/req_cate";
import { Table } from "@douyinfe/semi-ui";
import Column from "@douyinfe/semi-ui/lib/es/table/Column";

const CategoryManage = () => {
  // 分页数据渲染
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [cateList, setCateList] = useState<ReqManageCate[]>([]);

  const getCates = async () => {
    const res = await getCateManageList();
    setTotal(res.data.count);
    setCateList(res.data.list as ReqManageCate[]);
  };

  useEffect(() => {
    getCates();
  }, []);

  return <div className="cate-manage">

<Table
        dataSource={cateList}
        pagination={{
          currentPage,
          pageSize,
          total,
        }}
        rowKey="uuid"
      >
        <Column title="分类名称"
            dataIndex="name"
            key="1"
        />

      </Table>
  </div>;
};

export default CategoryManage;
