import { Button } from "@/components/ui/button"
import EditAddedCourse from "./EditAddedCourse"
import { useNavigate, useParams } from "react-router-dom"

const EditCourse = () => {
    const navigate = useNavigate()
    const params = useParams()
    const courseId = params.courseId
    return (
        <div className="flex flex-col w-full mt-16 max-w-screen-2xl">
            <div className="flex items-center mb-5">
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