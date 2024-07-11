import { useEffect, useState } from "react";
import {
  ReqManageTag,
  createTag,
  deleteTag,
  updateTag,
} from "../../request/req_tag";
import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Table,
  Toast,
} from "@douyinfe/semi-ui";
import Column from "@douyinfe/semi-ui/lib/es/table/Column";
import { formatDateMilli } from "../../utils/time";
import "./tagManage.css";
import { IconPlus } from "@douyinfe/semi-icons";
import { getTagManageList } from "../../request/req_tag";

const TagManage = () => {
  // 分页数据渲染
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [total, setTotal] = useState(0);
  const [TagList, setTagList] = useState<ReqManageTag[]>([]);

  const getTags = async () => {
    const res = await getTagManageList(currentPage, pageSize);
    setTotal(res.data.count);
    setTagList(res.data.list as ReqManageTag[]);
  };

  const handlePageChange = (currentPage: any) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    getTags();
  }, [currentPage]);

  const [visible, setVisible] = useState(false);
  const [newTag, setNewTag] = useState("");

  const showDialog = () => {
    setVisible(true);
  };
  // 新增标签
  const handleOk = async () => {
    if (TagList.map((item) => item.name).includes(newTag)) {
      Toast.error("该标签已存在");
      return;
    }
    setVisible(false);
    const res: any = await createTag(newTag);
    if (res.code == 200) {
      Toast.success("新增成功");
      setNewTag("");
      getTags();
    } else {
      Toast.error("新增失败");
    }
  };
  const handleCancel = () => {
    setVisible(false);
    setNewTag("");
  };

  const timerender = (text: any) => {
    return formatDateMilli(text);
  };

  // 标签编辑相关
  const [editorVisible, setEditorVisible] = useState(false);
  const [editorTag, setEditorTag] = useState("");
  const [editorTagID, setEditorTagID] = useState(0);
  // TODO 标签编辑确认
  const handleEditorOk = async () => {
    setEditorVisible(false);
    console.log(editorTag, editorTagID);
    const res: any = await updateTag(editorTagID, editorTag);
    if (res.code == 200) {
      getTags();
      Toast.success("更新成功");
    } else {
      Toast.error("编辑失败");
    }
  };
  // 标签编辑取消监听
  const handleEditorCancel = () => {
    setEditorVisible(false);
  };
  // 标签操作渲染
  const operaterender = (_text: any, record: ReqManageTag) => {
    const handleeditor = () => {
      setEditorTag(record.name);
      setEditorTagID(record.id);
      setEditorVisible(true);
    };
    // 标签删除
    const ConfirmDeleteTag = async (id: number) => {
      setTagList(TagList.filter((item) => item.id !== id));
      const res: any = await deleteTag(id);
      getTags();
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
          onClick={handleeditor}
        >
          编辑
        </Button>
        <Popconfirm
          okType="danger"
          title={`确认删除标签[${record.name}]?`}
          content="此修改将不可逆"
          onConfirm={() => {
            ConfirmDeleteTag(record.id);
          }}
        >
          <Button type="danger">删除</Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <div className="tag-manage">
      <Button
        onClick={showDialog}
        style={{ marginBottom: "10px" }}
        icon={<IconPlus />}
      >
        新增
      </Button>
      <Modal
        title="新增标签"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        <Input
          placeholder="请输入标签名称"
          value={newTag}
          onChange={(value) => {
            setNewTag(value);
          }}
        />
      </Modal>
      <Table
        dataSource={TagList}
        pagination={{
          currentPage,
          pageSize,
          total,
          onPageChange: handlePageChange,
        }}
        rowKey="uuid"
      >
        <Column title="ID" dataIndex="id" key="1" />
        <Column title="标签名称" dataIndex="name" key="2" />
        <Column title="文章数" dataIndex="count" key="3" />
        <Column
          title="创建时间"
          dataIndex="created_at"
          key="4"
          render={timerender}
        />
        <Column
          align="center"
          title="操作"
          dataIndex="id"
          key="5"
          render={operaterender}
        />
      </Table>
      <Modal
        title="编辑标签"
        visible={editorVisible}
        onOk={handleEditorOk}
        onCancel={handleEditorCancel}
        closeOnEsc={true}
      >
        <Input
          placeholder="请输入标签名称"
          value={editorTag}
          onChange={(value) => {
            setEditorTag(value);
          }}
        />
      </Modal>
    </div>
  );
};

export default TagManage;
