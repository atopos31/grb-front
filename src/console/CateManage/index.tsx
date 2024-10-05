import { useEffect, useState } from "react";
import {
  ReqManageCate,
  createCate,
  deleteCate,
  getCateManageList,
  updateCate,
} from "../../request/req_cate";
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
import "./cateManage.css";
import { IconPlus } from "@douyinfe/semi-icons";

const CategoryManage = () => {
  // 分页数据渲染
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [total, setTotal] = useState(0);
  const [cateList, setCateList] = useState<ReqManageCate[]>();

  const getCates = async () => {
    const res = await getCateManageList(currentPage, pageSize);
    if (res.data.count > 0) {
      setTotal(res.data.count);
      setCateList(res.data.list);
    }
  };

  const handlePageChange = (currentPage: any) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    getCates();
  }, [currentPage]);

  const [visible, setVisible] = useState(false);
  const [newCate, setNewCate] = useState("");

  const showDialog = () => {
    setVisible(true);
  };
  // 新增分类
  const handleOk = async () => {
    if (cateList?.map((item) => item.name).includes(newCate)) {
      Toast.error("该分类已存在");
      return;
    }
    setVisible(false);
    const res: any = await createCate(newCate);
    if (res.code == 200) {
      Toast.success("新增成功");
      setNewCate("");
      getCates();
    } else {
      Toast.error("新增失败");
    }
  };
  const handleCancel = () => {
    setVisible(false);
    setNewCate("");
  };

  const timerender = (text: any) => {
    return formatDateMilli(text);
  };

  // 分类编辑相关
  const [editorVisible, setEditorVisible] = useState(false);
  const [editorCate, setEditorCate] = useState("");
  const [editorCateID, setEditorCateID] = useState(0);
  // TODO 分类编辑确认
  const handleEditorOk = async () => {
    setEditorVisible(false);
    console.log(editorCate, editorCateID);
    const res: any = await updateCate(editorCateID, editorCate);
    if (res.code == 200) {
      getCates();
      Toast.success("更新成功");
    } else {
      Toast.error("编辑失败");
    }
  };
  // 分类操作渲染
  const operaterender = (_text: any, record: ReqManageCate) => {
    const handleeditor = () => {
      setEditorCate(record.name);
      setEditorCateID(record.id);
      setEditorVisible(true);
    };
    // 分类删除
    const ConfirmDeleteCate = async (id: number) => {
      setCateList(cateList?.filter((item) => item.id !== id));
      const res: any = await deleteCate(id);
      getCates();
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
          title={`确认删除分类[${record.name}]?`}
          content="此修改将不可逆"
          onConfirm={() => {
            ConfirmDeleteCate(record.id);
          }}
        >
          <Button type="danger">删除</Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <div className="cate-manage">
      <Button
        onClick={showDialog}
        style={{ marginBottom: "10px" }}
        icon={<IconPlus />}
      >
        新增
      </Button>
      <Modal
        title="新增分类"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        <Input
          placeholder="请输入分类名称"
          value={newCate}
          onChange={(value) => {
            setNewCate(value);
          }}
        />
      </Modal>
      <Table
        dataSource={cateList}
        pagination={{
          currentPage,
          pageSize,
          total,
          onPageChange: handlePageChange,
        }}
        rowKey="uuid"
      >
        <Column title="ID" dataIndex="id" key="1" />
        <Column title="分类名称" dataIndex="name" key="2" />
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
        title="编辑分类"
        visible={editorVisible}
        onOk={handleEditorOk}
        onCancel={() => {
          setEditorVisible(false);
        }}
        closeOnEsc={true}
      >
        <Input
          placeholder="请输入分类名称"
          value={editorCate}
          onChange={(value) => {
            setEditorCate(value);
          }}
        />
      </Modal>
    </div>
  );
};

export default CategoryManage;
