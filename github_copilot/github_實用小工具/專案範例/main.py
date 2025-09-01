from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()



@app.get("/")
async def read_root():
    """回傳歡迎訊息"""
    return {"message": "來自 vibe_coding FastAPI 範本的問候訊息"}

@app.get("/health")
async def health_check():
    """回傳服務健康狀態"""
    return {"status": "ok"}



    
