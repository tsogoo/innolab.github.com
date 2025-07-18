import Link from "next/link";

import Date from "../../date";

import { Markdown } from "@/lib/markdown";
import { getAllCourses, getCourseAndMoreCourses } from "@/lib/api";

export const dynamic = "force-static"

export async function generateStaticParams() {
  const courses = await getAllCourses(true);

  return courses.map(( course:any) => ({
    slug: course.slug,
  }));
}


const CourcePage = async ({ params }: any) => {
  const { course  } = await getCourseAndMoreCourses(params.slug, true);

  return (
    <div className="container mx-auto px-5">
      <article>
        <h1 className="mb-12 text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-5xl">
          {course.title}
        </h1>
        <Markdown content={course.content} />
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-lg">
            <Date dateString={course.date} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
    </div>
  );
}

export default CourcePage;