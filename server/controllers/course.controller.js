import { Course } from "../models/course.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
    try {

        const { courseTitle, category } = req.body

        if (!courseTitle || !category) {
            return res.status(400).json({ message: 'Please fill all fields' })
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        });
        return res.status(201).json({
            course,
            message: 'Course created successfully',
            success: true
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: error.message })
    }
}

export const getCreatorCourses = async (req, res) => {
    try {

        const userId = req.id;
        const courses = await Course.find({ creator: userId })
        if (!courses) {
            return res.status(404).json({ message: 'No course found', course: [] })
        }
        return res.status(200).json({ courses, message: 'Course found', success: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, category, coursePrice, description, courseLevel } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ message: 'Course not found', success: false })
        }

        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split('/').pop().split(".")[0]
                await deleteMediaFromCloudinary(publicId)
            }
            courseThumbnail = await uploadMedia(thumbnail.path)
        }

        const updateData = { courseTitle, subTitle, category, coursePrice, description, courseLevel, courseThumbnail: courseThumbnail?.secure_url }

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true })
        return res.status(200).json({ message: 'Course updated successfully', success: true, course })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found', success: false })
        }

        return res.status(200).json({ message: 'Course fetched successfully', success: true, course })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}