from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def read_root():
    return {"message": "Hello from vibe_coding FastAPI template"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}



    
