# 3. TDD (測試驅動開發 / Test-Driven Development)

這是確保 Vibe Coding 不會變成 "Bug Coding" 的安全網。

## 為何需要 TDD?

- **教學重點**：不是傳統的「先寫測試再寫程式」，而是**「讓 AI 幫你寫測試來驗證它的程式」**。
- **為何需要**：當生成速度極快時，人類很難手動檢查每一行程式碼。自動化測試是唯一能跟上生成速度的驗證方式。
- **Vibe 觀點**：在 AI 時代，TDD 變成了 "AI-Verified Development"。你要求 AI 寫功能的同時，也要求它產出驗證該功能的測試腳本。

---

## AI 時代的 TDD 工作流程

### 傳統 TDD vs AI-Verified Development

| **步驟**          | **傳統 TDD**             | **AI-Verified Development**       |
| --------------- | ---------------------- | --------------------------------- |
| 1. 寫測試         | 人工寫測試案例                | **AI 根據需求生成測試案例**                 |
| 2. 執行測試(Red)   | 測試失敗(因為功能尚未實作)         | 測試失敗(因為功能尚未實作)                    |
| 3. 寫程式碼(Green)  | 人工實作功能讓測試通過            | **AI 實作功能讓測試通過**                  |
| 4. 重構(Refactor) | 人工優化程式碼，確保測試仍通過        | **AI 優化程式碼，確保測試仍通過**              |
| 5. 驗證          | 手動 code review         | **AI code review + 人工審核關鍵邏輯**     |

---

## 教學流程：如何在 AI 協作中實踐 TDD

### 步驟 1: 定義功能需求

在開始前，先明確告訴 AI 你要實作什麼功能。

**範例 Prompt**:
```
我要實作一個計算機功能，需要支援以下操作:
- 加法 (add)
- 減法 (subtract)
- 乘法 (multiply)
- 除法 (divide)

除法需要處理除以零的錯誤。
```

---

### 步驟 2: 請 AI 生成測試案例

**Prompt 範例**:
```
請幫我針對上述計算機功能，使用 Jest 測試框架生成完整的測試案例。
測試應該包含:
1. 正常情況的測試 (Happy Path)
2. 邊界條件測試 (Edge Cases)
3. 錯誤處理測試 (Error Handling)

請使用 describe 和 it 組織測試結構。
```

**AI 生成的測試範例** (JavaScript/Jest):
```javascript
// calculator.test.js
const Calculator = require('./calculator');

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  describe('加法測試', () => {
    it('應該正確計算兩個正數的和', () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    it('應該正確處理負數', () => {
      expect(calc.add(-1, 1)).toBe(0);
    });

    it('應該正確處理小數', () => {
      expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('除法測試', () => {
    it('應該正確計算除法', () => {
      expect(calc.divide(6, 2)).toBe(3);
    });

    it('除以零應該拋出錯誤', () => {
      expect(() => calc.divide(5, 0)).toThrow('Cannot divide by zero');
    });
  });
});
```

---

### 步驟 3: 執行測試 (Red)

此時測試會失敗，因為功能尚未實作。

```bash
npm test

# 輸出:
# FAIL  calculator.test.js
#   Calculator is not defined
```

---

### 步驟 4: 請 AI 實作功能 (Green)

**Prompt 範例**:
```
請根據上面的測試案例，實作 Calculator 類別，確保所有測試都能通過。
```

**AI 生成的程式碼**:
```javascript
// calculator.js
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}

module.exports = Calculator;
```

執行測試:
```bash
npm test

# 輸出:
# PASS  calculator.test.js
#   ✓ 所有測試通過
```

---

### 步驟 5: 重構與優化 (Refactor)

**Prompt 範例**:
```
請審查上面的程式碼，並進行以下優化:
1. 改善錯誤訊息的可讀性
2. 加入輸入驗證(確保參數是數字)
3. 確保重構後測試仍然通過
```

**AI 優化後的程式碼**:
```javascript
class Calculator {
  _validateNumber(value, paramName) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(`${paramName} must be a valid number`);
    }
  }

  add(a, b) {
    this._validateNumber(a, 'First parameter');
    this._validateNumber(b, 'Second parameter');
    return a + b;
  }

  divide(a, b) {
    this._validateNumber(a, 'Dividend');
    this._validateNumber(b, 'Divisor');

    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  // ... 其他方法
}
```

---

## 常用測試框架介紹

### JavaScript/TypeScript
- **Jest**: 最流行的 JS 測試框架，內建 mock、覆蓋率報告
- **Vitest**: 更快的現代測試框架，與 Vite 深度整合
- **Mocha + Chai**: 靈活但需要更多配置

### Python
- **pytest**: Python 最推薦的測試框架，語法簡潔
- **unittest**: Python 內建，適合傳統 TDD
- **doctest**: 適合簡單的文檔測試

### Java
- **JUnit 5**: Java 標準測試框架
- **TestNG**: 更靈活的企業級測試框架
- **Mockito**: 用於 mock 物件

---

## 如何 Prompt AI 生成高品質測試

### ✅ 好的 Prompt 範例

```
請幫我生成 pytest 測試案例，測試使用者註冊功能:

需求:
- 使用者名稱必須是 3-20 個字元
- Email 必須符合標準格式
- 密碼必須至少 8 個字元，包含大小寫字母和數字

請包含以下測試:
1. 有效輸入的成功案例
2. 各種無效輸入的失敗案例(太短、太長、格式錯誤)
3. 邊界條件(剛好 3 個字元、剛好 20 個字元)
4. SQL injection 安全性測試
```

