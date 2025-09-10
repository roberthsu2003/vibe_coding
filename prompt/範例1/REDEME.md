# 一段提示詞讓Gemini CLI變成自動化Agent！ 
## 提示詞工程
> [參考出處影片(程序員老王)](https://youtu.be/YCswP_xmxu0?si=bk7H_s-ZmF_3rpAY)

## 目標:
- 了解一般提示詞(one shot)「無法讓AI了解全部的需求)」
- 將一般提示詞轉換為Product Requirement Document(PRD
- 將PRD轉換為TODOlist.md(few shot)
## 任務:
- 使用Gemini CLI
- 下載指定網頁內容和圖片
- 將英文翻譯為繁體中文版的markdown格式
- 將英文翻譯為繁英版的markdown格式

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


