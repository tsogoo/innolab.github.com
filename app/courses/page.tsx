
import { getAllCourses } from "@/lib/api";

export const dynamic = "force-static"


const CoursePage = async ({ params }: any) => {
  const courses = await getAllCourses(true);
  return (
    <div className="container mx-auto px-5">
      {courses.map((course: any) => (
        <div key={course.slug} className="mb-8">
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <p className="text-lg font-semibold">Үнэ: {course.price} MNT</p>
          <a href={`/courses/${course.slug}`} className="text-blue-500 hover:underline">
            Сургалт үзэх
          </a> 
        </div>
      ))}
    </div>
  );
}

export default CoursePage;