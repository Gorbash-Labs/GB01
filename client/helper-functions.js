import React from 'react';
import ReactMarkdown from 'react-markdown';

const helperFunctions = {};

helperFunctions.md = (markdownText) => {
  return <ReactMarkdown>{markdownText}</ReactMarkdown>;
};

export default helperFunctions;
