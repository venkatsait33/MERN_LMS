import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/redux/rtkApi/purchaseApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const PurchaseCourseButton = ({ courseId }) => {


    const [createCheckoutSession, { data, isLoading, isError, isSuccess, error }] = useCreateCheckoutSessionMutation()

    const purchaseCourseHandler = async () => {
        await createCheckoutSession(courseId)
    }

    useEffect(() => {
        if (isSuccess) {
            if (data?.url) {
                window.location.href = data.url
            }
        } else {
            toast.error(error?.data?.message)
        }
        if (isError) {
            toast.error(error?.data?.message || "failed to create checkout session")
        }
    }, [data, isSuccess, error])
    return (
        <div className='w-full'>
            <Button disabled={isLoading} className='w-full' onClick={purchaseCourseHandler}>
                {
                    isLoading ? <><Loader2 className='w-4 h-4 mr-2 animate-spin' /> </> : " Purchase Course"
                }
            </Button>
        </div>
    )
}

export default PurchaseCourseButton