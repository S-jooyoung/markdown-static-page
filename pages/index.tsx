import PostCardColumn from "../components/post-card-column";
import PostCard from "../components/post-card";

import fs from "fs";
import { GetStaticProps } from "next";
interface HomeProps {
  posts: string[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <PostCardColumn>
      <PostCard posts={posts}></PostCard>
    </PostCardColumn>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const postFileNames = fs.readdirSync("./__posts");

  return {
    props: {
      posts: postFileNames.map((fileName) => fileName.replace(".md", "")),
    },
  };
};
