"""
高中管理系統 API

這是一個超簡單的 FastAPI 應用程式，讓學生可以瀏覽並報名 Mergington 高中的課外活動。
"""

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
import os
from pathlib import Path

app = FastAPI(title="Mergington 高中 API",
              description="用於瀏覽與報名課外活動的 API")

 # 掛載靜態檔案目錄
current_dir = Path(__file__).parent
app.mount("/static", StaticFiles(directory=os.path.join(Path(__file__).parent,
          "static")), name="static")

 # 活動資料庫（記憶體）
 
activities = {
    "西洋棋社": {
        "description": "學習棋藝策略並參加西洋棋比賽",
        "schedule": "星期五，下午 3:30 - 5:00",
        "max_participants": 12,
        "participants": ["michael@mergington.edu", "daniel@mergington.edu"]
    },
    "程式設計班": {
        "description": "學習程式基礎並製作軟體專案",
        "schedule": "星期二、四，下午 3:30 - 4:30",
        "max_participants": 20,
        "participants": ["emma@mergington.edu", "sophia@mergington.edu"]
    },
    "體育課": {
        "description": "體育教育與運動活動",
        "schedule": "星期一、三、五，下午 2:00 - 3:00",
        "max_participants": 30,
        "participants": ["john@mergington.edu", "olivia@mergington.edu"]
    },
    "籃球隊": {
        "description": "校隊籃球訓練與比賽",
        "schedule": "星期二、四，下午 4:00 - 6:00",
        "max_participants": 15,
        "participants": ["alex@mergington.edu"]
    },
    "游泳隊": {
        "description": "游泳訓練與校際比賽",
        "schedule": "星期三、五，下午 4:30 - 6:00",
        "max_participants": 18,
        "participants": ["lily@mergington.edu"]
    },
    "合唱團": {
        "description": "合唱練習與音樂表演",
        "schedule": "星期一、四，下午 3:30 - 5:00",
        "max_participants": 25,
        "participants": ["grace@mergington.edu"]
    },
    "美術社": {
        "description": "繪畫與視覺藝術創作",
        "schedule": "星期三，下午 3:30 - 5:00",
        "max_participants": 20,
        "participants": ["noah@mergington.edu"]
    },
    "數學奧林匹克社": {
        "description": "數學問題討論與競賽準備",
        "schedule": "星期二，下午 5:00 - 6:30",
        "max_participants": 30,
        "participants": ["lucas@mergington.edu"]
    },
    "科學俱樂部": {
        "description": "科學專題研究與實驗活動",
        "schedule": "星期五，下午 4:00 - 6:00",
        "max_participants": 30,
        "participants": ["mia@mergington.edu"]
    }
}


@app.get("/")
def root():
    return RedirectResponse(url="/static/index.html")


@app.get("/activities")
def get_activities():
    """取得所有課外活動資訊"""
    return activities


@app.post("/activities/{activity_name}/signup")
def signup_for_activity(activity_name: str, email: str):
    """學生報名課外活動"""
    # 檢查活動是否存在
    if activity_name not in activities:
        raise HTTPException(status_code=404, detail="找不到該活動")

    # 取得指定活動
    activity = activities[activity_name]

    # 新增學生
    # 驗證學生是否已經加入
    if email in activity["participants"]:
        raise HTTPException(status_code=400, detail="學生已經報名該活動")
    activity["participants"].append(email)
    return {"message": f"{email} 已成功報名 {activity_name}"}
