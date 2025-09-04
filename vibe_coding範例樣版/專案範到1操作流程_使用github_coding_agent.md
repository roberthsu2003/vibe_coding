# 專案範例1操作流程_使用github_coding_agent

## 直接使用GitHub的網站

### 先前步驟

1. 將`專案範例1`copy至`演示目錄`內
2. `commit`後,push至`github上`


### ❗️使用github的issue(針對的是整個網站):

目的:issue可以指派給copilot

**步驟**

1. 進入vibe_coding的repo
2. 建立一個issue

	```
	介紹這一個repo
	
	請建立markdown格式說明檔案
	```
	
3. 指派給copilot
4. 會自動建立一個PR和一個分支
5. 在PR內可以點選[view session]->了解copilot做了那些事情
6. 在pull request內,merge後,刪除分支
7. 刪除分支,close pr,close issue回覆原狀

### 使用github網站的agents模式:
1. 進入至Agents的網頁頁面
2. 選擇vibe_coding的repo
3. 詢問:
	
	```
	可以幫我審視一下這個repo的簡介,是否完整,有什麼可以加強的嗎?
	```

 4. 會自動建立一個名為`copilot/fix-xxxx`的分支,此分支會建立一個PR
 5. 進入vibe_coding的repo
 6. 檢查pull request,merge後刪除分支
 7. 刪除分支,回覆原狀

### 使用github網站的chat模式(chat模式可以指定工作目錄):

- GitHub的chat內指定vibe_coding的repo
- **並且指定工作目錄**
- 工作目錄內可以增加AGENTS.md
- 依專案範例1內容詢問
- 刪除分支,回覆原狀

### 不要pull下來,直接在vscode terminal下指令,刪除所有剛才的更改

`git push --force`

