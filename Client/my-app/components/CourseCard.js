import Link from "next/link";

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <Link href={`/course/${course.id}`}>
            <a>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mt-2">{course.description}</p>
            </a>
          </Link>
        </div>
      );
    };
  
export default CourseCard;
