# 一段提示詞讓Gemini CLI變成自動化Agent！ 
## 提示詞工程
> [參考出處影片(程序員老王)](https://youtu.be/YCswP_xmxu0?si=bk7H_s-ZmF_3rpAY)

## 目標:
- 了解一般提示詞(one shot)「無法讓AI了解全部的需求)」
- 將一般提示詞轉換為Product Requirement Document(PRD
- 將PRD轉換為TODOlist.md(few shot)
	- 闡明轉換過程中利用的Transformer技巧，以優化AI的表現。
## 任務:
- 使用Gemini CLI
- 下載指定網頁內容和圖片
- 將英文翻譯為繁體中文版的markdown格式
- 將英文翻譯為繁英版的markdown格式

## 工作目錄:
- 本repo的`演示目錄`,從0開始

## 測試1:從簡單提示詞開始及面臨的問題:

- 目的: 了解一般提示詞(one shot)「無法讓AI了解全部的需求)」

**Prompt:**

```
文章網址:https://cloud.google.com/blog/topics/developers-practitioners/gemini-cli-custom-slash-commands

把這篇文章翻譯成中文，並且保存markd格式，在下載裡面所有的圖片
```

## 測試2:像程式設計師一樣思考：分解任務（輸入、輸出、過程）

為了讓AI更好地服務，關鍵在於我們自己要把事情想清楚。這可以透過將一件事情分解為三個核心要素來實現：

- 輸入 (Input)：我們給予AI的資訊是什麼？
- 輸出 (Output)：我們期望AI產出的結果是什麼？
- 過程 (Process)：AI需要執行的具體步驟是什麼？

**Prompt第1版**

```
# 下載網頁內容和圖片

## 文章網址

https://cloud.google.com/blog/topics/developers-practitioners/gemini-cli-custom-slash-commands

### 步驟:

1. 訪問網站。
2. 下載圖片。
3. 改寫成Markdown格式。
4. 翻譯成中英文版本。
5. 生成中文版本。
```

為了消除不同AI Agent內建網頁瀏覽功能差異造成的不確定性（例如Gemini 可能只返回文本而遺漏圖片連結），最佳方法是指定一個統一可靠的訪問方式

**Prompt第2版**

```
# 下載網頁內容和圖片

## 文章網址

https://cloud.google.com/blog/topics/developers-practitioners/gemini-cli-custom-slash-commands

## 步驟:

### 1. 訪問網站:
	- 使用Links命令列瀏覽器
	- 將獲取到的原始內容保存到raw.txt文件中
	
### 2. 下載圖片:
	- 讓AI分析raw.txt文件，提取所有圖片連結，然後一張一張地下載到resources文件夾
	- 使用curl命令進行下載
	
### 3. 改寫成Markdown格式。
	- 將raw.txt轉換成為article.md
	- 在將內容改寫成Markdown格式時，需要確保**將article.md中的圖片連結指向resources文件夾**
	
### 4. 翻譯成中英文版本。
	- 將article.md轉換為article-en-zh-hant.md
	
### 5. 生成中文版本。
	- 提取article-en-zh-hant.md的中文,轉換為article-zh-hant.md

```




## 測試3:解決AI的「短期記憶」問題,導入「長期記憶」方式

## 結果:

```
輸入：
文章URL：https://cloud.google.com/blog/topics/developers-practitioners/gemini-cli-custom-slash-commands

輸出：
1. 格式化後的原文 article.md
2. 中英文雙語版 article-en-zh-hant.md
3. 中文版 article-zh-hant.md
4. 文章中所有的圖片資源

每完成一步，都必須更新 progress.md

步驟0: 生成筆記
- 仿照例子和當前任務生成筆記 progress.md

步驟1: 存取網站
- 存取上文輸入中的網址
- 必須使用 "lynx -dump -image_links URL" 指令存取網站
- 網站內容保存在 raw.txt 中

步驟2：下載圖片
- 從 raw.txt 中提取文章相關圖片連結
- 把圖片連結寫入 progress.md
- 逐一下載到 resources/ 資料夾
- 每下載完成一個圖片，必須更新圖片下載進度
- 你必須使用 curl 指令進行下載

步驟3：改寫成 markdown
- 把 raw.txt 改寫成 markdown 格式
- 保存在 article.md 中
- 將 article.md 中的圖片連結指向 resources/ 資料夾

步驟4：翻譯成中英文
- 把 article.md 翻譯成中英文對照
- 保存在 article-en-zh-hant.md 中

步驟5：翻譯成中文
- 提取 article-en-zh-hant.md 中的中文
- 保存在 article-zh-hant.md 中

----
progress.md 筆記格式

## 任務
[x] xxxxx
[ ] yyyyy
[ ] zzzzz
...

## 圖片下載進度
[x] https://xxxx/yyy.png
[ ] https://foo/bar.png
...

## 當前任務
正在下載 https://foo/bar.png
```


