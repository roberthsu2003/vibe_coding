# GitHub Copilot Coding Agent
**自動修Bug,寫測試,拉PR**

- [演示專案-使用專案範例1](../../vibe_coding範例樣版)


## 什麼是Coding Agent

- 讓GitHub Copilot在背景中獨立執行任務
	- 修復錯誤
	- 實作漸進式新功能
	- 提升測試覆蓋率
	- 更新文件處理


| 功能 | Copilot in the editor | Copilot coding agent |
|--- |--- |--- |
| 介面 | 開發工具(code editor)  | issues 與 Pull Requests |
| 工作範圍 | 本地檔案 | 儲存庫 |
| 使用方式 | inline code suggestions chat view | issue指派 |
| 客製化 | Custom instructions | Custom instructions |
| MCP Support | Yes | Yes |
| Vibe Coding | Yes | Yes |


## Coding Agent 優勢

**傳統方式(IDE AI 助手)**

- AI 助手在本地同步運行
- 屬於GitHub Copilot Edits功能
- 所有步驟(建立分支, 撰寫commit, 建立PR等)需手動完成
- 協作透明度低、開發記錄難以追蹤

**Coding Agent**

- 所有操作都透過GitHub網站進行(自動建立分支、提交、PR)
- 在GitHub Actions的沙箱環境中運作
- 開發歷程可追溯，紀錄完整
- 開發者僅需審查與指導Copilot,即可完成任務
- 團隊更容容參與協作

## Coding Agent如何將任務交給Copilot

- 網頁上指派Issue給Copilot(演示1)
- 要求Copilot建立Pull Request(PR)
	- 網頁上GitHub的Agents頁面-會對整個repo處理(演示2)
	- 網頁上GitHub的chat頁面-可指定repo內的特定資料夾處理
	- 支援GitHub MCP Server的IDE,

![](./images/pic1.png)

 

