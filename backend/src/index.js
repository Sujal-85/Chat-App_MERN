import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {app, server} from "./lib/socket.js";
dotenv.config();

const port = process.env.PORT;

// ✅ Increase payload size limit to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.use(
    cors({
        origin: "https://chat-app-mern-1-qfrt.onrender.com",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
    connectDB();
});
