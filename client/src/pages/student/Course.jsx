import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Link } from 'react-router-dom';

const Course = ({ course }) => {
    console.log(course);

    return (
        <Link to={`/course-details/${course?._id}`}>

            <Card className="overflow-hidden transition-all duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-2xl hover:scale-105">
                <div className='relative'>
                    <img src={course?.courseThumbnail || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu4l0glyq5Q4dWBzDcfl_NUXgRTVMm6SW5ew&s'} alt='course'
                        className='object-center w-full rounded-t-lg h-44'
                    />

                </div>
                <CardContent className='px-5 py-4 space-y-3'>
                    <h1 className='text-[16px] font-bold truncate hover:underline'>{course?.courseTitle}</h1>
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <Avatar className=''>
                                <AvatarImage className='w-10 h-10 rounded-full' src={course?.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className='text-sm font-medium'>{course?.creator?.name}</h1>
                        </div>
                        <Badge className='px-2 py-1 text-xs text-white bg-blue-600 rounded-full'>
                            {course?.courseLevel || "Beginner"}
                        </Badge>
                    </div>
                    <div className='text-lg font-semibold'>
                        <span>₹{course?.coursePrice || "499"} </span>
                    </div>


                </CardContent>
            </Card>
        </Link>
    )
}

export default Course