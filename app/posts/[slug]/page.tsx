import Link from "next/link";

import MoreStories from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export const dynamic = "force-static"

export async function generateStaticParams() {
  const allPosts = await getAllPosts(true);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

type PageProps = {
  params: {
    slug: string;
  };
};

const PostPage = async ({ params }: any) => {
  const { post, morePosts } = await getPostAndMorePosts(params.slug, true);

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Блог
        </Link>
        .
      </h2>
      <article>
        <h1 className="mb-12 text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-5xl">
          {post.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={post.title} url={post.coverImage.url} />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg">
            <Date dateString={post.date} />
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="prose">
            <Markdown content={post.content} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}

export default PostPage;