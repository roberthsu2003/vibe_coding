# TDD 測試檢查清單

> **使用說明**: 這份檢查清單協助你確保測試的完整性與品質。在撰寫測試或審核 AI 生成的測試時使用。

---

## 測試覆蓋度檢查

### 功能測試覆蓋

- [ ] **Happy Path (正常流程)**: 功能在正常情況下可以正確運作
- [ ] **Edge Cases (邊界條件)**: 測試極端值、臨界點
  - [ ] 空值 (null, undefined, empty string, empty array)
  - [ ] 最小值/最大值
  - [ ] 剛好在邊界上的值
- [ ] **Error Handling (錯誤處理)**: 測試各種錯誤情況
  - [ ] 無效輸入
  - [ ] 缺少必要參數
  - [ ] 型別錯誤
  - [ ] 超出範圍

### 範例: 登入功能測試覆蓋

```markdown
✅ 正常流程
  ✅ 使用正確的帳號密碼可以登入
  ✅ 登入後返回正確的 token
  ✅ 登入後導向到首頁

✅ 邊界條件
  ✅ 帳號長度剛好 3 個字元(最小值)
  ✅ 帳號長度剛好 20 個字元(最大值)
  ✅ 密碼長度剛好 8 個字元(最小值)

✅ 錯誤處理
  ✅ 帳號不存在時顯示錯誤
  ✅ 密碼錯誤時顯示錯誤
  ✅ 帳號為空時顯示錯誤
  ✅ 密碼為空時顯示錯誤
  ✅ 帳號格式不正確時顯示錯誤
```

---

## 測試品質檢查

### 測試獨立性

- [ ] **每個測試都是獨立的**: 測試之間不互相依賴
- [ ] **測試順序無關**: 任意順序執行結果相同
- [ ] **清理測試資料**: 測試後清理建立的資料

**反例**:
```javascript
// ❌ 錯誤: 測試 2 依賴測試 1 的結果
test('test 1: create user', () => {
  user = createUser('Alice');
  expect(user).toBeDefined();
});

test('test 2: update user', () => {
  updateUser(user.id, { name: 'Bob' }); // 依賴測試 1 建立的 user
  expect(user.name).toBe('Bob');
});
```

**正例**:
```javascript
// ✅ 正確: 每個測試獨立
test('should create user', () => {
  const user = createUser('Alice');
  expect(user).toBeDefined();
  cleanup(user); // 清理資料
});

test('should update user', () => {
  const user = createUser('Alice'); // 自己建立測試資料
  updateUser(user.id, { name: 'Bob' });
  expect(user.name).toBe('Bob');
  cleanup(user);
});
```

---

### 測試可讀性

- [ ] **清楚的測試名稱**: 從名稱就能知道測試什麼
- [ ] **遵循 AAA 模式**: Arrange (準備) → Act (執行) → Assert (驗證)
- [ ] **一個測試只測一件事**: 不要在一個測試裡驗證多個功能

**反例**:
```javascript
// ❌ 不好的測試名稱
test('test 1', () => {
  // 不知道在測什麼
});
```

**正例**:
```javascript
// ✅ 清楚的測試名稱
test('should return error when password is less than 8 characters', () => {
  // Arrange (準備)
  const password = '1234567'; // 7 個字元

  // Act (執行)
  const result = validatePassword(password);

  // Assert (驗證)
  expect(result.isValid).toBe(false);
  expect(result.error).toBe('Password must be at least 8 characters');
});
```

---

### 測試穩定性

- [ ] **不依賴外部資源**: 測試不應依賴真實的 API、資料庫
- [ ] **使用 Mock**: 模擬外部依賴
- [ ] **避免隨機性**: 不使用隨機數、當前時間等不確定因素

**反例**:
```javascript
// ❌ 不穩定的測試
test('should create user with current timestamp', () => {
  const user = createUser('Alice');
  expect(user.createdAt).toBe(new Date()); // 時間永遠對不上!
});
```

**正例**:
```javascript
// ✅ 穩定的測試
test('should create user with timestamp', () => {
  const mockDate = new Date('2024-01-01');
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  const user = createUser('Alice');
  expect(user.createdAt).toBe(mockDate);
});
```

---

## 測試類型完整性

### 單元測試 (Unit Tests)

- [ ] **測試所有公開函式**: 每個 public function 都有測試
- [ ] **測試各種輸入組合**: 不同參數的組合
- [ ] **測試回傳值**: 驗證正確的回傳值
- [ ] **測試副作用**: 驗證狀態改變、函式呼叫等

### 整合測試 (Integration Tests)

- [ ] **測試模組間互動**: 不同模組是否正確協作
- [ ] **測試資料流**: 資料是否正確在模組間傳遞
- [ ] **測試 API 端點**: 測試完整的 request-response 循環

### E2E 測試 (End-to-End Tests)

- [ ] **測試關鍵使用者流程**: 如註冊、登入、購買流程
- [ ] **測試跨頁面互動**: 使用者在不同頁面間的操作
- [ ] **測試真實情境**: 模擬實際使用者行為

---

## 安全性測試檢查

- [ ] **SQL Injection 測試**: 輸入包含 SQL 語法
- [ ] **XSS 測試**: 輸入包含 HTML/JavaScript 標籤
- [ ] **認證測試**: 未登入時無法存取受保護資源
- [ ] **授權測試**: 使用者無法存取無權限的資源
- [ ] **敏感資料測試**: 密碼等敏感資料有正確加密

