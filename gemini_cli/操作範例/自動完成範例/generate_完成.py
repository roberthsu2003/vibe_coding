# 這個檔案包含了 Gemini CLI 中 /generate 指令的範例。

# 要生成初始函式，你可以使用像這樣的提示：
# /generate 一個名為 `add` 的 Python 函式，它接受兩個數字並返回它們的和。

def add(a, b):
    """
    將兩個數字相加。

    這個文件字串是透過像這樣的提示新增的：
    /generate 為 `add` 函式建立文件字串。
    """
    return a + b

# 要生成一個新的函式，你可以使用像這樣的提示：
# /generate 一個名為 `subtract` 的函式，它接受兩個數字並返回它們的差。

def subtract(a, b):
    """將第一個數字減去第二個數字。"""
    return a - b

# 要為這些函式生成單元測試，你可以使用像這樣的提示：
# /generate 使用 unittest 框架為此檔案中的函式建立單元測試。

import unittest

class TestMathFunctions(unittest.TestCase):

    def test_add(self):
        self.assertEqual(add(1, 2), 3)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(0, 0), 0)

    def test_subtract(self):
        self.assertEqual(subtract(5, 3), 2)
        self.assertEqual(subtract(10, 5), 5)
        self.assertEqual(subtract(-1, -1), 0)

if __name__ == '__main__':
    unittest.main()