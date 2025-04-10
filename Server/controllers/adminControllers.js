import express from 'express';
import { con } from '../config/db.js'

export const getAllCourses= async (req, res) => {
    try {
        const getAll_query="SELECT * FROM course";
        await con.query(getAll_query,(err, result) =>{
            if(err){
                console.log('error', err)
                res.status(400).json({error:err});
            }
            else
            {
                console.log('result', result.rows)
                res.status(200).json({data:result.rows});
            }
        });
    } catch (error) {
        res.status(500).json({error:"Server error!"});
    }
}

export const createCourse = async (req, res) => {
    const { title, description, thumbnail, video } = req.body;

    // Validate input fields
    if (!title || !description || !thumbnail || !video) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    try {
        // Check if course with the same title already exists
        const checkQuery = `SELECT * FROM course WHERE courseName = $1`;
        const checkResult = await con.query(checkQuery, [title]);

        if (checkResult.rows.length > 0) {
            return res.status(409).json({ error: "Course with this title already exists" });
        }

        // Insert new course
        const insertQuery = `
            INSERT INTO course (courseName, description, thumbnail, videoPath) 
            VALUES ($1, $2, $3, $4) RETURNING *`;

        const insertResult = await con.query(insertQuery, [title, description, thumbnail, video]);

        console.log('Course created:', insertResult.rows[0]);
        res.status(201).json({ data: insertResult.rows[0] });

    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if course exists
        const checkQuery = `SELECT * FROM course WHERE id = $1`;
        const checkResult = await con.query(checkQuery, [id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Delete course
        const deleteQuery = `DELETE FROM course WHERE id = $1`;
        await con.query(deleteQuery, [id]);

        console.log('Course deleted:', id);
        res.status(200).json({ message: "Course deleted successfully" });

    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, thumbnail, video } = req.body;

    
    if (!title && !description && !thumbnail && !video) {
        return res.status(400).json({ error: "Please provide at least one field to update" });
    }

    try {
       
        const checkQuery = `SELECT * FROM course WHERE id = $1`;
        const checkResult = await con.query(checkQuery, [id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Build dynamic update query
        const fields = [];
        const values = [];
        let idx = 1;

        if (title) {
            fields.push(`courseName = $${idx++}`);
            values.push(title);
        }
        if (description) {
            fields.push(`description = $${idx++}`);
            values.push(description);
        }
        if (thumbnail) {
            fields.push(`thumbnail = $${idx++}`);
            values.push(thumbnail);
        }
        if (video) {
            fields.push(`videoPath = $${idx++}`);
            values.push(video);
        }

        values.push(id); // Add ID as last parameter

        const updateQuery = `
            UPDATE course 
            SET ${fields.join(', ')} 
            WHERE id = $${idx} 
            RETURNING *`;

        const updateResult = await con.query(updateQuery, values);

        console.log('Course updated:', updateResult.rows[0]);
        res.status(200).json({ data: updateResult.rows[0] });

    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const courseDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const getCourse_query = `SELECT * FROM course WHERE id = $1`;
        await con.query(getCourse_query, [id], (err, result) => {
            if (err) {
                console.log('error', err)
                res.status(400).json({ error: err });
            } else {
                console.log('result', result.rows)
                res.status(200).json({ data: result.rows });
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: "Server error!" });
    }
};