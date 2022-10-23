import { FC } from 'react';
import SyntaxHighlight from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const CopyButton = ({ target }: { target: string }) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target);
        alert('copied');
      } catch (error) {
        alert(`copied failed ${error}`);
      }
    }
  };

  return (
    <button
      className="absolute right-2 top-2 rounded-lg px-2 bg-white dark:text-gray-800"
      onClick={handleCopy}
    >
      copy
    </button>
  );
};

const CodeBlock: FC<{ children: string }> = ({ children }) => {
  return (
    <div className="relative">
      <CopyButton target={children} />
      <SyntaxHighlight showLineNumbers style={rainbow}>
        {children}
      </SyntaxHighlight>
    </div>
  );
};

export default CodeBlock;
