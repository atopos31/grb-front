import { Button, Popconfirm, Switch, Table, Toast } from "@douyinfe/semi-ui";
import "./manage.css";
import { useEffect, useState } from "react";
import {
  ArticleItem,
  deleteArticle,
  getManageArticleList,
  updateSectionArtcle,
} from "../../request/req_article";
import { Image } from "@douyinfe/semi-ui";
import { formatDateString } from "../../utils/time";
import { useNavigate } from "react-router-dom";

const { Column } = Table;

const ArticleManage = () => {
  // 分页数据渲染
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [articleList, setArticleList] = useState<ArticleItem[]>([]);

  const getArticles = async () => {
    const res = await getManageArticleList(currentPage, pageSize);
    let articleList: ArticleItem[] = res.data.list;
    setTotal(res.data.count);
    setArticleList(articleList);
  };

  const handlePageChange = (currentPage: any) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    getArticles();
  }, [currentPage]);

  const coverrender = (text: any) => {
    return (
      <Image
        imgStyle={{ objectFit: "cover" }}
        src={text}
        width={112}
        height={63}
      />
    );
  };

  const timerender = (text: any) => {
    return formatDateString(text);
  };

  const handlerSwitch = async (
    checked: 0 | 1,
    uuid: number,
    key: "status" | "top"
  ) => {
    setArticleList(
      articleList.map((item) => {
        if (item.uuid === uuid) {
          return { ...item, [key]: checked };
        }
        return item;
      })
    );
    const res: any = await updateSectionArtcle(uuid, key, checked);
    if (res.code === 200) {
      Toast.success("操作成功");
    } else {
      Toast.error("操作失败");
      getArticles();
    }
  };

  const statusrender = (text: number, record: ArticleItem) => {
    return (
      <Switch
        defaultChecked={text === 1 ? true : false}
        checked={record.status ? true : false}
        onChange={(checked) =>
          handlerSwitch(checked ? 1 : 0, record.uuid, "status")
        }
      />
    );
  };

  const toprender = (text: number, record: ArticleItem) => {
    return (
      <Switch
        defaultChecked={text === 1 ? true : false}
        checked={record.top ? true : false}
        onChange={(checked) =>
          handlerSwitch(checked ? 1 : 0, record.uuid, "top")
        }
      />
    );
  };

  const navigate = useNavigate();
  const operaterender = (_text: any, record: ArticleItem) => {
    const onConfirm = async (uuid : number) => {
      // TODO删除
      setArticleList(articleList.filter(item => item.uuid !== uuid));
      const res:any = await deleteArticle(uuid);
      getArticles();
      if (res.code === 200) {
        Toast.success("删除成功");
      } else {
        Toast.error("删除失败");
      }
    };
    return (
      <div>
        <Button
          theme="light"
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => {
            navigate(`/console/article/editor/${record.uuid}`);
          }}
        >
          编辑
        </Button>
        <Button
          theme="light"
          type="secondary"
          style={{ marginRight: 8 }}
          onClick={() => {
            navigate(`/article/${record.uuid}`);
          }}
        >
          预览
        </Button>
        <Popconfirm
          okType="danger"
          title="确定是否删除？"
          content="此修改将不可逆"
          onConfirm={()=>{onConfirm(record.uuid)}}
        >
          <Button type="danger">删除</Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <div className="manage">
      <Table
        dataSource={articleList}
        pagination={{
          currentPage,
          pageSize,
          total,
          onPageChange: handlePageChange,
        }}
        rowKey="uuid"
      >
        <Column title="标题" dataIndex="title" key="name" />
        <Column
          title="封面"
          dataIndex="cover_image"
          key="1"
          render={coverrender}
        />
        <Column
          title="是否置顶"
          dataIndex="top"
          key="2"
          render={toprender}
        />
        <Column
          title="发布时间"
          dataIndex="created_at"
          key="3"
          render={timerender}
        />
        <Column
          title="是否发布"
          dataIndex="status"
          key="4"
          render={statusrender}
        />
        <Column
          align="center"
          title="操作"
          dataIndex="category"
          key="5"
          render={operaterender}
        />
      </Table>
    </div>
  );
};

export default ArticleManage;
