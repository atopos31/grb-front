import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  duotoneLight
} from "react-syntax-highlighter/dist/esm/styles/prism";
import "./index.scss";

type tProps = {
  textContent: string;
  darkMode: boolean; //用来控制代码主题样式
};

const them = {
  dark: vscDarkPlus,
  light: duotoneLight,
};

const OmsViewMarkdown = (props: tProps) => {
  const { textContent, darkMode } = props; 
  return (
    <div className="result" style={{width: "100%"}}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                showLineNumbers={true}
                // 这里修改了源码 style?: { [key: string]: React.CSSProperties } ; => style: { [key: string]: React.CSSProperties }| CSSProperties ;
                style={darkMode ? them.dark : them.light}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {textContent}
      </ReactMarkdown>
    </div>
  );
};

export default OmsViewMarkdown;
