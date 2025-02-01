import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateLecturesMutation, useGetCourseLecturesQuery } from "@/redux/rtkApi/courseApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import Lecture from "./Lecture"

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("")
    const navigate = useNavigate()
    const params = useParams()
    const courseId = params.courseId

    const [createLectures, { isLoading, error, isSuccess }] = useCreateLecturesMutation()

    const { data, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLecturesQuery(courseId)

    const createLectureHandler = async () => {
        await createLectures({ lectureTitle, courseId })
    }

    useEffect(() => {
        if (error) {
            toast.error(error.data.message)
        }
        if (isSuccess) {
            refetch()
            toast.success("Lecture created successfully")
        }
    }, [isSuccess, error])





    return (
        <div className="flex flex-col ">
            <div className="flex-1 mx-10 ">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Lets add lecture,for your new course</h1>
                    <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero similique illo inventore nemo iste reiciendis.</p>
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <Label>
                            Title
                        </Label>
                        <Input value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            type='text'
                            placeholder='Enter course title' />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant='outline' onClick={() => navigate(`/admin/course/${courseId}`)} >Back to Course</Button>
                        <Button disabled={isLoading} onClick={createLectureHandler} >{
                            isLoading ? <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            </> : "Create lecture"
                        }</Button>
                    </div>

                </div>
            </div>

            <div className="">


                {lectureLoading ? (
                    <p>Loading lectures...</p>
                ) : lectureError ? (
                    <p>Failed to load lectures.</p>
                ) : data.lectures.length === 0 ? (
                    <p>No lectures availabe</p>
                ) : (
                    data.lectures.map((lecture, index) => (
                        <Lecture
                            key={lecture._id}
                            lecture={lecture}
                            courseId={courseId}
                            index={index}
                        />
                    ))
                )}

            </div>
        </div>
    )
}

export default CreateLecture