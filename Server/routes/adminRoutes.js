import express from "express"
import {
    getAllCourses,
    courseDetails,
    createCourse,
    deleteCourse,
    updateCourse
} from "../controllers/adminControllers.js"

const router =express.Router();


// admin course CRUD operation
router.get("/course", getAllCourses);
router.get("/course/:id", courseDetails);
router.post("/createCourse", createCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.put("/updateCourse/:id", updateCourse);


export default router;