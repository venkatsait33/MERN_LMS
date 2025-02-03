import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { createCheckOutSession, getAllPurchasedCourses, getCourseDetailsWithPurchaseStatus, stripeWebhook } from '../controllers/purchaseCourses.controller.js'

const router = express.Router()

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckOutSession)
router.route("/webhook").post(express.raw({ type: 'application/json' }), stripeWebhook)
router.route("/course/:courseId/details-with-status").get(isAuthenticated, getCourseDetailsWithPurchaseStatus);
router.route('/').get(getAllPurchasedCourses);

export default router