# Cursor 重要設定

- Cursor AI 自動化工作流程精通指南：[從自訂命令到高階規則](./自訂命令到高階規則)

## 查看目前的system prompt

**直接在chat view內問**

```
目前的system prompt是什麼
```

- system prompt

## 使用者階層的system-prompt

### 設定方法(應用程式內設定):

- `設定`->`Rules&Memories`->`User Rules`內設定

## 專案階層的system-prompt

### 設定方法:
- 根目錄新增`.cursorrules` -> 這是舊方式了
- 目錄新增AGENTS.md -> 新方法
  - 可以在每個目錄內設定

**範例**

```prompt
# LangChain 專案的 Cursor 規則

## 專案的開發環境
- 使用conda
- 專案使用的虛擬環境的名稱是`langchain`

## 終端機的執行
- 必需先進入至`langchain`的虛擬環境
- 務必先啟用 langchain 環境：conda activate langchain
- 使用該環境中的 Python 3.11.13 進行開發
```


## 專案階層的可選式prompt

### 使用時機:當在專案中時常`重覆使用的prompt`

> [!IMPORTANT]
> mdc檔內上方的YAML的alwaysApply:false-這樣就是optional
> alwaysApply可以使用編輯器上方內建的下拉式選項套件

### 設定方法(應用程式內設定):

- `設定`->`Rules&Memories`->`Project Rules`內設定

	1. 要設定rules的名稱(必需是英文名稱)
	2. 會產生`名稱.mdc`檔案

	```
	#格式如下:
	---
	description:這是個可選式
	globs: ./* ./path/folder ./path/files
	alwaysApply: false
	---
	# LangChain 專案的 Cursor 規則

	## 專案的開發環境
	- 使用conda
	- 專案使用的虛擬環境的名稱是`langchain`
	
	## 終端機的執行
	- 必需先進入至`langchain`的虛擬環境
	- 務必先啟用 langchain 環境：conda activate langchain
	- 使用該環境中的 Python 3.11.13 進行開發
	```
	
### 使用方法

- **在chat view內**
	- 使用@rules,加入至這次的chat view內。

## cursor資料夾階層的system prompt 

1. 在資料夾內建立`AGENTS.md` 

2. 建立`.cursor/rules`資料夾,建立`mdc`檔案


	```
	範例:假設作用至lesson1的資料夾
	建立1個`lesson1.mdc`檔
	```
	
	**格式如下:**
	
	```
	---
	description: "lesson1專用"
	globs: "lesson1/**"
	alwaysApply: true
	---
	這是一個lesson1資料夾專用的system prompt
	```
	
	

