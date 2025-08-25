import { askGemini } from "../services/geminiSevice.js";

export const getJarvisResponse = async (req,res,next) => {
    try {
        const { message } = req.body;

        if(!message){
            return res.status(400).json({ error: "message is required"});
        }

        const reply = await askGemini(message);

        res.status(200).json({ reply });
    } catch (error) {
         console.error("❌ Jarvis Controller Error:", error);
         res.status(500).json({ error: "Something went wrong" });
    }
}