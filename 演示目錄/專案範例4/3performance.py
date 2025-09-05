"""
AI輔助 Code refactoring,下面有錯誤的地方,請AI協助查出

#prompts
- 優化這段程式碼的效能
"""

import time
import random
from collections import deque, OrderedDict

# 問題1: 重複計算相同的值
def calculate_factorial_slow(n):
    """計算階乘，但避免重複計算 factorial(10) 並使用迭代版本提高效能"""
    def factorial_iter(x):
        result = 1
        for i in range(2, x + 1):
            result *= i
        return result

    fact10 = factorial_iter(10)  # 只計算一次
    # 使用列表推導提高效能
    return [fact10 + i for i in range(n)]

# 問題2: 在迴圈中使用低效的字串連接
def build_string_slow(words):
    """使用 join 代替多次 + 連接"""
    if not words:
        return ""
    # 保持與原本輸出類似（每個單字後有一個空格）
    return " ".join(words) + " "

# 問題3: 使用不當的資料結構
def find_duplicates_slow(numbers):
    """使用集合以 O(n) 找出重複元素"""
    seen = set()
    duplicates = set()
    for num in numbers:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)
    return list(duplicates)

# 問題4: 不必要的深拷貝
def process_data_slow(data):
    """避免深拷貝，對 dict 使用淺拷貝即可（若欄位為複雜可視情況調整）"""
    results = []
    for item in data:
        # 使用淺拷貝取代 deepcopy，效能與記憶體使用更好
        temp = item.copy()
        temp['processed'] = True
        results.append(temp)
    return results

# 問題5: 低效的排序
def sort_students_slow(students):
    """使用內建 sorted 並以 score 排序（降冪）"""
    # 回傳新的排序列表，不破壞原始資料（如原本有 copy 需求可在呼叫端處理）
    return sorted(students, key=lambda s: s.get('score', 0), reverse=True)

# 問題6: 記憶體洩漏風險
class DataProcessor:
    def __init__(self, max_cache_size=1000, recent_items_limit=1000):
        # 使用 OrderedDict 實作簡單 LRU cache，避免快取無限制增長
        self.cache = OrderedDict()
        self.max_cache_size = max_cache_size
        # processed_items 使用有長度上限的 deque，避免無限制儲存造成記憶體洩漏
        self.processed_items = deque(maxlen=recent_items_limit)
    
    def process_item(self, item):
        """快取有限大小並保存最近處理項目（受限長度）"""
        item_id = item['id']
        if item_id not in self.cache:
            # 模擬複雜計算，但將 sleep 減到極小量或移除以提升效能
            # time.sleep(0.0001)
            computed = item['value'] * 2
            # 新增到 OrderedDict，保持最近使用在尾端
            self.cache[item_id] = computed
            # 若超過快取大小，移除最舊項目
            if len(self.cache) > self.max_cache_size:
                self.cache.popitem(last=False)
        else:
            # 若命中，將該鍵移到尾端表示最近使用（維持 LRU 行為）
            self.cache.move_to_end(item_id)

        # 保存最近處理過的項目（有上限，不會無限制增長）
        self.processed_items.append(item)
        return self.cache[item_id]

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