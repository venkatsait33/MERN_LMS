import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import AddLecture from "./AddLecture"

const EditLecture = () => {
    const params = useParams()
    const courseId = params.courseId
    return (
        <div className="flex flex-col gap-4 max-md:p-4 max-md:mt-20">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Link to={`/admin/course/${courseId}/lecture`}>
                        <Button size='icon' variant='outline' className='rounded-full'>
                            <ArrowLeft size={16} />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Update your lecture</h1>
                </div>
            </div>
                <AddLecture />
        </div>
    )
}

export default EditLecture