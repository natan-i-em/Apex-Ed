const courseModel = require("../model/courseModel");

exports.getAllCourses = async (req, res) => {
    try {
        const result = await courseModel.getAllCourses();
        console.log("res",result)
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.getEnrollments = async (req, res) => {
     const user_Id = req.body.id
    try {
        const result = await courseModel.getEnrolledCourses(user_Id);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


exports.createCourse = async (req, res) => {
    const { title, description, thumbnail, videopath ,instractor} = req.body;
  
    // Validate input fields
    if (!title || !description || !thumbnail || !videopath || !instractor) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
  
    try {
      const courseData = { title, description, thumbnail, videopath , instractor };
      const createdCourse = await courseModel.createCourse(courseData);
      res.status(201).json({ data: createdCourse });
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
  
    try {
      await courseModel.deleteCourse(id);
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, thumbnail, video } = req.body;
  
    if (!title && !description && !thumbnail && !video) {
      return res.status(400).json({ error: "Please provide at least one field to update" });
    }
  
    try {
      const updatedCourse = await courseModel.updateCourse(id, { title, description, thumbnail, video });
      res.status(200).json({ data: updatedCourse });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: "Internal server error" });
    }
};

exports.courseDetails = async (req, res) => {
    const { id } = req.params;
    try {
      const course = await courseModel.getCourseDetails(id);
      res.status(200).json({ data: course });
    } catch (error) {
      console.error('Error getting course details:', error);
      res.status(500).json({ error: "Internal server error" });
    }
};
