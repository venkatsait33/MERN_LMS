import { Menu, School } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ModeToggle } from './ThemeToggle';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';

const user = true;

const Navbar = () => {

    return (
        <div className='h-16 dark:bg-[#0a0a0a] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10 duration-300   '>
            <div className='items-center justify-between hidden px-2 py-4 pl-10 pr-10 mx-auto md:flex max-w-7xl'>
                <div className='flex items-center gap-2'>
                    <Link to='/'>
                        <School size={"30"} />
                    </Link>
                    <h1 className='hidden text-2xl font-extrabold md:block'>E-Learning</h1>
                </div>
                <div className='flex gap-8'>
                    {
                        user ? <>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            Dashboard
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <Link to='my-learning'>
                                                    My Learning
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link to='profile'>
                                                    Edit Profile
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            Log out
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </> : <div className='flex items-center gap-10 '>
                            <Button variant="outline">Login</Button>
                            <Button>SignUp</Button>
                        </div>
                    }
                    <ModeToggle />

                </div>
            </div>

            {/* mobile navbar */}
            <div className='flex items-center justify-between w-full h-full px-6 md:hidden '>
                <div className='flex items-center gap-2'>
                    <School />
                    <h1>E-Learning</h1>
                </div>

                <MobileNavbar />
            </div>

        </div>
    )
}

export default Navbar

const MobileNavbar = () => {
    const role = 'instructor'
    return (
        <>
            <>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size='icon' className="rounded-full hover:bg-gray-200">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <div className='flex items-center justify-between mt-10'>   <SheetTitle>E-Learning</SheetTitle>
                                <ModeToggle /></div>

                        </SheetHeader>
                        <Separator />
                        <nav className='flex flex-col items-start gap-4 mt-4 mr-2 font-medium'>
                            <span> <Link to='my-learning'>
                                My Learning
                            </Link></span>
                            <span><Link to='profile'>
                                Edit Profile
                            </Link></span>

                        </nav>

                        <div className='flex flex-col items-center w-full gap-4 mt-4 mr-2 font-medium'>
                            {
                                role === 'instructor' && (
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button type="submit">Dashboard</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                )
                            }

                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Log Out</Button>
                                </SheetClose>
                            </SheetFooter>

                        </div>
                    </SheetContent>
                </Sheet>

            </>
        </>
    )
}