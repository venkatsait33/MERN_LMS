import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.route.js";
import courseRoute from './routes/course.route.js'
import cookieParser from "cookie-parser";
import mediaRoute from "./routes/media.route.js";

dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 8080;


//server middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//apis
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRoute)
app.use('/api/v1/media', mediaRoute)


app.use('/home', (req, res) => {
    res.status(200).json({ message: 'Welcome to the home page' });
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));