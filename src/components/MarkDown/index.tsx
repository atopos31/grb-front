import "./index.scss";
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { useState } from "react";

type tProps = {
  textContent: string;
  darkMode: boolean; //用来控制代码主题样式
};



const OmsViewMarkdown = (props: tProps) => {
  const { textContent, darkMode } = props; 
  const [id] = useState('preview-only');
  return (
    <div className="result" style={{width: "100%"}}>
      <MdPreview editorId={id} modelValue={textContent} theme= {darkMode ? 'dark' : 'light'} previewTheme="github" codeTheme="github" />
    </div>
  );
};

export default OmsViewMarkdown;
