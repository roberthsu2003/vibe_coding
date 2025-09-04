"""
高中管理系統 API
這是一個超簡單的 FastAPI 應用程式，讓學生可以瀏覽並報名 Mergington 高中的課外活動。
"""

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
import os
import sqlite3
import json
from contextlib import contextmanager
from pathlib import Path

app = FastAPI(title="Mergington 高中 API",
              description="用於瀏覽與報名課外活動的 API")

@app.on_event("startup")
async def startup_event():
    """應用程式啟動時初始化資料庫"""
    init_db()

# 資料庫連接管理
@contextmanager
def get_db():
    db = sqlite3.connect('activities.db')
    db.row_factory = sqlite3.Row  # 讓結果可以用字典方式訪問
    try:
        yield db
    finally:
        db.close()

# 初始化資料庫
def init_db():
    with get_db() as db:
        db.execute("""
        CREATE TABLE IF NOT EXISTS activities (
            name TEXT PRIMARY KEY,
            description TEXT,
            schedule TEXT,
            max_participants INTEGER
        )
        """)
        
        db.execute("""
        CREATE TABLE IF NOT EXISTS participants (
            activity_name TEXT,
            email TEXT,
            PRIMARY KEY (activity_name, email),
            FOREIGN KEY (activity_name) REFERENCES activities(name)
        )
        """)
        
        # 檢查是否已有資料
        cursor = db.execute("SELECT COUNT(*) as count FROM activities")
        if cursor.fetchone()['count'] == 0:
            # 插入預設活動資料
            for name, details in default_activities.items():
                db.execute(
                    "INSERT INTO activities (name, description, schedule, max_participants) VALUES (?, ?, ?, ?)",
                    (name, details['description'], details['schedule'], details['max_participants'])
                )
                # 插入參與者資料
                for email in details['participants']:
                    db.execute(
                        "INSERT INTO participants (activity_name, email) VALUES (?, ?)",
                        (name, email)
                    )
        db.commit()

 # 掛載靜態檔案目錄
current_dir = Path(__file__).parent
app.mount("/static", StaticFiles(directory=os.path.join(Path(__file__).parent,
          "static")), name="static")

# 預設活動資料
default_activities = {
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
    with get_db() as db:
        # 獲取所有活動
        activities = {}
        cursor = db.execute("SELECT * FROM activities")
        for row in cursor:
            activity_name = row['name']
            activities[activity_name] = {
                'description': row['description'],
                'schedule': row['schedule'],
                'max_participants': row['max_participants'],
                'participants': []
            }
        
        # 獲取所有參與者
        cursor = db.execute("SELECT activity_name, email FROM participants")
        for row in cursor:
            activities[row['activity_name']]['participants'].append(row['email'])
            
        return activities


@app.post("/activities/{activity_name}/signup")
def signup_for_activity(activity_name: str, email: str):
    """學生報名課外活動"""
    with get_db() as db:
        # 檢查活動是否存在
        cursor = db.execute("SELECT * FROM activities WHERE name = ?", (activity_name,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="找不到該活動")

        # 檢查是否已經報名
        cursor = db.execute(
            "SELECT * FROM participants WHERE activity_name = ? AND email = ?",
            (activity_name, email)
        )
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="學生已經報名該活動")

        # 新增報名記錄
        db.execute(
            "INSERT INTO participants (activity_name, email) VALUES (?, ?)",
            (activity_name, email)
        )
        db.commit()
        
        return {"message": f"{email} 已成功報名 {activity_name}"}


@app.delete("/activities/{activity_name}/participants/{email}")
def remove_participant(activity_name: str, email: str):
    """取消學生的活動報名"""
    with get_db() as db:
        # 檢查活動是否存在
        cursor = db.execute("SELECT * FROM activities WHERE name = ?", (activity_name,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="找不到該活動")

        # 檢查學生是否已報名
        cursor = db.execute(
            "SELECT * FROM participants WHERE activity_name = ? AND email = ?",
            (activity_name, email)
        )
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="該學生未報名此活動")

        # 移除報名記錄
        db.execute(
            "DELETE FROM participants WHERE activity_name = ? AND email = ?",
            (activity_name, email)
        )
        db.commit()
        
        return {"message": f"{email} 已取消報名 {activity_name}"}
