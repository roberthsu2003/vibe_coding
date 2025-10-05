# B. 常見問題與最佳實踐

## 💡 常見問題 (FAQ)

### 基礎問題

#### Q1: CLAUDE.md 一定要放在專案根目錄嗎？
**A:** 是的，Claude Code 會在專案根目錄尋找 `CLAUDE.md`。但您也可以在子資料夾中建立 `CLAUDE.md` 來覆蓋特定區域的設定。

#### Q2: 檔案名稱一定要是 CLAUDE.md 嗎？大小寫重要嗎？
**A:** 是的，檔案名稱必須是 `CLAUDE.md`（全大寫）。大小寫必須正確，`claude.md` 或 `Claude.md` 都無法被識別。

#### Q3: 修改 CLAUDE.md 後需要重新啟動 VS Code 嗎？
**A:** 不需要。Claude Code 會自動偵測檔案變更並重新載入設定。

#### Q4: CLAUDE.md 應該加入 Git 版本控制嗎？
**A:** 應該！`CLAUDE.md` 是專案的一部分，應該加入版本控制，讓團隊成員共用相同的設定。

#### Q5: 可以使用中文撰寫 CLAUDE.md 嗎？
**A:** 可以！Markdown 支援 Unicode，您可以使用任何語言撰寫，包括繁體中文、簡體中文等。

---

### 設定相關

#### Q6: 如何知道 Claude Code 是否正確讀取了我的 CLAUDE.md？
**A:** 測試方式：
1. 開啟 Claude Code 對話
2. 請求建立一個簡單的元件或函數
3. 檢查 AI 的回應是否符合您在 `CLAUDE.md` 中定義的規範

#### Q7: 多個 CLAUDE.md 檔案的優先順序是什麼？
**A:** 優先順序（由高到低）：
```
資料夾層級 CLAUDE.md (最高)
    ↓
專案根目錄 CLAUDE.md
    ↓
VS Code 工作區設定
    ↓
VS Code 使用者設定 (最低)
```

#### Q8: CLAUDE.md 有長度限制嗎？
**A:** 沒有硬性限制，但建議保持在 500-1000 行以內，以確保 AI 能有效處理。過長的設定可能影響效能。

#### Q9: VSCode 擴充套件和 CLI 工具可以共用同一個 CLAUDE.md 嗎？
**A:** 可以！兩者都會讀取專案的 `CLAUDE.md`。CLI 工具還額外支援全域 CLAUDE.md (`~/.claude/CLAUDE.md`)。

#### Q10: .claude/ 目錄是什麼？VSCode 也能用嗎？
**A:** `.claude/` 目錄是 **CLI 工具專屬的進階設定方式**,包含:
- `.claude/settings.json` - CLI 專案配置
- `.claude/commands/*.md` - 自訂 Slash Commands
- `.claude/prompts/*.md` - Prompt 模板

VSCode 擴充套件**不直接支援**這些設定檔,但會使用 CLI 配置的 MCP 伺服器和 Subagents。

詳見: [2.5 .claude/ 目錄設定完整指南](../chapter2/2.5-claude-directory.md)

---

### 內容撰寫

#### Q11: 應該在 CLAUDE.md 中包含哪些內容？
**A:** 建議包含：
- ✅ 專案概觀和目標
- ✅ 技術棧和版本
- ✅ 編碼規範和風格
- ✅ 專案結構說明
- ✅ 禁止事項
- ✅ API 互動規則
- ✅ 測試要求

#### Q12: 如何撰寫有效的禁止事項？
**A:** 使用明確的否定語句和範例：
```markdown
## 🚫 禁止事項
- ❌ 不要使用 `any` 類型
  ✅ 應使用具體的型別定義

- ❌ 不要在元件內直接呼叫 API
  ✅ 應使用 service 層
```

#### Q13: 程式碼範例應該如何撰寫？
**A:** 使用對比方式，清楚標示正確和錯誤：
```markdown
\`\`\`typescript
// ✅ 正確
const user = await userService.getUser(id);

// ❌ 錯誤
const user = await axios.get('/users/' + id);
\`\`\`
```

---

### 進階使用

#### Q14: 如何為不同的開發階段設定不同的 System Prompt？
**A:** 使用 CLI 工具的命令列參數：
```bash
# 開發階段
claude -p "建立功能" --append-system-prompt "快速原型，可以省略部分錯誤處理"

# 生產階段
claude -p "建立功能" --append-system-prompt "完整的錯誤處理和測試"
```

#### Q15: 如何在團隊中統一 System Prompt 設定？
**A:**
1. 將 `CLAUDE.md` 加入版本控制
2. 在 PR 中審查 `CLAUDE.md` 的變更
3. 在團隊文件中說明設定規範
4. 定期審查和更新設定

#### Q16: 可以動態引用其他檔案的內容嗎？
**A:** 目前不支援直接引用。但您可以：
- 在 `CLAUDE.md` 中說明參考哪些文件
- 使用 CLI 工具讀取檔案內容並附加到 prompt

---

## 🏆 最佳實踐

### 1. 結構化組織

