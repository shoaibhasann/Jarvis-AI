import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import jarvisRoutes from "./routes/jarvisRoutes.js"


const app = express();

app.use(express.json({ limit: "1mb"}));
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

const port = process.env.PORT || 6000;

// 🔹 Use Routes
app.use("/api/ask", jarvisRoutes);


app.listen(port, () => {
    console.log(`🚀 Server is listening on: http://localhost:${port}`);
});


