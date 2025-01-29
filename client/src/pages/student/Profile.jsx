import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react';
import Course from './Course';

const Profile = () => {
    const isLoading = false;
    const enrolledCourses = [1,2]
    return (
        <div className='max-w-4xl mx-auto mt-20 md:px-0 '>
            <h1 className='text-2xl font-bold text-center md:text-left'>Profile</h1>
            <div className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
                <div className='flex flex-col items-center'>
                    <Avatar className='w-24 h-24 mb-4 md:h-32 md:w-32'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Name: <span className='ml-2 font-normal text-gray-700 dark:text-gray-300'>Student Name</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Email: <span className='ml-2 font-normal text-gray-700 dark:text-gray-300'>Student@g.com</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Role: <span className='ml-2 font-normal text-gray-700 dark:text-gray-300'>Student </span>
                        </h1>
                    </div>
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='sm' className='ml-2'>Edit profile</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here.Click save to apply changes.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='grid gap-4 py-4'>
                                    <div className='grid items-center grid-cols-4 gap-4'>
                                        <label htmlFor="">Name</label>
                                        <input type="text" name="" placeholder='Name' className='col-span-3 ' />

                                    </div>
                                    <div className='grid items-center grid-cols-4 gap-4'>
                                        <label htmlFor="">Profile photo</label>
                                        <input type="file" name="" accept='image/*' className='col-span-3 ' />

                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button>
                                        {
                                            isLoading ? (<>
                                                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                            </>) : "Save Changes"
                                        }
                                    </Button>

                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div>
                {
                    enrolledCourses.length === 0 ? "" : <h1>Courses you&apos;re  Enrolled in</h1>
                }

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    {
                        enrolledCourses.length === 0 ? <h1>You haven&apos;t enrolled any courses</h1> : (
                            enrolledCourses.map((course, index) => <Course key={index} />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile