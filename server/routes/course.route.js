import express from 'express'
import { createCourse, editCourse, getCourseById, getCreatorCourses } from '../controllers/course.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../utils/multier.js';
import { createLecture, getCourseLectures } from '../controllers/lecture.controller.js';

const router = express.Router()

router.route('/').get(isAuthenticated, getCreatorCourses);
router.route('/').post(isAuthenticated, createCourse);
router.route('/:courseId').put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route('/:courseId').get(isAuthenticated, getCourseById);
router.route('/:courseId/lecture').post(isAuthenticated, createLecture);
router.route('/:courseId/lecture').get(isAuthenticated, getCourseLectures);

export default router