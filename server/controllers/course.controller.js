import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found', success: false })
        }

        return res.status(200).json({ message: 'Course fetched successfully', success: true, course })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to fetch course" })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findByIdAndDelete(courseId);
        const lectureId = course.lectures
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found', success: false })
        }
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" })
        }
        // delete the video from cloudinary
        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId);
        }
        // remove the lecture id reference  from the course
        await Course.updateOne({ lectures: lectureId },
            // find the course that has the lecture id
            { $pull: { lectures: lectureId } }
            // remove the lecture id from the lectures array
        )

        return res.status(200).json({ message: 'Course deleted successfully', success: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to delete course" })
    }
}

export const getPublishedCourses = async (_, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({ path: "creator", select: "name photoUrl" });
        if (!courses) {
            return res.status(404).json({
                message: "Course not found"
            })
        }
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get published courses"
        })
    }
}