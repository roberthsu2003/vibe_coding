import pytest
from fastapi.testclient import TestClient
from main import app
import main

client = TestClient(app)

@pytest.fixture(autouse=True)
def reset_students_db():
    """重置學生資料庫，確保每個測試都是獨立的"""
    main.students_db.clear()
    main.student_id_counter = 1

def test_get_empty_students():
    """測試獲取空的學生列表"""
    response = client.get("/students")
    assert response.status_code == 200
    assert response.json() == []

def test_create_student():
    """測試創建學生"""
    student_data = {
        "name": "測試學生",
        "email": "test@example.com",
        "age": 20
    }
    response = client.post("/students", json=student_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "測試學生"
    assert data["email"] == "test@example.com"
    assert data["age"] == 20
    assert data["id"] == 1

def test_create_student_without_age():
    """測試創建沒有年齡的學生"""
    student_data = {
        "name": "測試學生2",
        "email": "test2@example.com"
    }
    response = client.post("/students", json=student_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "測試學生2"
    assert data["email"] == "test2@example.com"
    assert data["age"] is None
    assert data["id"] == 1

def test_get_students():
    """測試獲取學生列表"""
    # 先創建兩個學生
    client.post("/students", json={"name": "學生1", "email": "student1@example.com", "age": 20})
    client.post("/students", json={"name": "學生2", "email": "student2@example.com", "age": 22})
    
    response = client.get("/students")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["name"] == "學生1"
    assert data[1]["name"] == "學生2"

def test_get_student_by_id():
    """測試根據ID獲取學生"""
    # 先創建一個學生
    response = client.post("/students", json={"name": "測試學生", "email": "test@example.com", "age": 20})
    student = response.json()
    student_id = student["id"]
    
    # 根據ID獲取學生
    response = client.get(f"/students/{student_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "測試學生"
    assert data["id"] == student_id

def test_get_nonexistent_student():
    """測試獲取不存在的學生"""
    response = client.get("/students/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "學生未找到"

def test_update_student():
    """測試更新學生"""
    # 先創建一個學生
    response = client.post("/students", json={"name": "原始學生", "email": "original@example.com", "age": 20})
    student = response.json()
    student_id = student["id"]
    
    # 更新學生
    update_data = {"name": "更新學生", "age": 25}
    response = client.put(f"/students/{student_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "更新學生"
    assert data["email"] == "original@example.com"  # email 沒有更新
    assert data["age"] == 25
    assert data["id"] == student_id

def test_update_nonexistent_student():
    """測試更新不存在的學生"""
    update_data = {"name": "不存在的學生"}
    response = client.put("/students/999", json=update_data)
    assert response.status_code == 404
    assert response.json()["detail"] == "學生未找到"

def test_delete_student():
    """測試刪除學生"""
    # 先創建一個學生
    response = client.post("/students", json={"name": "要刪除的學生", "email": "delete@example.com", "age": 20})
    student = response.json()
    student_id = student["id"]
    
    # 刪除學生
    response = client.delete(f"/students/{student_id}")
    assert response.status_code == 200
    assert "要刪除的學生" in response.json()["message"]
    
    # 確認學生已被刪除
    response = client.get(f"/students/{student_id}")
    assert response.status_code == 404

def test_delete_nonexistent_student():
    """測試刪除不存在的學生"""
    response = client.delete("/students/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "學生未找到"

def test_existing_endpoints_still_work():
    """測試原有的端點仍然正常工作"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from vibe_coding FastAPI template"}
    
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}