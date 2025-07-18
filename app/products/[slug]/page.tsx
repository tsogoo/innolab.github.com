import Link from "next/link";

import MoreStories from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllPosts, getAllProducts, getProductAndMoreProducts } from "@/lib/api";

export const dynamic = "force-static"

export async function generateStaticParams() {
  const products = await getAllProducts(true);

  return products.map((product) => ({
    slug: product.slug,
  }));
}

type PageProps = {
  params: {
    slug: string;
  };
};

const PostPage = async ({ params }: any) => {
  const { product, moreProducts } = await getProductAndMoreProducts(params.slug, true);

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
          {product.title}
        </h1>
        <Markdown content={product.content} />
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-lg">
            <Date dateString={product.date} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
    </div>
  );
}

export default PostPage;