import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import uri from "react-syntax-highlighter/dist/esm/languages/prism/uri";
import style from "react-syntax-highlighter/dist/esm/styles/prism/lucario";

SyntaxHighlighter.registerLanguage("uri", uri);

const URIDisplay = ({ children }) => {
  return (
    <SyntaxHighlighter language="uri" style={style}>
      {children}
    </SyntaxHighlighter>
  );
};

export default URIDisplay;
