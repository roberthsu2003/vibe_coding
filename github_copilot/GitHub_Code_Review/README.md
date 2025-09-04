# Code_Review & Code_Refactoring

了解如何使用 GitHub Copilot 來幫助審查和完善你的程式碼

## [使用演示範例3](../../vibe_coding範例樣版)

## 如何實際操作Code review

1. 在程式碼內,按右鍵,選取copilot內的`檢閱並認可`(就是code review),這是針對整個檔案

2. 在chat view內,附加該檔案,並詢問

```prompt
code review
```

## 如何實際操作Code refactoring

1. 在chat view內,附加該檔案,並詢問

```prompt
code refactoring
```


## Code Review(程式碼審查)

- 就像是請另一個人幫你檢查程式碼
- 可用來抓錯誤
- 提升品質
- 維持一致性


## Refactoring(重構)

- 不改變功能的前提下,重新整理現有程式碼
- 使程式碼清楚，容易維護

### AI如何協助Code Review

- 協助簡化函式邏輯
- 改善變數命名
- 提升程式結構品質
	- 自動化建議(Automated suggestions)
	- 程式風格一致性檢查(Consistency checks)
	- 重構支援(Refactoring assistance)
	- 錯誤與低效程式碼偵測(Error detection)
	- 自動產生註解(Comment support)
	
	> [!WARNING]
	> 注意:仍需人工確認建議是否符合專案需求
	
### AI如何協助Code Review

**提示詞範例**

- 請協助說明程式碼(黃色小鴨說明法)
- 這段程式碼可以怎麼改進
- 這個檔案中有沒有重複的程碼
- 這段程式碼是否有安全問題

**實際範例展示AI如何協助Code Review和Refactoring**
[範例專案資料夾](./src)

> [!IMPORTANT]
> 展示實際案例很重要

---

**不知道怎麼提供提示詞(以github copilot為例)**

- Visual Studio Code內直接使用Review and Comment
- Ctrl + Shift + P 輸入GitHub Copilot:Review and Comment

---

**Pull Request**

- 選擇Copilot當Reviewer(建立分支,合併分支時,可以請Copilot當作Reviewer)


