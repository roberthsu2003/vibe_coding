# 包含 'add' 和 'subtract' 兩個數學函式，以及它們的單元測試。

def add(a, b):
    """
    接收兩個數字並返回它們的和。

    :param a: 第一個數字
    :param b: 第二個數字
    :return: 兩個數字相加的結果
    """
    return a + b

def subtract(a, b):
    """
    接收兩個數字並返回它們的差。

    :param a: 第一個數字
    :param b: 第二個數字
    :return: 兩個數字相減的結果
    """
    return a - b

import unittest

class TestMathFunctions(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(0, 0), 0)
    
    def test_subtract(self):
        self.assertEqual(subtract(5, 3), 2)
        self.assertEqual(subtract(10, 5), 5)
        self.assertEqual(subtract(0, 0), 0)

if __name__ == '__main__':
    unittest.main()