**範例 Prompts**:
```
請幫我生成安全性測試案例，測試登入功能是否能防禦:
1. SQL Injection 攻擊
2. XSS 攻擊
3. 暴力破解(連續失敗登入)
4. 密碼是否正確加密儲存
```

---

## 效能測試檢查

- [ ] **回應時間測試**: API 回應時間是否在可接受範圍
- [ ] **負載測試**: 同時多個請求時系統是否正常
- [ ] **記憶體洩漏測試**: 長時間運作是否有記憶體洩漏
- [ ] **大資料量測試**: 處理大量資料時的效能

---

## 測試覆蓋率標準

### 建議的覆蓋率目標

| 專案類型     | Line Coverage | Branch Coverage | Function Coverage |
| -------- | ------------- | --------------- | ----------------- |
| 關鍵系統     | > 90%         | > 85%           | 100%              |
| 一般專案     | > 80%         | > 75%           | > 90%             |
| 快速原型     | > 60%         | > 50%           | > 70%             |

### 查看覆蓋率報告

**Jest 設定**:
```bash
npm test -- --coverage
```

**檢查重點**:
- [ ] 核心業務邏輯覆蓋率 > 90%
- [ ] 認證授權相關功能覆蓋率 100%
- [ ] 新增功能都有對應測試

---

## 使用 AI 審核測試

### Prompt 範例: 請 AI 審核測試品質

```
請審核以下測試程式碼的品質，檢查:

1. 測試覆蓋度
   - 是否涵蓋 happy path, edge cases, error handling?
   - 有沒有遺漏重要的測試情境?

2. 測試品質
   - 測試是否獨立?
   - 測試名稱是否清楚?
   - 是否遵循 AAA 模式?

3. 測試穩定性
   - 是否有依賴外部資源?
   - 是否有不穩定的隨機性?

4. 改進建議
   - 哪些地方可以改善?

[貼上測試程式碼]
```

### Prompt 範例: 請 AI 補充遺漏的測試

```
以下是我的測試程式碼和覆蓋率報告:

測試程式碼:
[貼上現有測試]

覆蓋率報告顯示以下程式碼未被測試:
[貼上未涵蓋的程式碼片段]

請幫我:
1. 分析為什麼這些程式碼未被測試
2. 生成測試案例來涵蓋這些程式碼
3. 確保測試涵蓋所有分支
```

---

## 測試維護檢查清單

### 定期檢查 (每週/每月)

- [ ] **移除過時的測試**: 刪除已不存在功能的測試
- [ ] **更新測試資料**: 確保測試資料符合最新的資料格式
- [ ] **檢查測試執行時間**: 過慢的測試需要優化
- [ ] **檢查失敗的測試**: 確認失敗原因並修復

### 新增功能時

- [ ] **先寫測試**: 遵循 TDD 流程
- [ ] **確保測試失敗**: 確認測試真的在測試新功能
- [ ] **實作功能**: 讓測試通過
- [ ] **重構**: 優化程式碼，確保測試仍然通過

---

## 常見測試反模式 (Anti-patterns)

### ❌ 反模式 1: 測試實作細節

```javascript
// ❌ 不好: 測試內部實作
test('should call internal method', () => {
  const obj = new MyClass();
  const spy = jest.spyOn(obj, '_internalMethod');
  obj.publicMethod();
  expect(spy).toHaveBeenCalled();
});

// ✅ 好: 測試公開行為
test('should produce correct result', () => {
  const obj = new MyClass();
  const result = obj.publicMethod();
  expect(result).toBe(expectedValue);
});
```

### ❌ 反模式 2: 過度 Mock

```javascript
// ❌ 不好: Mock 所有東西
test('should work', () => {
  const mock1 = jest.fn().mockReturnValue(1);
  const mock2 = jest.fn().mockReturnValue(2);
  const mock3 = jest.fn().mockReturnValue(3);
  // ... 測試已經不是測試真實行為了
});

// ✅ 好: 只 Mock 外部依賴
test('should work', () => {
  const mockExternalAPI = jest.fn().mockResolvedValue({ data: '...' });
  // 其他邏輯使用真實實作
});
```

### ❌ 反模式 3: 不明確的斷言

```javascript
// ❌ 不好: 斷言過於寬鬆
test('should return something', () => {
  const result = doSomething();
  expect(result).toBeDefined(); // 太模糊!
});

// ✅ 好: 明確的斷言
test('should return user with correct properties', () => {
  const result = getUser(1);
  expect(result).toEqual({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com'
  });
});
```

---

## 快速自我檢查

完成測試後，快速過一遍這個檢查清單:

1. ✅ 所有測試都通過了嗎?
2. ✅ 測試覆蓋率達到目標了嗎?
3. ✅ 測試名稱清楚易懂嗎?
4. ✅ 測試是獨立的嗎?
5. ✅ 測試能穩定重複執行嗎?
6. ✅ Edge cases 都測試了嗎?
7. ✅ 錯誤處理都測試了嗎?
8. ✅ 安全性問題都考慮了嗎?

**如果有任何一項是 ❌,回去改善測試!**

---

**記住**: 好的測試是專案的安全網，讓你能放心重構和新增功能。投資在測試上的時間，會在未來節省數倍的除錯時間!
