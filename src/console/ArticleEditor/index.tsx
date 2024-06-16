import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useContext, useEffect, useRef, useState } from "react";
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
import {
  ArticleData,
  createArticle,
  getArticle,
  updateArticle,
} from "../../request/req_article";
import { ReqCate, getCateList } from "../../request/req_cate";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/time";
import { FileItem } from "@douyinfe/semi-ui/lib/es/upload";
import { ReqTag, getHotTagList } from "../../request/req_tag";

const ArticleEditor = () => {
  const isDark = useContext(ThemeContext);
  const tagInputRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [coverImg, setCoverImg] = useState<string>("");
  const [tags, setags] = useState<string[]>([]); //标签
  const [cate, setcate] = useState<number>(); //当前选择的分类
  const [top, setop] = useState<boolean>(false); //置顶
  const [time, setTime] = useState<Date>();
  const [uuid, setUuid] = useState<number>();
  const [status, setStatus] = useState<number>(1);
  const [defalutImg, setDefalutImg] = useState<FileItem[]>([]);
  // 获取分类
  const [cates, setcates] = useState<{ value: number; label: string }[]>([]); // 所有分类
  useEffect(() => {
    const getCates = async () => {
      const res = await getCateList();
      const tcates: { value: number; label: string }[] = [];
      res.data.map((item: ReqCate) => {
        tcates.push({ value: item.id, label: item.name });
      });
      console.log(tcates);
      setcates(tcates);
    };
    getCates();
  }, []);

  // 获取热门标签
  const [hotTags, setHotTags] = useState<string[]>([]); // 热门标签
  useEffect(() => {
    const getHotTags = async () => {
      const res = await getHotTagList(5);
      setHotTags(res.data.map((tag: ReqTag) => tag.name));
    };
    getHotTags();
  }, []);

  // 编辑文章 获取文章信息
  const { euuid } = useParams();
  useEffect(() => {
    if (euuid == undefined) return;
    console.log(euuid);
    const initArticle = async () => {
      const res = await getArticle(euuid);
      const Article = res.data;
      setcate(Article.category_id);
      setTitle(Article.title);
      Article.tags.map((item: any) => {
        tags.push(item.name);
      });
      setags(tags);
      setop(Article.top == 1);
      setText(Article.content);
      setCoverImg(Article.cover_image);
      if (Article.cover_image != "") {
        setDefalutImg([
          {
            uid: "1",
            url: Article.cover_image,
            name: "image-1.jpg",
            status: "success",
            size: "130KB",
            preview: true,
          },
        ]);
      }
      setTime(formatDate(Article.created_at));
      setUuid(Article.uuid);
      setStatus(Article.status);
      console.log(Article);
    };
    initArticle();
  }, []);

  // 发布/更新/存草稿文章
  const navigate = useNavigate();
  const Submmit = async (tmpstatus: number) => {
    const Article: ArticleData = {
      title: title,
      content: text,
      tags: tags,
      category_id: Number(cate),
      top: top ? 1 : 0,
      cover_image: coverImg,
      created_at: time?.getTime().toString() ?? "",
      status: tmpstatus,
    };
    const res: any = await (uuid
      ? updateArticle(Article, uuid)
      : createArticle(Article));
    if (res.code == 400) {
      Toast.error("参数不全");
      return;
    }
    if (res.code == 200) {
      Toast.success((uuid && status) || !tmpstatus ? "更新成功" : "发布成功");
      // 第一次发布设置uuid
      uuid ?? setUuid(Number(res.data.uuid));
      // 第一次发布后跳转
      uuid ??
        navigate(`/console/article/editor/${res.data.uuid}`, { replace: true });
      setStatus(res.data.status);
    }
  };

  // 通过点击最多使用的标签来添加标签
  const tagAdd = (e: any) => {
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
    <div className="articleeditor">
      {/* 选项输入 */}
      <div className="input">
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
            className="cateselect"
            prefix={"分类"}
            onChange={onChangeCate}
            value={cate}
            optionList={cates}
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
          <div className="tags">
            <a className="mostuse">最多使用:</a>
            {hotTags.map((tag) => (
              <Button type="primary" size="small" onClick={tagAdd}>
                {tag}
              </Button>
            ))}

            <div className="switchtop">
              <a className="mostuse">是否置顶:</a>
              <Switch
                checked={top}
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
            fileList={defalutImg}
            onChange={(fileLIst) => {
              setDefalutImg(fileLIst.fileList);
            }}
            onSuccess={(imgurl) => setCoverImg(imgurl)}
            onRemove={() => {
              setDefalutImg([]);
              setCoverImg("");
            }}
            customRequest={mockRequest}
            listType="picture"
          >
            <Button>上传封面</Button>
          </Upload>
        </div>
        {/* 发布 */}
        <div className="commit">
          <Button
            theme="solid"
            type="primary"
            style={{ height: "30%", fontSize: "20px" }}
            onClick={() => {
              Submmit(1);
            }}
          >
            {uuid && status == 1 ? "更新文章" : "发布文章"}
          </Button>
          <Button
            theme="light"
            type="primary"
            style={{ height: "30%", fontSize: "20px" }}
            onClick={() => {
              Submmit(0);
            }}
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
