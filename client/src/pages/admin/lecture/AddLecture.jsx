import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

const AddLecture = () => {
    const [title, setTitle] = useState('')
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [isFree, setIsFree] = useState(false)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [btnDisable, setBtnDisable] = useState(true)
    const MEDIA_API = import.meta.env.VITE_BACKEND_URL_UPLOAD_VIDEO

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
                    setUploadVideoInfo({ videoUrl: response.data.data.url, publicId: response.data.data.public_id })
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
                        <Button variant='destructive'>
                            Remove Lecture
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Ex: Title of lecture" />
                    </div>
                    <div>
                        <Label>Video <span className="text-red-500">*</span></Label>
                        <Input type="file" onChange={fileChangeHandler} accept="video/*" className="w-fit" />
                    </div>
                    <div className="flex items-center my-5 space-x-2">
                        <Switch id="video-free" />
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
                        <Button>
                            Update Lecture
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddLecture