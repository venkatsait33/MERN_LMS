import { Button } from "@/components/ui/button"
import EditAddedCourse from "./EditAddedCourse"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const EditCourse = () => {
    const navigate = useNavigate()
    const params = useParams()
    const courseId = params.courseId
    return (
        <div className="flex flex-col w-full px-4 py-4 max-md:mt-24 max-w-screen-2xl">
            <div className="flex items-center gap-4 mb-5">
                <div>
                    <Button size='icon' variant='outline' className='rounded-full' onClick={() => { navigate('/admin/course') }}>
                        <ArrowLeft size={16} />
                    </Button>
                </div>
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-xl font-bold">Complete the course details</h1>
                    <div>
                        <Button variant='link' onClick={() => navigate(`/admin/course/${courseId}/lecture`)}>
                            Go to lecture pages
                        </Button>
                    </div>
                </div>

            </div>
            <EditAddedCourse />

        </div>
    )
}

export default EditCourse