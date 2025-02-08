import { useLoadUserQuery } from "@/redux/rtkApi/authApi";
import Course from "./Course";

const MyLearning = () => {
    const { data, isLoading } = useLoadUserQuery()
    
    const myLearningCourses = data?.user?.enrolledCourses || []
    return (
        <div className='max-w-4xl px-4 mx-auto mt-20 md:px-0'>

            <h1 className="mb-4 text-xl font-bold md:text-2xl">My Learning</h1>
            <div>
                {
                    isLoading ? <MyLearningSkeleton /> : myLearningCourses.length === 0 ? (<p>Your are not enrolled in any courses</p>) :
                        (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    myLearningCourses.map((course, i) => (
                                        <Course key={i} course={course} />
                                    ))
                                }
                            </div>
                        )
                }
            </div>

        </div>
    )
}

export default MyLearning

const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
            <div
                key={index}
                className="h-40 bg-gray-300 rounded-lg dark:bg-gray-700 animate-pulse"
            ></div>
        ))}
    </div>
);