import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getCourseProgress, markLectureAsInCompleted, markLecturesAsCompleted, updateLectureProgress } from '../controllers/courseProgess.controller.js';

const router = express.Router();

router.route('/:courseId').get(isAuthenticated, getCourseProgress);
router.route('/:courseId/lecture/:lectureId/view').post(isAuthenticated, updateLectureProgress);
router.route('/:courseId/complete').post(isAuthenticated, markLecturesAsCompleted)
router.route('/:courseId/incomplete').post(isAuthenticated, markLectureAsInCompleted)

export default router;