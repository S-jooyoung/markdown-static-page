import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";

import PostContent from "../../components/post-content";

import matter from "gray-matter";
import { unified } from "unified";
import Head from "next/head";

import remarkParse from "remark-parse/lib";
import remarkStringify from "remark-stringify/lib";
import remarkPrism from "remark-prism";
import remarkHtml from "remark-html";

interface PostPageProps {
  data: string;
  meta: {
    title: string;
    date: string;
    description: string;
  };
}

const PostPage = ({ data, meta }: PostPageProps) => {
  const { title } = meta;

  return (
    <>
      <Head>
        <div className="post__title">{title}</div>
      </Head>
      <PostContent html={data} />
    </>
  );
};

export default PostPage;

/**
 * 정적 페이지 데이터 생성
 * @param context
 * @returns props:{data , meta}
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const { id } = params as { id: string };

  const post = fs.readFileSync(path.join(`__posts/${id}.md`));
  const { data, content } = matter(post);
  const html = await unified() //
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkPrism)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    props: {
      data: html.value,
      meta: {
        title: data.title || "Blog post page",
        date: data.date || "",
        description: data.description || "",
      },
    },
  };
};

/**
 * 포스트 상세 페이지 경로 생성
 * @returns paths, fallback
 */
export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = fs.readdirSync(path.join("__posts"));

  const paths = postFileNames.map((fileName) => ({
    params: {
      id: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
