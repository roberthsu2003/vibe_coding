# GitHub Copilot 的 system prompt

[官方說明書](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions?utm_source=chatgpt.com)

#### user 等級(vscode內建的設定)-非官方說明


**檔案位址**

~/Library/Application Support/Code/User/settings.json


```
1. 使用vscode的命令列工具(cmd + shift + p)
2. > Preferences:Open User Setting(json)
3. settings.json檔案內加入:
	 "github.copilot.chat.preprompt":"所有的回答都必须用繁體中文"
```

#### user 等級(啟用.github/copilot-instructions.md)-

```
1. 使用vscode的命令列工具(cmd + shift + p)
2. > Preferences:Open User Setting(json)
3. settings.json檔案內加入:
	  "github.copilot.chat.codeGeneration.useInstructionFiles": true
```



#### 專案等級 - 官方說明版

[官方說明書](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

**檔案位置**

- 手動建立

```
.github/copilot-instructions.md檔案
```

- 自動產生

```
在copilot chat的設定內⚙->`產生指令`
```

**copilot-instructions.md**內容

```copilot-instructions.md
# GitHub Copilot 指令說明

## 回覆說明
- 使用繁體中文回覆

## 專案概述
這是一個 **職能發展學院 Python 機器學習課程** 的儲存庫，用於以繁體中文教授 Python 基礎和機器學習概念。

### 課程組織模式
- 每堂課都遵循結構化格式：`lessonN/` 目錄包含：

- **中文文件**：所有課程資料都使用繁體中文
## 開發環境
### 虛擬環境
- 使用 `.venv/` 目錄（已在終端機中配置）
- 使用 `source .venv/bin/activate` 啟動（macOS/Linux）


## 編碼規範
### Python 風格
- **Snake_case** 用於函數和變數：
```


#### 資料夾等級

如何在你專案中為 lesson1 資料夾設定專屬的 system prompt（或 custom instructions）的步驟與範例，以及可能碰到的限制。

---

**📚 支援機制概覽（依據官方文件）**

在 VS Code 的 Copilot 擴充中，有支援 **custom instructions / instructions file** 的機制。這機制允許你建立多個 .instructions.md 檔案，並用 applyTo 前言（frontmatter）指定對哪些檔案／資料夾生效。


**資料夾設置專屬 prompt 的步驟**

以下是你可以嘗試、比較穩妥的方法：

**方法 A：用 path-specific**

`*.instructions.md`放在`.github/instructions`資料夾內

**這是官方文件建議的方式，也是目前比較可靠可行的做法。**

假設專案結構如下：

```other
project/
├── .github/
│   ├── copilot-instructions.md         ← 全域指令（可選）
│   └── instructions/
│       └── lesson1.instructions.md    ← 專屬於 lesson1 的指令檔案
├── lesson1/
│   └── ... 檔案 ...
├── lesson2/
│   └── ... 檔案 ...
└── 其他資料夾／檔案
```


**手動方式加入**

lesson1.instructions.md的範例內容：

```other
---
applyTo: "lesson1/**/*"
---
你是這個 `lesson1` 資料夾的教學助理。當處理或回應此資料夾下的檔案時：

- 使用繁體中文回答  
- 加上程式碼註解與教學說明  
- 儘量詳盡、步驟清楚
```

**自動產生加入**
```
在copilot chat的設定內⚙->`指令`
```



這樣，當你在 lesson1/ 裡對某個檔案發起 Copilot Chat，VS Code 應該會自動把這個指令檔加入 prompt（前提是你已經啟用 instruction files 機制）

步驟總結：

1. 在 workspace 根目錄建立（或確認有） .github/instructions 資料夾
2. 在該資料夾內新增 lesson1.instructions.md
3. 在該檔案最上方用 YAML frontmatter 寫 applyTo 指令
4. 在 VS Code 設定中確保有啟用 instruction files（例如 "github.copilot.chat.codeGeneration.useInstructionFiles": true）
5. 在 lesson1 資料夾內啟動 Copilot Chat，應該就會自動套用這些指令