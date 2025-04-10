const express = require("express");
const router =express.Router();
const courseControler = require("../controller/courseController")



// admin course CRUD operation
router.get("/Allcourse", courseControler.getAllCourses);
router.get("/course/:id", courseControler.courseDetails);
router.post("/createCourse", courseControler.createCourse);
router.delete("/deleteCourse/:id", courseControler.deleteCourse);
router.put("/updateCourse/:id", courseControler.updateCourse);


module.exports = router;