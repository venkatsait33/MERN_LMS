import { Button } from "@/components/ui/button"
import EditAddedCourse from "./EditAddedCourse"

const EditCourse = () => {
    return (
        <div className="flex-1 w-full mt-16">
            <div className="flex items-center mb-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Complete the course details</h1>
                    <div>
                        <Button variant='link'>
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