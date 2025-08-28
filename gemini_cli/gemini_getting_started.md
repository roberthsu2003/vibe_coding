# Gemini Getting Started

## 基本用法

**從目前目錄開始**

```bash
gemini
```

**包含多個目錄**

```bash
gemini --include-directories ../lib,../docs
```

**使用特定模型**

```bash
gemini -m gemini-2.5-flash
```

**非互動模式**

```bash
gemini -p "說明這程式架構"
```

## 快速範例

**開始一個新專案**

```
cd new-project/
gemini
> 為我編寫一個 Discord 機器人，使用我將提供的 FAQ.md 檔案來回答問題
```

**分析現有程式碼**

```
git clone https://github.com/google-gemini/gemini-cli
cd gemini-cli
gemini
> 請給我一份昨天發生的所有變化的摘要
```


