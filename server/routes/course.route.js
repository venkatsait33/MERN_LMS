import express from 'express'
import { createCourse, deleteCourse, editCourse, getCourseById, getCreatorCourses, getPublishedCourses, searchCourse } from '../controllers/course.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../utils/multier.js';
import { createLecture, editLecture, getCourseLectures, getLectureById, removeLecture, togglePublishCourse } from '../controllers/lecture.controller.js';

const router = express.Router()

router.route('/').get(isAuthenticated, getCreatorCourses);
router.route('/search').get(isAuthenticated, searchCourse)
router.route('/').post(isAuthenticated, createCourse);
router.route('/published-courses').get(getPublishedCourses);
router.route('/:courseId').put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route('/:courseId').get(isAuthenticated, getCourseById);
router.route('/:courseId').patch(isAuthenticated, togglePublishCourse);
router.route('/:courseId').delete(isAuthenticated, deleteCourse);


// routes for lecture controller

router.route('/:courseId/lecture').post(isAuthenticated, createLecture);
router.route('/:courseId/lecture').get(isAuthenticated, getCourseLectures);
router.route('/:courseId/lecture/:lectureId').post(isAuthenticated, editLecture);
router.route('/lecture/:lectureId').delete(isAuthenticated, removeLecture);
router.route('/lecture/:lectureId').get(isAuthenticated, getLectureById);


export default router