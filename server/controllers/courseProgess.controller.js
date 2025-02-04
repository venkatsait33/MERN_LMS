import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";

export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        // step-1 fetch the user course progress
        let courseProgress = await CourseProgress.findOne({
            courseId,
            userId,
        }).populate("courseId");

        const courseDetails = await Course.findById(courseId).populate("lectures");

        if (!courseDetails) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        // Step-2 If no progress found, return course details with an empty progress
        if (!courseProgress) {
            return res.status(200).json({
                data: {
                    courseDetails,
                    progress: [],
                    completed: false,
                },
            });
        }

        // Step-3 Return the user's course progress alog with course details
        return res.status(200).json({
            data: {
                courseDetails,
                progress: courseProgress.lectureProgress,
                completed: courseProgress.completed,
            },
        });
    } catch (error) {
        console.log(error);
    }
};


export const updateLectureProgress = async (req, res) => {
    try {

        const { courseId, lectureId } = req.params;
        const userId = req.id;

        //step-1 find course progress
        let courseProgress = await CourseProgress.findOne({ courseId, userId });

        if (!courseProgress) {
            //step-2 if no progress of course, create new instance to  course progress
            courseProgress = new CourseProgress({
                userId,
                courseId,
                completed: false,
                lectureProgress: [],
            });
        }

        //step-3 find lecture progress
        // her lecture progress is return as array if the lecture index is same as lecture id from the course progress
        const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId === lectureId);

        if (lectureIndex !== -1) {
            //step-4 if lecture exits, update lecture progress
            courseProgress.lectureProgress[lectureIndex].viewed = true;
        } else {
            //step-5 if lecture not exits, add new lecture progress
            courseProgress.lectureProgress.push({
                lectureId,
                viewed: true
            });
        }

        // if all lecture is completed, mark course as completed
        // here it will check if all lecture is viewed or not and return the length of viewed lecture
        const lectureProgressLength = courseProgress.lectureProgress.filter((lectureProgs) => lectureProgs.viewed).length;

        // we check and compare course lecture length and lecture progress length
        const course = await Course.findById(courseId);
        // if the course.length and lectureProgressLength is equal then we mark the course as completed
        if (course.lectures.length === lectureProgressLength) {
            courseProgress.completed = true;
        }

        await courseProgress.save();

        return res.status(200).json({ message: "lecture progress updated successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while updating lecture progress" });
    }
}

export const markLecturesAsCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        const courseProgress = await CourseProgress.findOne({ courseId, userId });

        if (!courseProgress) {
            return res.status(404).json({ message: "course progress not found" });
        }

        // we mark all lectures as viewed by setting viewed status to true in lectureProgress
        courseProgress.lectureProgress.map((lectureProgress) => {
            lectureProgress.viewed = true;
        })

        // if all lectures are viewed status true then we mark the course as completed
        courseProgress.completed = true;

        await courseProgress.save();
        return res.status(200).json({ message: "Course marked as completed" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error while marking lectures as completed" });

    }
}

export const markLectureAsInCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        const courseProgress = await CourseProgress.findOne({ courseId, userId });

        if (!courseProgress) {
            return res.status(404).json({ message: "course progress not found" });
        }

        // we mark all lectures setting viewed status to false in lectureProgress
        courseProgress.lectureProgress.map((lectureProgress) => {
            lectureProgress.viewed = false;
        })
        // we mark the course as inCompleted based on the lectureProgress viewed status
        courseProgress.completed = false;

        await courseProgress.save();
        return res.status(200).json({ message: "Course marked as inCompleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " error while marking lectures as completed" });

    }
}