import PurchaseCourseButton from '@/components/PurchaseCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SelectSeparator } from '@/components/ui/select'
import { useGetCourseDetailsWithPurchaseStatusQuery } from '@/redux/rtkApi/purchaseApi'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'

const CourseDetails = () => {
    const params = useParams()
    const courseId = params.courseId
    const navigate = useNavigate()

    const { data, isLoading, isError } = useGetCourseDetailsWithPurchaseStatusQuery(courseId)

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>failed to Load Course</div>

    const { course, purchased } = data

    const handleContinueCourse = () => {
        if (purchased) {
            navigate(`/course-progress/${courseId}`)
        }
    }

    return (
        <div className='mt-20'>
            <div className='bg-[#2d2f31] text-white'>
                <div className='flex flex-col gap-2 px-4 py-8 mx-auto max-w-7xl md:px-8'>
                    <h1 className='text-2xl font-bold md:text-3xl'>{course?.courseTitle}</h1>
                    <p className='text-base md:text-lg'>{course?.subTitle}</p>
                    <p>created By <span className='text-[#c0c4fc] underline italic'>{course?.creator?.name}</span></p>
                    <div className='flex items-center gap-2 text-sm'>
                        <BadgeInfo size={16} />
                        <p>last updated {course?.updatedAt.split("T")[0]}</p>
                    </div>
                    <p>Students enrolled: {course?.enrolledStudents?.length}</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-between px-4 mx-auto my-5 max-w-7xl md:px-8 lg:flex-row'>
                <div className='w-full space-y-5 lg:w-1/2'>
                    <h1 className='text-xl font-bold md:text-3xl'>Description</h1>
                    <p className='text-sm' dangerouslySetInnerHTML={{ __html: course?.description }} />

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Course Content
                            </CardTitle>
                            <CardDescription>
                                4 lectures
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {
                                course?.lectures?.map((lecture, index) => (
                                    <div key={index} className='flex items-center gap-3 text-sm '>
                                        <span>
                                            {
                                                purchased ? (<PlayCircle size={14} />) : (<Lock size={14} />)
                                            }
                                        </span>
                                        <p>{lecture.lectureTitle}</p>

                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </div>
                <div className='w-full lg:w-1/3'>
                    <Card>
                        <CardContent className="flex flex-col p-4">
                            <div className='w-full mb-4 aspect-video'>
                                <ReactPlayer width="100%" height="100%"
                                    url={course?.lectures[0].videoUrl} />
                            </div>
                            <h1>lecture title</h1>

                            <SelectSeparator className='my-2' />

                            <h1 className='text-2xl font-bold'>Course Price</h1>
                        </CardContent>
                        <CardFooter className="flex items-center justify-center p-4">
                            {purchased ? <Button onClick={handleContinueCourse} className='w-full'>
                                Continue Course
                            </Button> : <PurchaseCourseButton courseId={courseId} />}


                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails