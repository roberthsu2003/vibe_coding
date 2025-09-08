# Gemini Getting Started

## Gemini指令說明

```
gemini --help
```

## 常用的基本用法

**從目前目錄開始**

- 進入目錄
- 在該目錄執行命令`gemini`

```bash
gemini
```


**包含多個目錄**

- 工作區中要包含的其他目錄（以逗號分隔或多個 --include-directories）

```bash
gemini --include-directories ../lib,../docs
```

**使用特定模型**

- 指定使用模型

```bash
gemini -m gemini-2.5-flash
```

**非互動模式**

- 提示符。附加到標準輸入（如果有）

```bash
gemini -p "請用簡單說明,這個專案的用途"
```

## 快速範例

**開始一個新專案**

[請參考專案範例6](../vibe_coding範例樣版)


```
cd new-project/
gemini
> 請幫我建立一個web頁面,功能是貪食蛇遊戲,要可以`計分`,`開始`按鈕,遊戲結束要有`還要繼續嗎`的提示
```

**分析現有程式碼**

```
git clone https://github.com/google-gemini/gemini-cli
cd gemini-cli
gemini
> 請給我一份昨天發生的所有變化的摘要
```


