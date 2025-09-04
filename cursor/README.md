# Cursor 完整功能與操作指南

## 目錄
- [簡介](#簡介)
- [安裝與設定](#安裝與設定)
- [核心功能](#核心功能)
- [AI 輔助功能](#ai-輔助功能)
- [快捷鍵與操作](#快捷鍵與操作)
- [進階功能](#進階功能)
- [擴充套件](#擴充套件)
- [最佳實踐](#最佳實踐)
- [常見問題](#常見問題)
- [效能優化](#效能優化)

## 簡介

Cursor 是一款基於 VS Code 的 AI 驅動程式碼編輯器，專為現代開發者設計。它整合了先進的 AI 技術，提供智能程式碼補全、生成、重構等功能，大幅提升開發效率。

### 主要特色
- 🤖 內建 AI 程式碼助手
- ⚡ 智能程式碼補全和生成
- 🔄 自動程式碼重構
- 💬 自然語言程式設計
- 🎯 上下文感知建議
- 🔍 智能除錯協助

### 支援語言
- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- PHP
- Ruby
- 以及更多...

## 安裝與設定

### 系統需求
- **作業系統**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)
- **記憶體**: 最少 4GB RAM (建議 8GB+)
- **儲存空間**: 至少 1GB 可用空間
- **網路**: 穩定的網路連線 (AI 功能需要)

### 下載與安裝

#### Windows
```bash
# 下載安裝檔
# 前往 https://cursor.sh 下載 Windows 版本
# 執行 cursor-setup.exe 並依照指示安裝
```

#### macOS
```bash
# 使用 Homebrew 安裝
brew install --cask cursor

# 或直接下載 DMG 檔案
# 前往 https://cursor.sh 下載 macOS 版本
```

#### Linux
```bash
# Ubuntu/Debian
wget -O cursor.deb https://cursor.sh/linux
sudo dpkg -i cursor.deb

# 或使用 AppImage
wget https://cursor.sh/linux-appimage
chmod +x cursor.appimage
./cursor.appimage
```

### 初始設定

#### 1. 帳號註冊與登入
```
1. 開啟 Cursor
2. 點選右上角的登入按鈕
3. 使用 GitHub、Google 或 Email 註冊
4. 完成驗證流程
```

#### 2. AI 模型設定
```
1. 開啟設定 (Cmd/Ctrl + ,)
2. 搜尋 "AI Model"
3. 選擇偏好的 AI 模型：
   - GPT-4 (最強但較慢)
   - GPT-3.5 (平衡選擇)
   - Claude (替代選項)
```

#### 3. 匯入 VS Code 設定
```bash
# Cursor 會自動偵測並詢問是否匯入 VS Code 設定
# 包含：
# - 擴充套件
# - 快捷鍵設定
# - 主題和外觀
# - 工作區設定
```

## 核心功能

### 1. 智能程式碼編輯

#### 自動補全
```javascript
// 輸入函數名稱，Cursor 會自動建議完整實作
function calculateTax(income, rate) {
  // Cursor 會建議：
  return income * (rate / 100);
}
```

#### 程式碼生成
```python
# 輸入註解，按 Tab 生成程式碼
# TODO: 建立一個計算費波納契數列的函數
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### 2. 檔案管理

#### 專案瀏覽器
- 樹狀檔案結構
- 快速搜尋檔案 (Cmd/Ctrl + P)
- 檔案預覽
- 拖放操作

#### 多檔案編輯
```
- 分割視窗編輯
- 標籤頁管理
- 檔案比較 (Diff)
- 同步捲動
```

### 3. 版本控制整合

#### Git 功能
```bash
# 內建 Git 支援
- 視覺化 Git 狀態
- 分支管理
- 提交歷史
- 合併衝突解決
- Pull Request 整合
```

## AI 輔助功能

### 1. Cursor Tab (智能補全)

#### 啟用方式
```
按 Tab 鍵啟動智能補全
Cursor 會根據上下文提供建議
```

#### 使用範例
```javascript
// 輸入：
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];

// 按 Tab，Cursor 建議：
const adults = users.filter(user => user.age >= 18);
```

### 2. Cursor Chat (AI 對話)

#### 開啟方式
```
快捷鍵：Cmd/Ctrl + L
或點選側邊欄的聊天圖示
```

#### 常用指令
```
# 程式碼解釋
"解釋這段程式碼的功能"

# 程式碼優化
"優化這個函數的效能"

# 錯誤修復
"修復這個 bug"

# 程式碼重構
"將這個函數重構為更簡潔的版本"

# 測試生成
"為這個函數生成單元測試"
```

### 3. Cursor Composer (程式碼生成)

#### 啟用方式
```
快捷鍵：Cmd/Ctrl + I
選取程式碼後按快捷鍵
```

#### 功能特色
```
- 多檔案編輯
- 上下文感知
- 即時預覽
- 批次修改
```

### 4. 自然語言程式設計

#### 註解轉程式碼
```python
# 建立一個 REST API 端點來取得用戶資料
@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    })
```

#### 需求轉實作
```
輸入：「建立一個購物車類別，包含新增、移除、計算總價功能」

Cursor 生成：
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item, quantity=1):
        self.items.append({'item': item, 'quantity': quantity})
    
    def remove_item(self, item_name):
        self.items = [item for item in self.items if item['item'].name != item_name]
    
    def calculate_total(self):
        return sum(item['item'].price * item['quantity'] for item in self.items)
```

## 快捷鍵與操作

### 基本操作
```
檔案操作：
Cmd/Ctrl + N          新建檔案
Cmd/Ctrl + O          開啟檔案
Cmd/Ctrl + S          儲存檔案
Cmd/Ctrl + Shift + S  另存新檔

編輯操作：
Cmd/Ctrl + Z          復原
Cmd/Ctrl + Y          重做
Cmd/Ctrl + X          剪下
Cmd/Ctrl + C          複製
Cmd/Ctrl + V          貼上
```

### AI 功能快捷鍵
```
Cmd/Ctrl + L          開啟 AI 聊天
Cmd/Ctrl + I          啟動 Composer
Tab                   智能補全
Cmd/Ctrl + Shift + L  選取相似文字
Cmd/Ctrl + D          選取下一個相同項目
```

### 導航快捷鍵
```
Cmd/Ctrl + P          快速開啟檔案
Cmd/Ctrl + Shift + P  命令面板
Cmd/Ctrl + G          跳到指定行
Cmd/Ctrl + F          搜尋
Cmd/Ctrl + H          取代
```

### 視窗管理
```
Cmd/Ctrl + \          分割編輯器
Cmd/Ctrl + 1/2/3      切換編輯器群組
Cmd/Ctrl + W          關閉標籤頁
Cmd/Ctrl + Shift + T  重新開啟關閉的標籤頁
```

## 進階功能

### 1. 自訂 AI 提示

#### 建立提示範本
```json
// .cursor/prompts.json
{
  "react-component": {
    "description": "建立 React 元件",
    "prompt": "建立一個 React 函數元件，包含 TypeScript 類型定義、Props 介面、預設值和基本樣式"
  },
  "api-endpoint": {
    "description": "建立 API 端點",
    "prompt": "建立一個 Express.js API 端點，包含參數驗證、錯誤處理和適當的 HTTP 狀態碼"
  }
}
```

### 2. 工作區設定

#### 專案特定設定
```json
// .vscode/settings.json
{
  "cursor.ai.model": "gpt-4",
  "cursor.ai.temperature": 0.3,
  "cursor.ai.maxTokens": 2048,
  "cursor.ai.contextLength": 8192,
  "cursor.ai.enableTabCompletion": true,
  "cursor.ai.enableChat": true
}
```

### 3. 程式碼片段管理

#### 建立自訂片段
```json
// .vscode/snippets/javascript.json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ $3 }) => {",
      "  return (",
      "    <div>",
      "      $4",
      "    </div>",
      "  );",
      "};",
      "",
      "export default ${1:ComponentName};"
    ],
    "description": "建立 React 函數元件"
  }
}
```

### 4. 除錯功能

#### 設定除錯環境
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Node.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/index.js",
      "console": "integratedTerminal"
    }
  ]
}
```

#### AI 輔助除錯
```
1. 設定中斷點
2. 啟動除錯模式
3. 使用 AI 聊天分析變數值
4. 請求除錯建議
```

## 擴充套件

### 推薦擴充套件

#### 程式語言支援
```
- Python Extension Pack
- JavaScript (ES6) code snippets
- TypeScript Hero
- Go Extension Pack
- Rust Analyzer
```

#### 開發工具
```
- GitLens
- Docker
- REST Client
- Thunder Client
- Database Client JDBC
```

#### 程式碼品質
```
- ESLint
- Prettier
- SonarLint
- Code Spell Checker
- Better Comments
```

#### 主題與外觀
```
- One Dark Pro
- Material Theme
- Dracula Official
- Night Owl
- Palenight Theme
```

### 擴充套件管理
```
安裝：Cmd/Ctrl + Shift + X 開啟擴充套件面板
搜尋：輸入擴充套件名稱
安裝：點選 Install 按鈕
管理：在已安裝清單中啟用/停用
```

## 最佳實踐

### 1. AI 使用技巧

#### 有效的提示撰寫
```
❌ 不好的提示：
"寫一個函數"

✅ 好的提示：
"建立一個 JavaScript 函數，接收用戶陣列，根據年齡篩選成年人，返回包含姓名和年齡的新陣列"
```

#### 上下文提供
```
- 選取相關程式碼
- 提供具體需求
- 說明預期行為
- 包含錯誤訊息（如果有）
```

### 2. 工作流程優化

#### 專案結構
```
project/
├── .cursor/           # Cursor 設定
├── .vscode/          # VS Code 設定
├── src/              # 原始碼
├── tests/            # 測試檔案
├── docs/             # 文檔
└── README.md         # 專案說明
```

#### Git 整合最佳實踐
```bash
# 使用有意義的提交訊息
git commit -m "feat: 新增用戶認證功能"

# 定期推送變更
git push origin main

# 使用分支進行功能開發
git checkout -b feature/user-auth
```

### 3. 效能考量

#### 大型專案處理
```json
{
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

#### 記憶體優化
```
- 關閉不需要的標籤頁
- 定期重啟編輯器
- 限制同時開啟的檔案數量
- 使用工作區而非單一大型資料夾
```

## 常見問題

### Q: AI 功能無法使用怎麼辦？

**解決方案：**
```
1. 檢查網路連線
2. 確認已登入帳號
3. 檢查 AI 模型設定
4. 重新啟動 Cursor
5. 清除快取：Cmd/Ctrl + Shift + P → "Developer: Reload Window"
```

### Q: 程式碼補全太慢怎麼辦？

**解決方案：**
```json
{
  "cursor.ai.enableTabCompletion": true,
  "cursor.ai.tabCompletionDelay": 100,
  "cursor.ai.maxCompletionLength": 500
}
```

### Q: 如何匯入 VS Code 設定？

**步驟：**
```
1. 開啟 Cursor
2. Cmd/Ctrl + Shift + P
3. 輸入 "Import VS Code Settings"
4. 選擇要匯入的項目
5. 確認匯入
```

### Q: 如何備份設定？

**方法：**
```bash
# macOS
cp -r ~/Library/Application\ Support/Cursor ~/Desktop/cursor-backup

# Windows
xcopy "%APPDATA%\Cursor" "C:\cursor-backup" /E /I

# Linux
cp -r ~/.config/Cursor ~/cursor-backup
```

### Q: AI 建議不準確怎麼辦？

**改善方法：**
```
1. 提供更多上下文
2. 使用更具體的描述
3. 選取相關程式碼
4. 調整 AI 模型設定
5. 提供範例或參考
```

## 效能優化

### 1. 編輯器設定優化

```json
{
  "editor.fontSize": 14,
  "editor.lineHeight": 1.5,
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "boundary",
  "editor.smoothScrolling": true,
  "workbench.editor.enablePreview": false,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

### 2. AI 功能優化

```json
{
  "cursor.ai.temperature": 0.3,
  "cursor.ai.maxTokens": 1024,
  "cursor.ai.contextLength": 4096,
  "cursor.ai.enableStreaming": true,
  "cursor.ai.cacheEnabled": true
}
```

### 3. 系統資源管理

#### 監控資源使用
```
1. 開啟工作管理員/活動監視器
2. 檢查 Cursor 的 CPU 和記憶體使用量
3. 必要時重啟編輯器
```

#### 優化建議
```
- 關閉不必要的擴充套件
- 限制同時開啟的檔案數量
- 定期清理暫存檔案
- 使用 SSD 儲存專案檔案
```

---

## 更新與維護

### 自動更新
```
Cursor 會自動檢查並提示更新
也可以手動檢查：Help → Check for Updates
```

### 手動更新
```bash
# macOS (Homebrew)
brew upgrade cursor

# Windows
# 下載最新版本安裝檔覆蓋安裝

# Linux
# 下載最新版本 DEB/AppImage
```

### 版本回退
```
如果新版本有問題：
1. 下載舊版本安裝檔
2. 解除安裝目前版本
3. 安裝舊版本
4. 暫時停用自動更新
```

---

## 相關資源

- **官方網站**: [cursor.sh](https://cursor.sh)
- **文檔**: [docs.cursor.sh](https://docs.cursor.sh)
- **社群論壇**: [community.cursor.sh](https://community.cursor.sh)
- **GitHub**: [github.com/getcursor](https://github.com/getcursor)
- **Discord**: [discord.gg/cursor](https://discord.gg/cursor)
- **YouTube 教學**: [Cursor 官方頻道](https://youtube.com/@cursor)

## 授權與隱私

Cursor 遵循嚴格的隱私政策，用戶程式碼僅在必要時傳送至 AI 服務，且不會被儲存或用於訓練模型。詳細資訊請參閱官方隱私政策。

---

*最後更新：2024年12月*
