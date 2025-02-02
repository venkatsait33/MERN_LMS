import { Course } from "../models/course.model.js"
import { Lecture } from "../models/lecture.model.js"
import { deleteVideoFromCloudinary } from "../utils/cloudinary.js"

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body
        const { courseId } = req.params

        if (!lectureTitle || !courseId) {
            return res.status(400).json({ message: "Please provide lecture title" })
        }
        const lecture = await Lecture.create({ lectureTitle })

        const course = await Course.findById(courseId)

        if (course) {
            course.lectures.push(lecture._id)
            await course.save()
        }
        return res.status(201).json({ message: "Lecture created successfully", lecture })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to create lecture" });

    }
}

export const getCourseLectures = async (req, res) => {
    try {
        const { courseId } = req.params

        const course = await Course.findById(courseId).populate("lectures")

        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        return res.status(200).json({ message: "Lectures fetched successfully", lectures: course.lectures })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to fetch lecture" });
    }
}

export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;
        const { courseId, lectureId } = req.params;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" })
        }
        // update lecture
        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
        lecture.isPreviewFree = isPreviewFree;
        await lecture.save();

        // ensure the course has the lecture id
        const course = await Course.findById(courseId);

        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(200).json({ message: "Lecture updated successfully", lecture })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to edit lecture" })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await Lecture.findByIdAndDelete(lectureId);
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

        return res.status(200).json({ message: "Lecture removed successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to remove lecture" })
    }
}

export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" })
        }
        return res.status(200).json({ lecture, message: "Lecture fetched successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to fetch lecture" })
    }
}

export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query; // true or false

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        // publish course according to the publish value
        course.isPublished = publish === "true";

        await course.save();

        const statusMessage = course.isPublished ? "published" : "unpublished";

        return res.status(200).json({ message: `Course ${statusMessage} successfully` })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to publish lecture" })
    }
}