import { Button, Checkbox, Input, Popover, TextArea, Toast } from "@douyinfe/semi-ui";
import "./index.scss";
import { IconComment } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import { createRootComment, FormState } from "../../request/req_comment";

interface CommentProps {
  uuid: number | undefined;
}

const CommentForm = (commentProps: CommentProps) => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    website: "",
    content: "",
    isSave: false,
  });

  useEffect(() => {
    const strForm = localStorage.getItem("formState")
    if (!strForm) return
    const savedFormState:FormState = JSON.parse(strForm);
    if (savedFormState) {
      setFormState((prevState) => ({
        ...prevState,
        name: savedFormState.name,
        email: savedFormState.email,
        website: savedFormState.website,
        isSave: savedFormState.isSave
      }));
    }
  }, []);


  const handleInputChange = (field: keyof FormState, value: string | boolean | undefined) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const sendComment = async ()=>{
    if (formState.isSave) {
        localStorage.setItem("formState",JSON.stringify(formState))
    } else {
        localStorage.removeItem("formState")
    }
    const res:any = await createRootComment(formState,commentProps.uuid)
    if (res.code == 200) {
        Toast.success("发送成功")
    } else {
        Toast.error("发送失败")
    }
  }

  return (
    <div className="comment">
      <div className="comment-send">
        <IconComment size="large" />
        <p>发送评论</p>
      </div>

      <div className="comment-infos">
        <div className="comment-form">
          <Input
            addonBefore="昵称"
            placeholder="必填"
            value={formState.name}
            onChange={(v) => handleInputChange("name", v)}
          />
          <Popover
            showArrow
            content={
              <article>
                利用邮箱通过cravatar生成头像，收到回复后会发送到你的邮箱
              </article>
            }
            position="top"
          >
            <Input
              addonBefore="邮箱"
              placeholder="必填"
              value={formState.email}
              onChange={(v) => handleInputChange("email", v)}
            />
          </Popover>

          <Popover
            showArrow
            content={<article>可通过点击头像访问你的网站</article>}
            position="top"
          >
            <Input
              addonBefore="网址"
              placeholder="选填"
              value={formState.website}
              onChange={(v) => handleInputChange("website", v)}
            />
          </Popover>
        </div>
        <div className="comment-content">
          <TextArea
            maxCount={100}
            showClear
            placeholder="发一个友善的评论吧！"
            value={formState.content}
            onChange={(v) => handleInputChange("content", v)}
          />
        </div>
        <div className="comment-send-impl">
          <div className="comment-send-impl-options">
            <Checkbox
              checked={formState.isSave}
              onChange={(v) => handleInputChange("isSave", v.target.checked)}
            >
              保存信息
            </Checkbox>
          </div>
          <div className="comment-send-impl-push">
            <Button onClick={sendComment}>发送</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
