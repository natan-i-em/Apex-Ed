'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { RoleProtected } from "@/components/RoleProtected";
import CourseCard from "@/components/CourseCard"; // Assuming Card component is in the components folder

export default function StudentPage() {
  const [courses, setCourses] = useState<{ id: number }[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses/Allcourse");
        setCourses(res.data.data); // Assume API returns all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  return (
    <RoleProtected allowedRoles={["Student"]}>
      <div className="p-6">
        <h1 className="text-3xl text-red-600 font-bold mb-6">Welcome Student!</h1>
        <p className="mb-6 text-lg text-gray-700">This page is only visible to students.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </RoleProtected>
  );
}
