import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { useState } from "react";
import "./index.scss";

type tProps = {
  textContent: string | undefined;
  darkMode: boolean; //用来控制代码主题样式
};



const OmsViewMarkdown = (props: tProps) => {
  const { textContent, darkMode } = props; 
  const [id] = useState('preview-only');
  return (
    <div className="result" style={{width: "100%"}}>
      <MdPreview editorId={id} modelValue={textContent as string} theme= {darkMode ? 'dark' : 'light'} previewTheme="github" codeTheme="github" />
    </div>
  );
};

export default OmsViewMarkdown;
