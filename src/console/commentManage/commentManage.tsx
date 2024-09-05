import { useEffect, useState } from "react";
import {
  CommentManager,
  getCommentListByStatus,
  updateComment,
} from "../../request/req_comment";
import { Button, Table, Toast } from "@douyinfe/semi-ui";
import Column from "@douyinfe/semi-ui/lib/es/table/Column";
import "./index.css";
import { formatDateMilli } from "../../utils/time";

interface CommentManageProps {
  status: number;
}

const CommentManage = ({ status }: CommentManageProps) => {
  const [commentList, setCommentList] = useState<CommentManager[]>();
  const getlist = async () => {
    const res: any = await getCommentListByStatus(status);
    console.log(res.data);
    if (res.code === 200) {
      setCommentList(res.data);
    }
  };
  useEffect(() => {
    getlist();
  }, []);

  const update = async (id: string, status: string) => {
    const res: any = await updateComment(id, status);
    if (res.code == 200) {
      Toast.success("操作成功");
      getlist();
    } else {
      Toast.error(res.msg);
    }
  };

  const timerender = (text: any) => {
    return formatDateMilli(text);
  };

  const operateaAR = (text: any) => {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            update(text, "0");
          }}
        >
          撤销
        </Button>
      </div>
    );
  };

  const operaterende = (text: any) => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => {
            update(text, "1");
          }}
        >
          通过
        </Button>
        <Button
          type="danger"
          onClick={() => {
            update(text, "2");
          }}
        >
          拒绝
        </Button>
      </div>
    );
  };

  return (
    <div className="commentManage">
      <Table dataSource={commentList} rowKey="comment">
        <Column title="ID" dataIndex="id" key="1" />
        <Column title="内容" dataIndex="content" />
        <Column title="邮箱" dataIndex="email" />
        <Column title="用户名" dataIndex="userName" />
        <Column title="所属文章" dataIndex="article_title" />
        <Column title="父评论ID" dataIndex="RootID" key="3" />
        <Column
          title="发布时间"
          dataIndex="createdAt"
          key="4"
          render={timerender}
        />
        <Column
          align="center"
          title="操作"
          dataIndex="id"
          key="5"
          render={status == 0 ? operaterende : operateaAR}
        />
      </Table>
    </div>
  );
};

export default CommentManage;
