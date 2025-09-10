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

把這篇文章翻譯成中文，並且保存markdown格式，在下載裡面所有的圖片
```

**測試1結果**



## 測試2:像程式設計師一樣思考：分解任務（輸入、輸出、過程）

為了讓AI更好地服務，關鍵在於我們自己要把事情想清楚。這可以透過將一件事情分解為三個核心要素來實現：

- 輸入 (Input)：我們給予AI的資訊是什麼？
- 輸出 (Output)：我們期望AI產出的結果是什麼？
- 過程 (Process)：AI需要執行的具體步驟是什麼？

**Prompt第1版**

- 建立`任務1.md`檔

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

- 建立`任務2.md`檔

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

> [!IMPORTANT]
> 由ai產生todolist.md

**prompt**

```
{這裏方上面的prompt內容}
可以將以上內容轉換為1個1個步驟執行的todolist.md,並且要求ai,每執行完一個任務,就必需更新todolist.md,而且要讓使用者知道目前的進度   
```

## ai產生的todolist.md:

```
- [ ] 訪問網站:
    - [ ] 使用~~Links~~ curl命令列瀏覽器
    - [ ] 將獲取到的原始內容保存到raw.txt文件中
- [ ] 下載圖片:
    - [ ] 讓AI分析raw.txt文件，提取所有圖片連結
    - [ ] 一張一張地下載到resources文件夾
- [ ] 改寫成Markdown格式:
    - [ ] 將raw.txt轉換成為article.md
    - [ ] 將article.md中的圖片連結指向resources文件夾
- [ ] 翻譯成中英文版本:
    - [ ] 將article.md轉換為article-en-zh-hant.md
- [ ] 生成中文版本:
    - [ ] 提取article-en-zh-hant.md的中文,轉換為article-zh-hant.md
```


