
const db = require("../config/db"); // Ensure db is correctly imported

const getAllCourses = async () => {
        try {
            const result = await db.query("SELECT * FROM course");

        console.log("res model",result.rows)

            return result.rows;
        } catch (error) {
            throw new Error("Error fetching courses: " + error.message);
        }
    };

    const getEnrolledCourses = async (userId) => {
      try {
        const query = `
          SELECT c.* FROM enrollments e
          JOIN courses c ON c.id = e.course_id
          WHERE e.user_id = $1
        `;
        const result = await db.query(query, [userId]);
        return result.rows;
      } catch (error) {
        throw error;
      }
    };
       

    const createCourse = async (courseData) => {
        try {      
          // Insert new course
          const insertQuery = `
            INSERT INTO course (title, description, thumbnail, videopath ,instractor) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      
          const insertResult = await db.query(insertQuery, [
            courseData.title,
            courseData.description,
            courseData.thumbnail,
            courseData.videopath,
            courseData.instractor
          ]);
      
          return insertResult.rows[0];
        } catch (error) {
          throw error;
        }
    };
const deleteCourse = async (id) => {
        try {
          // Check if course exists
          const checkQuery = `SELECT * FROM course WHERE id = $1`;
          const checkResult = await db.query(checkQuery, [id]);
      
          if (checkResult.rows.length === 0) {
            throw new Error("Course not found");
          }
      
          // Delete course
          const deleteQuery = `DELETE FROM course WHERE id = $1`;
          await db.query(deleteQuery, [id]);
        } catch (error) {
          throw error;
        }
    };
const updateCourse = async (id, courseData) => {
        try {
          // Check if course exists
          const checkQuery = `SELECT * FROM course WHERE id = $1`;
          const checkResult = await db.query(checkQuery, [id]);
      
          if (checkResult.rows.length === 0) {
            throw new Error("Course not found");
          }
      
          // Build dynamic update query
          const fields = [];
          const values = [];
          let idx = 1;
      
          if (courseData.title) {
            fields.push(`courseName = $${idx++}`);
            values.push(courseData.title);
          }
          if (courseData.description) {
            fields.push(`description = $${idx++}`);
            values.push(courseData.description);
          }
          if (courseData.thumbnail) {
            fields.push(`thumbnail = $${idx++}`);
            values.push(courseData.thumbnail);
          }
          if (courseData.video) {
            fields.push(`videoPath = $${idx++}`);
            values.push(courseData.videopath);
          }
          if (courseData.instractor) {
            fields.push(`instractor = $${idx++}`);
            values.push(courseData.instractor);
          }
      
          values.push(id); // Add ID as last parameter
      
          const updateQuery = `
            UPDATE course 
            SET ${fields.join(', ')} 
            WHERE id = $${idx} 
            RETURNING *`;
      
          const updateResult = await db.query(updateQuery, values);
      
          return updateResult.rows[0];
        } catch (error) {
          throw error;
        }
    };    
      
const getCourseDetails = async (id) => {
        try {
          const getCourse_query = `SELECT * FROM course WHERE id = $1`;
          const result = await db.query(getCourse_query, [id]);
          return result.rows[0];
        } catch (error) {
          throw error;
        }
    };
      

module.exports = { getAllCourses ,createCourse , deleteCourse , updateCourse , getCourseDetails , getEnrolledCourses};