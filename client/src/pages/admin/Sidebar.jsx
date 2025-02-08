import { Tooltip } from "@/components/ui/tooltip"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react"
import { useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"

const Sidebar = () => {

    const { user } = useSelector(store => store.auth)

    const navigate = useNavigate()

    if (!user) {
        navigate('/')
    }

    return (
        <div className="flex ">
            <div className=' md:w-[12%] space-y-8 border-r border-r-gray-300 dark:border-r-gray-700 p-5 sticky top-0 h-screen'>
                <div className="mt-16 space-y-8 ">
                    <Link to='dashboard' className="flex items-center gap-2 pt-2">
                        <div className="block md:hidden">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger> <ChartNoAxesColumn size={22} /></TooltipTrigger>
                                    <TooltipContent>
                                        <p>Dashboard</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <ChartNoAxesColumn size={22} className="hidden md:block" />
                        <h1 className="hidden md:block">Dashboard</h1>
                    </Link>
                    <Link to='course' className="flex items-center gap-2">
                        <div className="block md:hidden">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>  <SquareLibrary size={22} /></TooltipTrigger>
                                    <TooltipContent>
                                        <p>Courses</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <SquareLibrary size={22} className="hidden md:block" />
                        <h1 className="hidden md:block">Courses</h1>
                    </Link>
                </div>
            </div>
            <div className="w-full md:p-24 ">
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar