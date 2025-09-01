from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Student Models
class StudentBase(BaseModel):
    name: str
    email: str
    age: Optional[int] = None

class StudentCreate(StudentBase):
    pass

class StudentUpdate(StudentBase):
    name: Optional[str] = None
    email: Optional[str] = None

class Student(StudentBase):
    id: int

# In-memory storage
students_db: List[Student] = []
student_id_counter = 1

def get_next_student_id():
    global student_id_counter
    current_id = student_id_counter
    student_id_counter += 1
    return current_id


@app.get("/")
async def read_root():
    return {"message": "Hello from vibe_coding FastAPI template"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}


# Student CRUD endpoints
@app.get("/students", response_model=List[Student])
async def get_students():
    """獲取所有學生列表"""
    return students_db


@app.post("/students", response_model=Student)
async def create_student(student: StudentCreate):
    """創建新學生"""
    new_student = Student(
        id=get_next_student_id(),
        name=student.name,
        email=student.email,
        age=student.age
    )
    students_db.append(new_student)
    return new_student


@app.get("/students/{student_id}", response_model=Student)
async def get_student(student_id: int):
    """根據ID獲取特定學生"""
    for student in students_db:
        if student.id == student_id:
            return student
    raise HTTPException(status_code=404, detail="學生未找到")


@app.put("/students/{student_id}", response_model=Student)
async def update_student(student_id: int, student_update: StudentUpdate):
    """更新學生資訊"""
    for idx, student in enumerate(students_db):
        if student.id == student_id:
            update_data = student_update.model_dump(exclude_unset=True)
            updated_student = student.model_copy(update=update_data)
            students_db[idx] = updated_student
            return updated_student
    raise HTTPException(status_code=404, detail="學生未找到")


@app.delete("/students/{student_id}")
async def delete_student(student_id: int):
    """刪除學生"""
    for idx, student in enumerate(students_db):
        if student.id == student_id:
            deleted_student = students_db.pop(idx)
            return {"message": f"學生 {deleted_student.name} 已被刪除"}
    raise HTTPException(status_code=404, detail="學生未找到")

    
