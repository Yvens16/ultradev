import React from 'react';

interface BlockquoteProps {
  text: string;
  author: string;
}

const Blockquote: React.FC<BlockquoteProps> = ({ text, author }) => {
  return (
    <blockquote className="text-gray-400">
      <p>{text}</p>
      <footer>{author}</footer>
    </blockquote>
  );
};

export default Blockquote;
