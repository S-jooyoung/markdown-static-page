import React from "react";

interface PostContentProps {
  html: string;
}

const PostContent = ({ html }: PostContentProps) => {
  return (
    <div className="post__content">
      <div className="__markdown" dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};

export default PostContent;
