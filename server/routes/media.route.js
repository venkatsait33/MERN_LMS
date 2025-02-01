import express from "express";
import { uploadMedia } from '../utils/cloudinary.js'
import upload from "../utils/multier.js";

const router = express.Router();

router.route("/upload-video").post(upload.single("file"), async (req, res) => {
    try {
        const result = await uploadMedia(req.file.path);
        res.status(200).json({ data: result, success: true, message: "Video uploaded successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);

    }
})

export default router;