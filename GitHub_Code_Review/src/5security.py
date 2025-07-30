"""
AI輔助 Code refactoring,下面有錯誤的地方,請AI協助查出

#prompts
- 請檢查程式碼安全性問題
"""
#!/bin/python3

import pymysql

def run(name):
    db = pymysql.connect(
        host="localhost",
        root="root",
        password="password",
        database="my_db")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE name = '%s'" % name)
    db.close()