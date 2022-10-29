import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import style from "react-syntax-highlighter/dist/esm/styles/prism/vs-dark";

SyntaxHighlighter.registerLanguage("json", json);

const JSONDisplay = ({ children }) => {
  return (
    <SyntaxHighlighter language="json" style={style}>
      {children}
    </SyntaxHighlighter>
  );
};

export default JSONDisplay;
