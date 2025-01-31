import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCreateCourseMutation } from "@/redux/rtkApi/courseApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState("")
    const [category, setCategory] = useState("")
    const navigate = useNavigate()
    
    const getSelectedCategory = (value) => {
        setCategory(value)
    }
    const [createCourse, { isLoading, data, isSuccess}] = useCreateCourseMutation()

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created successfully ")
            navigate("/admin/course")
        }
    }, [data])


    return (
        <div>
            <div className="flex-1 mx-10">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Lets add course, add some basic details for your new course</h1>
                    <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero similique illo inventore nemo iste reiciendis.</p>
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <Label>
                            Title
                        </Label>
                        <Input value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            type='text'
                            placeholder='Enter course title' />
                    </div>
                    <div className="">
                        <Label>
                            Category
                        </Label>
                        <div>
                            <Select onValueChange={getSelectedCategory}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select Course Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">
                                            Frontend Development
                                        </SelectItem>
                                        <SelectItem value="Fullstack Development">
                                            Fullstack Development
                                        </SelectItem>
                                        <SelectItem value="MERN Stack Development">
                                            MERN Stack Development
                                        </SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant='outline' onClick={() => navigate('/admin/course')} >Back</Button>
                        <Button disabled={isLoading} onClick={createCourseHandler}>{
                            isLoading ? <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            </> : "Create"
                        }</Button>
                    </div>

                </div></div>
        </div>
    )
}

export default AddCourse