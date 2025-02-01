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
import { useLoadUserQuery, useUpdateUserMutation } from '@/redux/rtkApi/authApi';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';

const Profile = () => {
    const [name, setName] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const { data: loadUser, isLoading: userLoading, refetch } = useLoadUserQuery()
    const [updateUser, { isLoading: updateUserLoading, data: updateUserData, isError: updateUserError, isSuccess }] = useUpdateUserMutation()

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success('Profile updated successfully')
        }
        if (updateUserError) {
            toast.error('Error updating profile')
        }
    }, [updateUserData, updateUserError, isSuccess])

    const onChangeHandler = (e) => {
        const file = e.target.files?.[0]
        if (file) setProfilePhoto(file)
    }

    if (userLoading) return (<>
        <LoadingSpinner />
    </>)

    const user = loadUser && loadUser.user;

    const updateUserHandler = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('profilePhoto', profilePhoto)
        await updateUser(formData)
    }

    return (
        <div className='max-w-4xl mx-auto mt-20 md:px-0 '>
            <h1 className='text-2xl font-bold text-center md:text-left'>Profile</h1>
            <div className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
                <div className='flex flex-col items-center'>
                    <Avatar className='w-24 h-24 mb-4 md:h-32 md:w-32'>
                        <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Name: <span className='ml-2 font-normal text-gray-700 dark:text-gray-300'>{user?.name}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Email: <span className='ml-2 font-normal text-gray-700 dark:text-gray-300'>{user?.email}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Role: <span className='ml-2 font-normal text-gray-700 dark:text-gray-300'>{user?.role.toUpperCase()} </span>
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
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='col-span-3 text-black' />

                                    </div>
                                    <div className='grid items-center grid-cols-4 gap-4'>
                                        <label htmlFor="">Profile photo</label>
                                        <input type="file" onChange={(e) => onChangeHandler(e)} accept='image/*' className='col-span-3 ' />

                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button disable={updateUserLoading} onClick={updateUserHandler}>
                                        {
                                            updateUserLoading ? (<>
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
                    user?.enrolledCourses?.length === 0 ? "" : <h1>Courses you&apos;re  Enrolled in</h1>
                }

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    {
                        user?.enrolledCourses?.length === 0 ? <h1>You haven&apos;t enrolled any courses</h1> : (
                            user?.enrolledCourses?.map((course) => <Course key={course.id} />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile