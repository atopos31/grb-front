import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../App";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Switch,
  TagInput,
  Toast,
  Upload,
} from "@douyinfe/semi-ui";
import "./editor.css";
import { markdownUpImg, mockRequest } from "../../utils/ossUpLoad";
import { createArticle } from "../../request/req_article";

const ArticleEditor = () => {
  const isDark = useContext(ThemeContext);
  const tagInputRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [coverImg, setCoverImg] = useState<string>("");
  const [tags, setags] = useState<string[]>([]); //标签
  const [cate, setcate] = useState<number>(); //分类
  const [top, setop] = useState<boolean>(false); //置顶
  const [time, setTime] = useState<Date>();
  const [uuid, setUuid] = useState<number>();

  // TODO 获取分类列表
  const list = [
    { value: 1, label: "日常", otherKey: 0 },
    { value: 2, label: "技术", otherKey: 1 },
    { value: 3, label: "今日头条", otherKey: 2 },
  ];
  // TODO 发布文章
  const Submmit = async () => {
    if (uuid) return;

    console.log(title, text, tags, cate, top, coverImg, time?.getTime());
    console.log(time?.getTime().toString() ?? "0");
    const res: any = await createArticle({
      title: title,
      content: text,
      tags: tags,
      category_id: Number(cate),
      top: top ? 1 : 0,
      cover_image: coverImg,
      created_at: time?.getTime().toString() ?? "",
      status: 1,
    });
    console.log(res);
    if (res.code == 200) {
      Toast.success("发布成功");
      setUuid(Number(res.data));
    }
  };
  // TODO 更新文章

  // 通过点击最多使用的标签来添加标签
  const tagAdd = (e: any) => {
    console.log(cate);
    let tag = (e.target as HTMLButtonElement).innerText;
    //标签去重
    if (tags.includes(tag)) return;
    //聚焦
    if (tagInputRef.current) {
      (tagInputRef.current as any).focus();
    }
    tags.push(tag);
    setags(tags);
  };

  const onChangeTag = (v: string[]) => {
    setags(v);
  };

  const onChangeCate = (v: any) => {
    console.log(v);
    setcate(v);
  };

  const onChangeTitle = (v: any) => {
    setTitle(v);
  };

  return (
    <div
      className="articleeditor"
      style={{overflowY: "scroll",scrollBehavior: "smooth", width: "100%", padding: "20px", overscrollBehavior: "contain" }}
    >
      {/* 选项输入 */}
      <div className="input" style={{ display: "flex", gap: "20px" }}>
        {/* 标题 分类 标签 */}
        <div className="text-input" style={{ width: "60%" }}>
          <Input
            prefix={"标题"}
            size="large"
            value={title}
            onChange={onChangeTitle}
          ></Input>
          <br />
          <br />
          <Select
            prefix={"分类"}
            onChange={onChangeCate}
            value={cate}
            style={{ width: "100%" }}
            optionList={list}
          ></Select>
          <br />
          <br />
          <TagInput
            ref={tagInputRef}
            allowDuplicates={false}
            prefix={"标签"}
            showClear
            onChange={onChangeTag}
            value={tags}
          />
          <div
            className="tags"
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px 0",
              alignItems: "center",
            }}
          >
            <a style={{ fontSize: "14px", color: "#999" }}>最多使用:</a>
            <Button type="primary" size="small" onClick={tagAdd}>
              测试
            </Button>
            <div
              className="seitch"
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <a style={{ fontSize: "14px", color: "#999" }}>是否置顶:</a>
              <Switch
                onChange={(v) => setop(v)}
                aria-label="a switch for demo"
              ></Switch>
            </div>
          </div>
        </div>
        {/* 封面上传 */}
        <div className="upload" style={{ padding: 10 }}>
          <Upload
            action=""
            limit={1}
            picHeight={145}
            picWidth={360}
            // 在这里接收并设置返回的封面图片地址
            onSuccess={(imgurl) => setCoverImg(imgurl)}
            customRequest={mockRequest}
            listType="picture"
          >
            <Button>上传封面</Button>
          </Upload>
        </div>
        {/* 发布 */}
        <div
          className="commit"
          style={{
            display: "flex",
            gap: "20px",
            flexFlow: "column",
            width: "20%",
            padding: "20px 0",
          }}
        >
          <Button
            theme="solid"
            type="primary"
            style={{ height: "30%", fontSize: "20px" }}
            onClick={Submmit}
          >
            {uuid ? "更新文章" : "发布文章"}
          </Button>
          <Button
            theme="light"
            type="primary"
            style={{ height: "30%", fontSize: "20px" }}
          >
            存为草稿
          </Button>
          <DatePicker
            prefix="发布时间"
            type="dateTime"
            value={time}
            onChange={(v) => {
              setTime(v as Date);
            }}
          />
        </div>
      </div>
      <MdEditor
        className="editor"
        style={{ height: "90vh" }}
        toolbars={["revoke", "next", "save", "preview", "previewOnly"]}
        modelValue={text}
        onChange={setText}
        onUploadImg={markdownUpImg}
        theme={isDark ? "dark" : "light"}
        previewTheme="github"
        codeTheme="github"
      />
    </div>
  );
};

export default ArticleEditor;
