import { Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Lecture = ({ lecture, courseId, index }) => {
    const navigate = useNavigate()
    const updateLecture = () => {
        navigate(`${lecture._id}`)
    }
    return (
        <div >
            <div className="flex items-center justify-between bg-[#f7f9fa] dark:bg-[#1f1f1f] px-4 py-2 rounded-md m-2">
                <h1>Lecture {index + 1}: &nbsp; {lecture.lectureTitle}</h1>
                <Edit onClick={updateLecture} className="text-gray-600 cursor-pointer dark:text-gray-300" size={20} />
            </div></div>
    )
}

export default Lecture