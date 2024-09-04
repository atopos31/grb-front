import { useEffect, useState } from "react";
import { CommentManager, getCommentListByStatus } from "../../request/req_comment";
import { Table } from "@douyinfe/semi-ui";
import Column from "@douyinfe/semi-ui/lib/es/table/Column";
import "./index.css"

interface CommentManageProps {
  status: number;
}

const CommentManage = ({ status }: CommentManageProps) => {
  const [commentList, setCommentList] = useState<CommentManager[]>();
  const getlist = async () => {
    const res:any = await getCommentListByStatus(status);
    console.log(res.data);
    if (res.code === 200) {
      setCommentList(res.data);
    }
  }
  useEffect(() => {

    getlist();
  },[]);

  return (
    <div className="commentManage">
     <Table
     dataSource={commentList}
     rowKey="comment"
     >
      <Column 
        title="ID"
        dataIndex="id"
        key="1"
      />
     </Table>
    </div>
  );
};

export default CommentManage;
