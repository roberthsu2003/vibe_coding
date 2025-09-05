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

def print_christmas_tree(height):
    """
    印出一個指定高度的聖誕樹。

    :param height: 聖誕樹的高度 (不包含樹幹)
    """
    if height <= 0:
        print("高度需要是正整數！")
        return

    # 印出樹葉
    for i in range(height):
        spaces = " " * (height - i - 1)
        stars = "*" * (2 * i + 1)
        print(spaces + stars)

    # 印出樹幹
    trunk_spaces = " " * (height - 1)
    print(trunk_spaces + "|")
    print(trunk_spaces + "|")


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
    print("為您獻上聖誕樹：")
    print_christmas_tree(10)
    print("\n接著執行單元測試...\n")
    unittest.main()