### ❌ 不好的 Prompt 範例

```
寫個測試
```

---

## 測試覆蓋率的重要性

### 什麼是測試覆蓋率?

測試覆蓋率衡量你的測試執行了多少程式碼。

**常見指標**:
- **Line Coverage** (行覆蓋率): 測試執行了多少行程式碼
- **Branch Coverage** (分支覆蓋率): 測試涵蓋了多少 if/else 分支
- **Function Coverage** (函式覆蓋率): 測試呼叫了多少函式

### 如何使用 AI 提升覆蓋率

**Prompt 範例**:
```
我的測試覆蓋率報告顯示 auth.js 的第 45-52 行未被測試涵蓋。

未測試的程式碼:
```javascript
if (user.role === 'admin' && user.verified) {
  return { access: 'full', permissions: ['read', 'write', 'delete'] };
} else {
  return { access: 'limited', permissions: ['read'] };
}
```

請生成測試案例來涵蓋這段程式碼的所有分支。
```

---

## 常見測試反模式與解決方案

### ❌ 反模式 1: 只測試 Happy Path

**問題**:
```javascript
it('應該計算總價', () => {
  expect(calculateTotal([10, 20, 30])).toBe(60);
});
```

**解決方案**: 加入邊界條件和錯誤處理測試
```javascript
describe('calculateTotal', () => {
  it('應該正確計算總價', () => {
    expect(calculateTotal([10, 20, 30])).toBe(60);
  });

  it('空陣列應該返回 0', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('包含負數應該拋出錯誤', () => {
    expect(() => calculateTotal([10, -5])).toThrow();
  });

  it('包含非數字應該拋出錯誤', () => {
    expect(() => calculateTotal([10, 'abc'])).toThrow();
  });
});
```

---

### ❌ 反模式 2: 測試實作細節而非行為

**問題**:
```javascript
// 測試內部變數名稱
it('應該設定 _internalCounter', () => {
  const obj = new MyClass();
  obj.increment();
  expect(obj._internalCounter).toBe(1);
});
```

**解決方案**: 測試公開的行為
```javascript
it('呼叫 increment 後 getCount 應該返回 1', () => {
  const obj = new MyClass();
  obj.increment();
  expect(obj.getCount()).toBe(1);
});
```

---

### ❌ 反模式 3: 過度依賴 AI 生成的測試

**問題**: 直接複製貼上 AI 生成的測試，不理解測試內容

**解決方案**:
1. 閱讀並理解每個測試案例
2. 詢問 AI 解釋測試邏輯
3. 確認測試涵蓋了你的實際需求

**審核測試的 Prompt**:
```
請解釋這個測試案例在測試什麼，以及為什麼需要這個測試:

```javascript
it('should handle concurrent requests', async () => {
  const promises = Array(10).fill(null).map(() => api.fetchData());
  const results = await Promise.all(promises);
  expect(results).toHaveLength(10);
});
```
```

---

## 實戰練習建議

### 練習 1: 簡單函式測試
**目標**: 實作一個 `isPalindrome` 函式，判斷字串是否為迴文

**步驟**:
1. 請 AI 生成測試案例
2. 執行測試(應該失敗)
3. 請 AI 實作函式
4. 確認測試通過
5. 請 AI 優化程式碼

---

### 練習 2: API 端點測試
**目標**: 測試一個 RESTful API 的 CRUD 操作

**步驟**:
1. 定義 API 規格(GET、POST、PUT、DELETE)
2. 請 AI 生成 API 測試(使用 Supertest 或類似工具)
3. 實作 API 端點
4. 確保測試通過
5. 加入錯誤處理測試

---

### 練習 3: 整合測試
**目標**: 測試資料庫操作

**步驟**:
1. 設定測試資料庫(SQLite in-memory 或 Docker)
2. 請 AI 生成資料庫互動的測試
3. 實作資料存取層
4. 使用交易確保測試隔離
5. 測試完成後清理資料

---

## 進階主題

### 測試金字塔

```
        /\
       /  \  End-to-End Tests (少量)
      /----\
     /      \ Integration Tests (適量)
    /--------\
   /          \ Unit Tests (大量)
  /------------\
```

**建議比例**:
- 70% Unit Tests (快速、隔離、大量)
- 20% Integration Tests (測試模組間互動)
- 10% E2E Tests (測試完整使用者流程)

---

### 使用 AI 生成 Mock 資料

**Prompt 範例**:
```
請生成 10 筆模擬使用者資料，用於測試使用者列表功能。

資料格式:
- id: 唯一識別碼
- name: 隨機姓名
- email: 有效的 email 格式
- age: 18-65 歲之間的隨機年齡
- role: 'user' 或 'admin'

請用 JavaScript 陣列格式輸出。
```

---

## 總結

### AI-Verified Development 的核心原則

1. **同步生成**: 要求 AI 在寫功能的同時生成測試
2. **審核測試**: 確認測試涵蓋了所有重要情境
3. **執行驗證**: 實際跑測試，不只是看程式碼
4. **持續重構**: 有測試保護，放心優化程式碼
5. **人工把關**: AI 可能遺漏邊界條件，需要人工補充

### 下一步

- 實際操作練習 1-3
- 嘗試將現有專案加入測試
- 探索 CI/CD 整合(自動執行測試)
- 學習進階測試技巧(Mock、Stub、Spy)

---

**記住**: 測試不是負擔，是讓你能快速迭代的信心來源。在 AI 時代，自動化測試是唯一能跟上生成速度的品質保證方式!
