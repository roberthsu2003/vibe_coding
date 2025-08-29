# 使用 `/generate` 指令自動生成程式碼

`/generate` 是一個強大的指令，可以根據你的提示自動生成或修改程式碼。

## 範例：使用 `generate.py`

這是一個簡單的 Python 檔案 `generate.py`，我們將展示如何使用 `/generate` 來建立和擴充它。

### 1. 建立初始函式

你可以使用以下提示來建立一個簡單的 `add` 函式：

> /generate a Python function called `add` that takes two numbers and returns their sum.

Gemini 會生成 `generate.py` 並寫入以下內容：

```python
def add(a, b):
    return a + b
```

### 2. 新增文件字串 (Docstring)

接著，你可以要求 Gemini 為這個函式加上說明文件：

> /generate a docstring for the `add` function.

`generate.py` 會被更新為：

```python
def add(a, b):
    """Adds two numbers and returns their sum."""
    return a + b
```

### 3. 新增另一個函式

你可以繼續要求 Gemini 新增更多功能：

> /generate a function called `subtract` that takes two numbers and returns the difference.

`generate.py` 現在會包含兩個函式：

```python
def add(a, b):
    """Adds two numbers and returns their sum."""
    return a + b

def subtract(a, b):
    """Subtracts the second number from the first."""
    return a - b
```

### 4. 生成單元測試

最後，你可以要求 Gemini 為這個檔案中的所有函式編寫單元測試：

> /generate unit tests for the functions in this file using the unittest framework.

Gemini 會在 `generate.py` 檔案的末尾加上測試程式碼：

```python
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
```

---

