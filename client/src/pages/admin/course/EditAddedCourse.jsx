import RichTextEditor from "@/components/RichTextEditior";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/redux/rtkApi/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditAddedCourse = () => {
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    })
    const [previewThumbnail, setPreviewThumbnail] = useState("")
    const params = useParams()
    const courseId = params.courseId
    const navigate = useNavigate()
    const [editCourse, { isLoading, data, error, isSuccess }] = useEditCourseMutation()
    const { data: getCourseBYIdData, isLoading: getDataByIdLoading, refetch } = useGetCourseByIdQuery(courseId)


    useEffect(() => {
        if (getCourseBYIdData?.course) {
            const course = getCourseBYIdData?.course
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: "",
            })
            refetch()
        }
    }, [getCourseBYIdData, refetch])

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    const selectCategory = (value) => {
        setInput({
            ...input,
            category: value
        })
    }

    const selectCourseLevel = (value) => {
        setInput({
            ...input,
            courseLevel: value
        })
    }

    const selectThumbnail = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInput({
                ...input,
                courseThumbnail: file
            })
            const fileReader = new FileReader();
            fileReader.onload = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }

    const submitHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);
        await editCourse({ formData, courseId: courseId })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("course updated successfully")
        }
        if (error) {
            toast.error("course updated failed")
        }
    }, [isSuccess, error, data])

    if (getDataByIdLoading) return <h1>Loading......</h1>

    const isPublished = false;
    return (
        <div >
            <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                    <div>
                        <CardTitle>
                            Basic course information
                        </CardTitle>
                        <CardDescription>
                            Make changes to your course here. Click save the changes when you are done.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant='outline' >
                            {
                                isPublished ? "Unpublish" : "Publish"
                            }
                        </Button>
                        <Button>
                            Remove Course
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-5 space-y-4 ">
                        <Label>Title</Label>
                        <Input type='text' value={input.courseTitle} onChange={changeEventHandler} name='courseTitle' placeholder='Ex. FullStack developer' />
                    </div>
                    <div className="mt-5 space-y-4 ">
                        <Label>SubTitle</Label>
                        <Input type='text' value={input.subTitle} onChange={changeEventHandler} name='subTitle' placeholder='Ex. Become a complete developer' />
                    </div>
                    <div className="mt-5 space-y-4 ">
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>

                    <div className="items-center mt-2 lg:flex gap-14 ">
                        <div>
                            <Label>Category</Label>
                            <div>
                                <Select onValueChange={selectCategory} >
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

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <div>
                                <Select onValueChange={selectCourseLevel} >
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select Course Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Course Level</SelectLabel>
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Advance">
                                                Advance
                                            </SelectItem>

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <div>
                            <Label>Price (INR)</Label>
                            <Input type='number' name="coursePrice" value={input.coursePrice} onChange={changeEventHandler} placeholder="99" className='w-fit' />
                        </div>
                    </div>

                    <div className="mt-3">
                        <Label>Course Thumbnail</Label>
                        <Input type="file" accept="image/*" className="w-fit" onChange={selectThumbnail} />
                        <div>
                            {
                                previewThumbnail && <img src={previewThumbnail} alt="course thumbnail" className="object-cover w-40 h-40 mt-2" />
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                        <Button variant='outline' onClick={() => { navigate('/admin/course') }}>Cancel</Button>
                        <Button disabled={isLoading}
                            onClick={submitHandler}>{

                                isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> </> : "Save"
                            }</Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default EditAddedCourse