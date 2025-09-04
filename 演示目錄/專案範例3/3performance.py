"""
AI輔助 Code refactoring,下面有錯誤的地方,請AI協助查出

#prompts
- 優化這段程式碼的效能
"""

import time
import random

# 問題1: 重複計算相同的值
def calculate_factorial_slow(n):
    """計算階乘，但每次都重新計算"""
    def factorial(x):
        if x <= 1:
            return 1
        return x * factorial(x - 1)
    
    result = []
    for i in range(n):
        # 每次都重新計算 factorial(10)
        result.append(factorial(10) + i)
    return result

# 問題2: 在迴圈中使用低效的字串連接
def build_string_slow(words):
    """使用 + 來連接字串，效率低下"""
    result = ""
    for word in words:
        result = result + word + " "
    return result

# 問題3: 使用不當的資料結構
def find_duplicates_slow(numbers):
    """使用列表來查找重複，時間複雜度 O(n²)"""
    duplicates = []
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] == numbers[j] and numbers[i] not in duplicates:
                duplicates.append(numbers[i])
    return duplicates

# 問題4: 不必要的深拷貝
def process_data_slow(data):
    """每次處理都創建新的副本"""
    import copy
    results = []
    for item in data:
        # 不必要的深拷貝
        temp = copy.deepcopy(item)
        temp['processed'] = True
        results.append(temp)
    return results

# 問題5: 低效的排序
def sort_students_slow(students):
    """使用冒泡排序，時間複雜度 O(n²)"""
    n = len(students)
    for i in range(n):
        for j in range(0, n - i - 1):
            if students[j]['score'] < students[j + 1]['score']:
                students[j], students[j + 1] = students[j + 1], students[j]
    return students

# 問題6: 記憶體洩漏風險
class DataProcessor:
    def __init__(self):
        self.cache = {}
        self.processed_items = []
    
    def process_item(self, item):
        """快取不斷增長，沒有清理機制"""
        if item['id'] not in self.cache:
            # 模擬複雜計算
            time.sleep(0.001)
            self.cache[item['id']] = item['value'] * 2
        
        # 保存所有處理過的項目（記憶體洩漏）
        self.processed_items.append(item)
        return self.cache[item['id']]

# 測試函數
if __name__ == "__main__":
    print("=== 性能問題範例 ===")
    
    # 測試1: 重複計算
    print("1. 重複計算測試:")
    start = time.time()
    result1 = calculate_factorial_slow(1000)
    print(f"   耗時: {time.time() - start:.3f}秒")
    
    # 測試2: 字串連接
    print("2. 字串連接測試:")
    words = ["hello"] * 5000
    start = time.time()
    result2 = build_string_slow(words)
    print(f"   耗時: {time.time() - start:.3f}秒")
    
    # 測試3: 查找重複
    print("3. 查找重複測試:")
    numbers = [random.randint(1, 100) for _ in range(1000)]
    start = time.time()
    result3 = find_duplicates_slow(numbers)
    print(f"   耗時: {time.time() - start:.3f}秒")
    
    # 測試4: 深拷貝
    print("4. 深拷貝測試:")
    data = [{'id': i, 'value': random.randint(1, 100)} for i in range(1000)]
    start = time.time()
    result4 = process_data_slow(data)
    print(f"   耗時: {time.time() - start:.3f}秒")
    
    # 測試5: 排序
    print("5. 排序測試:")
    students = [{'name': f'student_{i}', 'score': random.randint(60, 100)} for i in range(100)]
    start = time.time()
    result5 = sort_students_slow(students.copy())
    print(f"   耗時: {time.time() - start:.3f}秒")
    
    print("\n=== 所有測試完成 ===")