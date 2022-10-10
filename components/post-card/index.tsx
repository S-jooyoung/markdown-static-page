import Link from "next/link";
import styled from "@emotion/styled";

interface PostCardProps {
  posts: string[];
}

const PostCard = ({ posts }: PostCardProps) => {
  return (
    <ul className="post-card-column">
      {posts.map((post) => (
        <Li key={post}>
          <Link href={`/${post}`}>{post}</Link>
        </Li>
      ))}
    </ul>
  );
};

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;
  width: fit-content;
  height: 50px;
  border: #333 1px solid;
  border-radius: 20px;
  list-style: none;
  margin-bottom: 30px;
`;
export default PostCard;
