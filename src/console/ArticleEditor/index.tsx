import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../App";
import {
  Button,
  Input,
  Select,
  Switch,
  TagInput,
  Upload,
} from "@douyinfe/semi-ui";
import "./editor.css";
import { markdownUpImg ,mockRequest} from "../../utils/ossUpLoad";

const ArticleEditor = () => {
  const isDark = useContext(ThemeContext);
  const tagInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("hello md-editor-rt！");
  const [coverImg,setCoverImg] = useState("");
  const [tags, setags] = useState<string[]>([]);
  const [cate, setcate] = useState<string>();
  const [top, setop] = useState(false);

  const list = [
    { value: "abc", label: "抖音", otherKey: 0 },
    { value: "jianying", label: "剪映", otherKey: 1 },
    { value: "toutiao", label: "今日头条", otherKey: 2 },
  ];
  //发布文章
  const Submmit = () => {
    console.log(title, text, tags, cate, top,coverImg);
  };
  //通过点击添加标签
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
    setcate(v);
  };

  const onChangeTitle = (v: any) => {
    setTitle(v);
  };

  return (
    <div className="articleeditor" style={{ width: "100%", padding: "20px" }}>
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
        <div className="upload">
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
            发布文章
          </Button>
          <Button
            theme="light"
            type="primary"
            style={{ height: "30%", fontSize: "20px" }}
          >
            存为草稿
          </Button>
        </div>
      </div>
      <MdEditor
        className="editor"
        // style={{ height: "80%" }}
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
