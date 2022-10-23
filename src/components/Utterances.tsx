import { memo } from 'react';

const Utterances = () => {
  return (
    <section
      ref={(elem) => {
        if (!elem) return;
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://utteranc.es/client.js';
        scriptElement.async = true;
        scriptElement.crossOrigin = 'anonymous';
        scriptElement.setAttribute('repo', 'ddanmuji/blog-with-nextjs');
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('theme', 'github-dark-orange');
        elem.appendChild(scriptElement);
      }}
    />
  );
};

export default memo(Utterances);
