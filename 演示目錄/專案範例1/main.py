from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID, uuid4
from datetime import date

app = FastAPI()

class StudentBase(BaseModel):
    """學生基本資料模型"""
    name: str
    email: EmailStr
    birth_date: date
    grade: str
    phone: Optional[str] = None

class StudentCreate(StudentBase):
    """建立學生的資料模型"""
    pass

class Student(StudentBase):
    """完整學生資料模型"""
    id: UUID

class TeacherBase(BaseModel):
    """講師基本資料模型"""
    name: str
    subject: str
    email: str
    phone: Optional[str] = None

class TeacherCreate(TeacherBase):
    """建立講師的資料模型"""
    pass

class Teacher(TeacherBase):
    """完整講師資料模型"""
    id: UUID

# 用於暫時儲存講師資料的字典
teachers_db: dict[UUID, Teacher] = {}

# 用於暫時儲存學生資料的字典
students_db: dict[UUID, Student] = {}

@app.get("/")
async def read_root():
    """回傳歡迎訊息"""
    return {"message": "來自 vibe_coding FastAPI 範本的問候訊息"}

@app.get("/health")
async def health_check():
    """回傳服務健康狀態"""
    return {"status": "ok"}

@app.post("/teachers/", response_model=Teacher)
async def create_teacher(teacher: TeacherCreate):
    """建立新講師

    Args:
        teacher (TeacherCreate): 講師資料

    Returns:
        Teacher: 已建立的講師資料
    """
    teacher_id = uuid4()
    teacher_data = Teacher(id=teacher_id, **teacher.dict())
    teachers_db[teacher_id] = teacher_data
    return teacher_data

@app.get("/teachers/", response_model=List[Teacher])
async def list_teachers():
    """取得所有講師列表

    Returns:
        List[Teacher]: 講師列表
    """
    return list(teachers_db.values())

@app.get("/teachers/{teacher_id}", response_model=Teacher)
async def get_teacher(teacher_id: UUID):
    """取得特定講師資料

    Args:
        teacher_id (UUID): 講師ID

    Raises:
        HTTPException: 找不到講師時回傳404錯誤

    Returns:
        Teacher: 講師資料
    """
    if teacher_id not in teachers_db:
        raise HTTPException(status_code=404, detail="找不到該講師")
    return teachers_db[teacher_id]

@app.put("/teachers/{teacher_id}", response_model=Teacher)
async def update_teacher(teacher_id: UUID, teacher_update: TeacherBase):
    """更新講師資料

    Args:
        teacher_id (UUID): 講師ID
        teacher_update (TeacherBase): 更新的講師資料

    Raises:
        HTTPException: 找不到講師時回傳404錯誤

    Returns:
        Teacher: 更新後的講師資料
    """
    if teacher_id not in teachers_db:
        raise HTTPException(status_code=404, detail="找不到該講師")
    
    teacher_data = Teacher(id=teacher_id, **teacher_update.dict())
    teachers_db[teacher_id] = teacher_data
    return teacher_data

@app.delete("/teachers/{teacher_id}")
async def delete_teacher(teacher_id: UUID):
    """刪除講師

    Args:
        teacher_id (UUID): 講師ID

    Raises:
        HTTPException: 找不到講師時回傳404錯誤

    Returns:
        dict: 刪除成功訊息
    """
    if teacher_id not in teachers_db:
        raise HTTPException(status_code=404, detail="找不到該講師")
    
    del teachers_db[teacher_id]
    return {"message": "講師已成功刪除"}

@app.post("/students/", response_model=Student)
async def create_student(student: StudentCreate):
    """建立新學生

    Args:
        student (StudentCreate): 學生資料

    Returns:
        Student: 已建立的學生資料
    """
    student_id = uuid4()
    student_data = Student(id=student_id, **student.dict())
    students_db[student_id] = student_data
    return student_data

@app.get("/students/", response_model=List[Student])
async def list_students():
    """取得所有學生列表

    Returns:
        List[Student]: 學生列表
    """
    return list(students_db.values())

@app.get("/students/{student_id}", response_model=Student)
async def get_student(student_id: UUID):
    """取得特定學生資料

    Args:
        student_id (UUID): 學生ID

    Raises:
        HTTPException: 找不到學生時回傳404錯誤

    Returns:
        Student: 學生資料
    """
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="找不到該學生")
    return students_db[student_id]

@app.put("/students/{student_id}", response_model=Student)
async def update_student(student_id: UUID, student_update: StudentBase):
    """更新學生資料

    Args:
        student_id (UUID): 學生ID
        student_update (StudentBase): 更新的學生資料

    Raises:
        HTTPException: 找不到學生時回傳404錯誤

    Returns:
        Student: 更新後的學生資料
    """
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="找不到該學生")
    
    student_data = Student(id=student_id, **student_update.dict())
    students_db[student_id] = student_data
    return student_data

@app.delete("/students/{student_id}")
async def delete_student(student_id: UUID):
    """刪除學生

    Args:
        student_id (UUID): 學生ID

    Raises:
        HTTPException: 找不到學生時回傳404錯誤

    Returns:
        dict: 刪除成功訊息
    """
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="找不到該學生")
    
    del students_db[student_id]
    return {"message": "學生已成功刪除"}