**✅ 推薦做法:**
```markdown
# 專案名稱

## 🎯 專案概觀
[簡短描述]

## ⚙️ 技術棧
[列出技術]

## 📏 編碼規範
### 元件規範
[元件相關規則]

### 命名規範
[命名相關規則]
```

**❌ 避免做法:**
```markdown
# 一堆沒有組織的規則
- 規則1
- 規則2
- 隨意的想法
```

---

### 2. 使用清晰的語言

**✅ 推薦做法:**
```markdown
- 所有元件必須使用 TypeScript Function Component
- Props 必須定義 interface
- 使用 2 空格縮排
```

**❌ 避免做法:**
```markdown
- 盡量用 TypeScript
- 最好定義 Props
- 縮排看情況
```

---

### 3. 提供具體範例

**✅ 推薦做法:**
```markdown
## API 呼叫範例

\`\`\`typescript
// ✅ 正確：使用 service 層
const user = await userService.getUserById(userId);

// ❌ 錯誤：直接呼叫 API
const response = await axios.get(`/api/users/${userId}`);
\`\`\`
```

**❌ 避免做法:**
```markdown
## API 呼叫
使用 service 層
```

---

### 4. 保持更新

**✅ 推薦做法:**
- 定期審查 `CLAUDE.md`（例如每月一次）
- 當技術棧升級時更新版本號
- 移除過時的規則
- 加入新的最佳實踐

**❌ 避免做法:**
- 建立後就不再維護
- 保留已棄用的規則
- 版本號過時

---

### 5. 團隊協作

**✅ 推薦做法:**
```markdown
# CLAUDE.md 變更流程
1. 建立分支修改 CLAUDE.md
2. 提交 PR 並說明變更原因
3. 團隊審查
4. 合併到主分支
```

**❌ 避免做法:**
- 個人隨意修改
- 不通知團隊成員
- 缺少變更記錄

---

## 🔧 疑難排解

### 問題：AI 沒有遵循 CLAUDE.md 的規範

**可能原因和解決方案：**

1. **檔案位置錯誤**
   - 檢查：確認 `CLAUDE.md` 在專案根目錄
   - 解決：移動檔案到正確位置

2. **檔案名稱錯誤**
   - 檢查：確認檔案名稱是 `CLAUDE.md`（全大寫）
   - 解決：重新命名檔案

3. **規範描述不夠明確**
   - 檢查：規範是否清晰具體
   - 解決：加入更多細節和範例

4. **檔案過長或過於複雜**
   - 檢查：檔案行數和複雜度
   - 解決：簡化內容，聚焦核心規範

---

### 問題：資料夾層級設定沒有生效

**解決步驟：**

1. 確認資料夾結構：
```
project/
├── CLAUDE.md           # 專案層級
└── src/
    └── admin/
        └── CLAUDE.md   # 資料夾層級
```

2. 確認您正在編輯 `src/admin/` 下的檔案

3. 檢查子資料夾的 `CLAUDE.md` 內容是否正確

---

### 問題：CLI 和 VSCode 行為不一致

**可能原因：**
- CLI 使用了全域 CLAUDE.md (`~/.claude/CLAUDE.md`)
- CLI 使用了命令列參數覆蓋設定

**解決方案：**
```bash
# 檢查 CLI 的全域設定
cat ~/.claude/CLAUDE.md

# 不使用全域設定測試
claude --no-global-config -p "測試請求"
```

---

## 📝 檢查清單

使用此清單確保您的 CLAUDE.md 設定正確：

### 基本設定
- [ ] 檔案名稱是 `CLAUDE.md`（全大寫）
- [ ] 檔案位於專案根目錄
- [ ] 已加入 Git 版本控制
- [ ] 團隊成員都知道這個檔案的存在

### 內容完整性
- [ ] 包含專案概觀
- [ ] 列出技術棧和版本
- [ ] 定義編碼規範
- [ ] 說明專案結構
- [ ] 列出禁止事項
- [ ] 提供程式碼範例

### 品質檢查
- [ ] 語言清晰明確
- [ ] 使用結構化組織
- [ ] 提供具體範例
- [ ] 沒有過時的資訊
- [ ] 長度適中（建議 500-1000 行）

### 測試驗證
- [ ] 已測試 AI 是否遵循規範
- [ ] 團隊成員已驗證
- [ ] 針對常見場景測試

---

## 💡 額外資源

### 範例資源庫
- [第四章：實用範例集](../chapter4/README.md)
- [React + TypeScript 範例](../chapter4/4.1-react-typescript.md)
- [Node.js 後端範例](../chapter4/4.2-nodejs-backend.md)

### 進階技巧
- [第五章：進階技巧](../chapter5/README.md)
- [動態調整 System Prompt](../chapter5/5.1-dynamic-adjustment.md)
- [團隊協作設定](../chapter5/5.3-team-collaboration.md)

## 導航

- **上一頁**: [A. 與其他 AI 編輯器比較](./A-comparison.md)
- **下一頁**: [C. 快速參考](./C-quick-reference.md)
- **返回**: [教材首頁](../../README.md)
