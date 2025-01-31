import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetCreatorCoursesQuery } from '@/redux/rtkApi/courseApi'
import { Edit } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Course = () => {
    const { data, isLoading, refetch } = useGetCreatorCoursesQuery()
    const navigate = useNavigate()

    const tableData = data?.courses
    useEffect(() => {
        refetch()
    }, [refetch]
    )

    if (isLoading) return <div>Loading...</div>

    return (
        <div className='flex flex-col w-full h-full p-4 '>
            <div>
                <Link to='create'>
                    <Button>
                        Add Course
                    </Button>
                </Link>
            </div>

            <div>
                <div>
                    <Table>
                        <TableCaption>A list of your recent courses.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[20%]">Price</TableHead>
                                <TableHead className="w-[20%]">Status</TableHead>
                                <TableHead className="w-[50%]">Title</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableData.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell className="font-medium">{item?.coursePrice || 'NA'}</TableCell>
                                    <TableCell>
                                        <Badge>
                                            {item.isPublished ? "Published" : "Draft"}
                                        </Badge></TableCell>
                                    <TableCell>{item.courseTitle}</TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => navigate(`/admin/course/${item._id}`)} variant='outline' className="flex items-center gap-2">
                                            Edit <Edit />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Course