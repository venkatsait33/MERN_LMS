import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { useEditLecturesMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/redux/rtkApi/courseApi"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

const AddLecture = () => {
    const MEDIA_API = import.meta.env.VITE_BACKEND_URL + "/api/v1/media"

    const navigate = useNavigate()
    const params = useParams()
    const { courseId, lectureId } = params

    const [lectureTitle, setLectureTitle] = useState('')
    const [videoInfo, setVideoInfo] = useState(null)
    const [videoLink, setVideoLink] = useState('')
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [btnDisable, setBtnDisable] = useState(true)


    const [editLectures, { data, isLoading, error, isSuccess }] = useEditLecturesMutation()

    const [removeLecture, { data: removeData, isLoading: removeLoading, error: removeError, isSuccess: removeSuccess }] = useRemoveLectureMutation()

    const { data: lectureData, isLoading: lectureLoading } = useGetLectureByIdQuery(lectureId)

    {
        lectureLoading && <><Loader2 className="w-20 h-20 mx-auto mt-10 animate-spin" /></>
    }

    const lecture = lectureData?.lecture

    useEffect(() => {
        if (lecture) {
            setLectureTitle(lecture.lectureTitle)
            setIsPreviewFree(lecture.isPreviewFree)
            setVideoInfo(lecture.videoInfo)
            setVideoLink(lecture.videoLink)
        }
    }, [lecture])

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true)
            try {
                const response = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.floor((loaded * 100) / total));
                    }
                });
                if (response.data.success) {
                    console.log(response);
                    setVideoInfo({ videoUrl: response.data.data.url, publicId: response.data.data.public_id })
                    setBtnDisable(false)
                    toast.success('Video uploaded successfully')
                }
            } catch (error) {
                console.log(error);
                toast.error('Error uploading video')

            } finally {
                setMediaProgress(false)
            }
        }
    }

    const editLectureHandler = async () => {
        await editLectures({
            lectureTitle, videoInfo, courseId, lectureId, isPreviewFree, videoLink
        })
    }

    const removeLectureHandler = async () => {
        await removeLecture(lectureId)
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success('Lecture edited successfully')
        }
        if (error) {
            toast.error(error.data.message)
        }
        if (removeSuccess) {
            toast.success('Lecture removed successfully')
            navigate(`/admin/course/${courseId}/lecture`)
        }
        if (removeError) {
            toast.error(removeData.data.message)
        }
    }, [isSuccess, error, removeSuccess, removeError])

    return (
        <div>
            <Card>
                <CardHeader CardTitle='flex justify-between'>

                    <div>
                        <CardTitle>
                            Edit Lecture
                        </CardTitle>
                        <CardDescription>
                            Make changes and click save when done.
                        </CardDescription>
                    </div>
                    <div className="">
                        <Button disabled={removeLoading} variant='destructive' onClick={removeLectureHandler}>
                            {
                                removeLoading ? <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                </> : " Remove Lecture"
                            }

                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label>Title</Label>
                        <Input type="text" value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} placeholder="Ex: Title of lecture" />
                    </div>
                    <div>
                        <Label>Video <span className="text-red-500">*</span></Label>
                        <Input type="file" onChange={fileChangeHandler} accept="video/*" className="w-fit" />

                    </div>
                    <div>
                        <Label>Youtube Video Link or any other video link</Label>
                        <Input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="Ex: https://www.youtube.com/watch?v=1" />
                    </div>
                    <div className="flex items-center my-5 space-x-2">
                        <Switch checked={isPreviewFree} onCheckedChange={setIsPreviewFree} id="video-free" />
                        <Label htmlFor="video-free">Is this Free Video</Label>
                    </div>
                    {
                        mediaProgress && (
                            <div className="my-4">
                                <p>{uploadProgress}% uploaded</p>
                                <Progress value={uploadProgress} />
                            </div>
                        )
                    }
                    <div>
                        <Button disabled={isLoading} onClick={editLectureHandler}>
                            {
                                isLoading ? <>  <Loader2 className="w-4 h-4 mr-2 animate-spin" /></> : " Update Lecture "
                            }

                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddLecture