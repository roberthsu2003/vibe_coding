# GitHub Copilot的ASK,EDIT,AGENT和自訂模式

> [!TIP]
> 提供一個專案資料夾,做實際操作

> [!IMPORTANT]
> [官方的tutorials-https://docs.github.com/en/copilot/tutorials](https://docs.github.com/en/copilot/tutorials)

## GitHub Copilot Chat
- **整合於開發環境中的AI助理**
	- VS Code
	- JetBrain IDEs
	- Github.com

- **主要特色**
	- 使用自然語言與AI對話來協助程式開發的工具
	- 即時的程式建議,除錯協助,知識查詢與自動化編輯

- **使用模式**
	- Ask
	- Edit
	- Agent

## 快速鍵

> [!TIP]
> 也可以直接點選上方的「copilot圖示」

- cmd + i :內嵌對話框
- cmd + shift + i :chat view
- cmd + option + shift + l: pop over 的 chat view


## GitHub Copilot Chat - Ask模式

- **用途**
	- 用於向AI助理提出自然語言的問題,獲得說明,程式碼建議,語法說明等。

- **特點**
	- 支援自然語言提問,不限於程式碼相關問題
		- 「什麼是Promise?」
		- 「這段程式碼有什麼問題?」
	- 回覆通常是文字解釋,程式碼片段，使用建議或學習資源鏈結。
	- 不會直接修改您的原始程式碼

- **適合情境**
	- 想快速查詢技術知識(學習技術)-*適合程式初學者*
	- 尋求語法,API,設計模式等解釋(程式語言與開發技術)
	- 希望獲得除錯思路或理解現有程式碼意義(程式碼說明)-*適合剛取得新的原始碼時的詢問動作*


## GitHub Copilot Chat - Edit模式

- **用途**
	- 讓AI根據你的指示直接編輯,優化或修正檔案中的程式碼

- **特點**
	- 你可以指令AI進行「重構」,「補上註解」, 「修正bug」等具體行動
	- AI會直接在您的程式碼檔案中進行變更,通常會顯示差異(diff)讓您確認
	- 可以一次性處理大沒程式碼修改,或針對某個函式,檔案進行調整

- **適合情境**
	- 希望自動優化/重構現有程式碼
	- 想快速修正程式碼錯誤
	- 需要批次加入註解,型別提示等

## GitHub Copilot Chat - Agent模式

**用途**
	- 讓Copilot擔任「代理人」

**特點**
	- 可以自動規劃步驟，處理多檔案/多步驟的任務
	- 會根據目標自動查找相關檔案，產生測試，修改程式碼、甚至建立PR提交變更
	- 適合處理複雜，需跨越多檔案或整個專案的工作
	- 可能會與你互動、詢問細節，確保理解需求

**適合情境**
	- 要在專案中加入新功能(自動產生REST API端點)
	- 跨檔案大規模重構(改變資料結構,遷移框架)
	- 自動化重複性開發作業

## GitHub Copilot Agent模式強大功能-工具多樣化

- **Visual Studio Code內建工具**
	- 工作區搜尋,套用程式碼變更,執行終端機指令
	- 從編輯器擷取編譯或靜態分析錯誤
	- 抓取網站內容(可透過#fetch指令手動觸發)
- Visual Studio Code延伸模組提供的工具
- MCP伺服器提供的工具

![](./images/diagram-mcp.png)

## GitHub Copilot Chat 三種模式比較表

| 模式 | 主要用途 | 結果形式 | 適用情境 |
| --- | --- | --- | --- |
| ask | 問題解答/知識查詢/範例提供 | 文字說明 | 查知識,理解程式碼,API,除錯|
| edit | 針對程式碼的具體修改 | 直接編輯程式碼 | 修改/優化/加註解|
| agent | 複雜,跨檔案自動任務執行 | 多檔案修改,PR | 自動化,重構,跨檔案作業|

## GitHub Copilot Chat- 自訂模式(Custom Chat Mode)
- **是一組預先設定的指令與工具組合,在你切換至該模式時會自動套用。**
	- 一個名為「Plan(規劃)」的聊天模式,可以包含用來產生實作計畫的指令，並只允許使用唯讀工具

- 使用方式

> [!TIP]
> 直接使用chat view上方的`工具`按鈕,並選擇`模式`

- .chatmode.md結尾的Markdown檔案來定義,可以儲存於
	- 工作區(專案區):使用範圍只有此專案
	- 使用者:方便誇不同專案重複使用

### 自訂聊天模式檔案結構

- #### Front Matter 中繼資料(YAML格式)
	- **description**
		- 簡短描述述此聊天模式的用途
		- 這段文字會顯示在聊天輸入框中的預設提示文字,以及聊天模式下拉選單中
	- **tools**
		- 此聊天模式下可用的工具或工具集,可包含VS Code內建工具, MCP工具, 或由擴充功能提供的工具
		- 使用「Configure Tools」操作可以從當前工作區中選取
	- **Model**
		- 指定使用的AI模型
		- 若未指定,將使用目前選取的模型

- #### 主體區塊:聊天模式指令內容(Body)
	- 這裏可撰寫具體的提示語,指導方針或其它希望AI在此模式中遵循的資訊
	- 你也可以使用Markdown語法連結外部的說明檔(instructions)
	- 這些指令會與你在對話中輸入的提示語結合,共同構成AI的回應依據

### 野獸模式
- **定義**
	- 用於VS Code Copilot Agent的自訂聊天模式
	- 強化其功能(例如任務規劃，待辦清單管理與網路資訊搜尋)
	- 這個模式專為大型語言模型(如GPT-4.1)設計，並採用一套有主見的工作流程

- **特色**
	- 強化規劃能力:可產出詳細的多步執行計畫，並以Markdown格式的todo清單展示
	- 待辦清單管理:Copilot Agent 會追蹤每個步驟的執行情況，自動更新與顯示目前進度
	- 網路研究功能:若代理具備存取網路的能力,能自動查詢外部資料補足資訊
	- 工具指引整合:根據任務需求, 引導使用相關開發工具(如API、生成功能模組等)

- **運作方式**
	- 規劃任務步驟:先列出具體且可驗證的執行流程
	- 建立Markdown todo清單:以條例方式記錄所有待辦事項
	- 自動更新清單:每完成一項任務就自動標記並顯示最新狀態
	- 無需人工確認:完成一項後會自動進行下一步，不需像某些模式必需手動點選繼續

### [官方提供範例樣本-https://github.com/github/awesome-copilot](https://github.com/github/awesome-copilot)

### 自訂範例 - postgres.chatmode.md(配合postgresSQL MCP)

```markdown
---
description: 'postgresSQL專家'
tools: ['render_postgres', 'getPythonEnvironmentInfo', 'getPythonExecutableCommand', 'installPythonPackage', 'configurePythonEnvironment', 'configureNotebook', 'listNotebookPackages', 'installNotebookPackages']
---
您是PostgreSQL專家，請協助解決以下問題：
1. 呼叫工具,滿足使用者的需求
2. 提供正確且完整的SQL語法
3. 解釋SQL語法的目的和功能
```