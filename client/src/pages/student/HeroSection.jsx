import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const searchHandler = (e) => {
        e.preventDefault()
        if (searchQuery.trim() !== "") {
            navigate(`/course/search?query=${searchQuery}`)
        }
        setSearchQuery("")

    }

    return (
        <div className='relative px-4 py-16 mt-16 text-center bg-indigo-600 bg-gradient-to-r from-blue-500 to dark:from-gray-800 dark:to-gray-900'>
            <div className="flex flex-col max-w-xl gap-2 mx-auto">
                <div>
                    <h1 className="mb-4 text-4xl font-bold text-white">Find Best Courses for you</h1>
                    <p className="text-gray-200 dark:text-gray-400">Discover, Learn and UpSkill with our wide range of courses</p>
                </div>

                <form onSubmit={searchHandler} className="flex items-center max-w-xl overflow-hidden bg-white rounded-full shadow-lg dark:bg-gray-800 ">
                    <Input type='text' placeholder="Search" className='flex-grow text-black placeholder-gray-400 border-none shadow-lg focus-visible:ring-0 dark:text-gray-100 dark:placeholder-gray-500'
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <Button className='px-6 py-3 text-white bg-blue-600 rounded-r-full dark:bg-gray-700 hover:bg-blue-700 dark:hover:bg-blue-800 ' type='submit'>Search</Button>
                </form>

                <div>
                    <Button className='max-w-xs px-6 py-3 mt-4 text-center text-blue-600 bg-white rounded-full dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                        onClick={() => navigate('/course/search?query')}>Explore Courses</Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection