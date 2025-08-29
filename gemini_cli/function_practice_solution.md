```python
# -*- coding: utf-8 -*-

"""
這是一個練習 Python 函式定義與實作的檔案。
請完成以下五個函式的實作。
"""

import math

def calculate_circle_area(radius):
    """
    計算並回傳圓形的面積。

    圓面積公式為 pi * r^2，請使用 3.14159 作為 pi 的近似值。

    Args:
        radius (int or float): 圓形的半徑。

    Returns:
        float: 計算出的圓形面積。
    """
    pi = 3.14159
    return pi * (radius ** 2)

def is_palindrome(text):
    """
    檢查一個字串是否為迴文。

    迴文是指一個字串從前面讀和從後面讀都一樣，忽略大小寫和空格。
    例如："A man a plan a canal Panama" 是一個迴文。

    Args:
        text (str): 要檢查的字串。

    Returns:
        bool: 如果字串是迴文，則回傳 True，否則回傳 False。
    """
    # 移除空格並轉換為小寫
    cleaned_text = ''.join(filter(str.isalnum, text)).lower()
    # 檢查清理後的字串是否與其反轉版本相同
    return cleaned_text == cleaned_text[::-1]

def find_max_in_list(numbers):
    """
    找出並回傳一個數字列表中的最大值。

    如果列表是空的，應該回傳 None。

    Args:
        numbers (list of int or float): 一個數字列表。

    Returns:
        int or float or None: 列表中的最大值，或在列表為空時回傳 None。
    """
    if not numbers:
        return None
    return max(numbers)

def count_vowels(sentence):
    """
    計算一個句子中母音 (a, e, i, o, u) 的數量。

    這個計算應該不區分大小寫。

    Args:
        sentence (str): 要分析的句子。

    Returns:
        int: 句子中母音的總數。
    """
    vowels = "aeiou"
    count = 0
    for char in sentence.lower():
        if char in vowels:
            count += 1
    return count

def reverse_string(s):
    """
    將輸入的字串反轉。

    例如：輸入 "hello"，應回傳 "olleh"。

    Args:
        s (str): 要反轉的字串。

    Returns:
        str: 反轉後的字串。
    """
    return s[::-1]

# --- 學生練習區結束 ---

# --- 測試程式碼 ---
if __name__ == '__main__':
    print(f"圓形面積 (半徑=10): {calculate_circle_area(10)}")
    print(f"'A man a plan a canal Panama' 是迴文嗎？ {is_palindrome('A man a plan a canal Panama')}")
    print(f"'hello' 是迴文嗎？ {is_palindrome('hello')}")
    print(f"[1, 2, 3, 4, 5] 中的最大值是: {find_max_in_list([1, 2, 3, 4, 5])}")
    print(f"[] 中的最大值是: {find_max_in_list([])}")
    print(f"'Hello World' 中的母音數量: {count_vowels('Hello World')}")
    print(f"'hello' 的反轉是: {reverse_string('hello')}")
```