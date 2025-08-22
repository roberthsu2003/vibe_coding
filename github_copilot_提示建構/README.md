# GitHub_Copilot


## GitHub_Copilot_提示建構

- 斜線命令
- 聊天參與者
- 變數(context,mcp)

### Prompt Engineering
- Prompt Engineering(提示工程)
	- 設計與優化輸入給AI模型的文字提示
	- 獲得更準確,相關或可控的輸出結果的技術
	- 提升GitHub Copilot準確度的關鍵技巧之一是學會提示工程

### 提示關鍵字(提示建構)
- 幫助GitHub Copilot更好理解需求
- 避免口語表達習慣造成誤解(贅詞,禮貌用詞,斷句)
- 簡化並明確表達需求

---

## 提示建構

1. **`@`聊天參與者(Chat participants)**

- 不同領域的專家, 具備特定專長,可協助你完成任務
- Copilot Chat 能根據您的自然語言提示自動推斷出相關的聊天參與者,幫助你發現進階功能,而無需明確指定參與者
- 可以由擴充功能提供

2. **`/`斜線命令(Slash commands)**

- 精簡方式表達意圖
- 避免撰寫複雜提示快速完成常見操作

3. **`#`聊天變數(Chat variables)**

- 提示中加入特定的上下文資訊



您可以向 Copilot Chat 諮詢專案相關的特定問題或常規軟體問題。您也可以使用 Copilot Chat 編寫程式碼、修復錯誤、編寫測試和說明文件。

以下部分範例提示使用了`聊天參與者（以 @ 開頭）`、斜線命令（以 / 開頭）`或`聊天變數（以 # 開頭）`。有關提示中關鍵字的更多信息，

## 設定`工作區域`有2種方式
1. 預設都以vscode開啟的資料夾
2. 如果要指定以lesson17為工作區,可以建立.github/BASE.md,並輸入以下內容
	 ```
	 # 預設工作區說明

本資料夾（lesson17）已設為預設工作區。所有自動化、查詢、程式操作皆以此資料夾為主。
	 ```
	 > [!TIP]
	 > 必需把這檔案拉至chat view內成為附加檔案

## Generate Instructions
> 可以使用github copilot右上角的設定聊天中`產生指示`自動產生

- 情境 - 自訂指令(custom instructions)與提示檔案(prompt files)
	- 為了避免每次對話都重複輸入這些資訊,你可以將上下文內容儲存在檔案中,並在每次對話時自動加入
- .github/copilot-instructions.md
	- 使用Markdown格式撰寫程式碼產生的指令說明
	- 所有指令集中儲存在單一檔案中，並存放於工作區(workspace)內
	- 這些指令會自動包含在每一次的聊天請求中
	- 可用來定義整體的程式撰寫規範偏好的技術選型與通用的專案需求，這些會套用在所有程式碼產生的任務中

### 專案內自訂Copilot`專用的內建資料夾`
> 可以使用github copilot右上角的設定聊天中自動產生
> 提示檔案-> .github/prompts/xxxxx.md.prompt
> 指示-> .github/instructions/xx.instructions.md
> 工具集(tools)->建立在user內
> 模式->自訂模式(.github/chatmodes/xxx.chatmode.md)
> MCP->.vscode/mcp.json
> 產生指令


#### /new 可以建立一個新的專案

- `/new react app with typescript`
- `/new python django web application`
- `/new node.js express server`

## /clear 可以清除這個chat

## 詢問一般軟體問題

您可以向 Copilot Chat 軟體詢問一些常見的問題。例如：

- Node.js 常用的 Web Server Framework 有以下幾種
- 我如何建立 Express 應用程式
- @terminal 如何更新 npm 套件


- 
- 