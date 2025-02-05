import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetAllPurchasedCoursesQuery } from "@/redux/rtkApi/purchaseApi"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const Dashboard = () => {
    const { data, isSuccess, isLoading, isError } = useGetAllPurchasedCoursesQuery()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    const { purchasedCourse } = data || []
    const courseData = purchasedCourse.map((course) => (
        { name: course.courseId.courseTitle, price: course.courseId.coursePrice }
    ))

    const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);

    const totalSales = purchasedCourse.length

    return (
        <div className="flex items-center justify-center p-4 mx-auto ">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Card className='transition-shadow duration-300 shadow-lg hover:shadow-xl'>
                    <CardHeader>
                        <CardTitle>
                            Total sales
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold text-blue-600">{totalSales}</p>
                    </CardContent>
                </Card>

                <Card className='transition-shadow duration-300 shadow-lg hover:shadow-xl'>
                    <CardHeader>
                        <CardTitle>
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold text-blue-600">{totalRevenue}</p>
                    </CardContent>
                </Card>

                <Card className="col-span-1 transition-shadow duration-300 shadow-lg hover:shadow-xl sm:col-span-2 md:col-span-3 lg:col-span-4">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-700">
                            Course Prices
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={courseData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#6b7280"
                                    angle={-30} // Rotated labels for better visibility
                                    textAnchor="end"
                                    interval={0} // Display all labels
                                />
                                <YAxis stroke="#6b7280" />
                                <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#4a90e2" // Changed color to a different shade of blue
                                    strokeWidth={3}
                                    dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard