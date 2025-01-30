import { Loader2 } from 'lucide-react'

const LoadingSpinner = () => {
  return (
      <div><div className='flex flex-col items-center justify-center w-screen h-screen mx-auto'>
          <Loader2 className='w-16 h-16 animate-spin ' />
          <p>Loading</p>
      </div></div>
  )
}

export default LoadingSpinner