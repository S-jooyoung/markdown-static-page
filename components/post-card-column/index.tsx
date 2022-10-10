import React from "react";

interface PostCardColumnProps {
  children: JSX.Element;
}

const PostCard = ({ children }: PostCardColumnProps) => {
  return <div className="post-card-column-wrapper">{children}</div>;
};

export default PostCard;
