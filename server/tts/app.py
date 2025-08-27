from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
import edge_tts
import tempfile, os, asyncio

app = FastAPI()

class TTSRequest(BaseModel):
    text: str
    voice: str = "en-IN-PrabhatNeural"
    rate: str = "+4%"
    pitch: str = "-13Hz"

def _delete_file(path: str):
    try:
        os.remove(path)
    except:
        pass

@app.post("/tts")
async def tts(req: TTSRequest, bg: BackgroundTasks):
    if not req.text.strip():
        return JSONResponse({"error":"text is required"}, status_code=400)

    fd, path = tempfile.mkstemp(suffix=".mp3", prefix="jarvis_")
    os.close(fd)

    tts = edge_tts.Communicate(req.text, voice=req.voice, rate=req.rate, pitch=req.pitch)
    await tts.save(path)

    def iterfile():
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                yield chunk

    bg.add_task(_delete_file, path)  # cleanup after streaming
    return StreamingResponse(iterfile(), media_type="audio/mpeg")
