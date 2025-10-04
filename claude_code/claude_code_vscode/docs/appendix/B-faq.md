# B. 常見問題 FAQ

## Q1: Claude Pro 訂閱用完了怎麼辦？

**A:** Claude Pro 有使用量限制，當額度用完時：
- 等待額度重置（通常是每月重置）
- 升級到 Claude Team 或 Enterprise（更高額度）
- 查看你的使用狀況：登入 claude.ai → Settings → Usage
- 優化使用方式：減少不必要的對話，重複使用對話記錄

## Q2: 可以離線使用嗎？

**A:** 不行，Claude Code 需要網路連線，因為：
- AI 模型運行在 Anthropic 的伺服器上
- 需要即時與 API 通訊
- 所有運算都在雲端進行

### 離線替代方案：
- 使用本地 AI 模型（如 Ollama + Continue 擴充套件）
- 下載離線的程式碼片段庫
- 使用傳統的 IDE 智能提示功能

## Q3: 我的程式碼會被存到哪裡？會外洩嗎？

**A:** 關於資料安全：
- 你的程式碼會傳送到 Anthropic 伺服器進行處理
- Anthropic 有嚴格的隱私政策保護
- 不會用你的程式碼來訓練 AI 模型（根據官方政策）
- 對話記錄儲存在你的帳號中

### 建議：
- 不要分享敏感資訊（密碼、API Key）
- 公司專案請確認是否符合內部資安政策
- 可以使用 Claude Team/Enterprise（有額外的安全保障）

## Q4: Claude Code 和 GitHub Copilot 有什麼不同？

**A:** 主要差異：

| 特性 | Claude Code | GitHub Copilot |
|------|-------------|----------------|
| 互動方式 | 對話式 | 自動建議 |
| 使用情境 | 問答、解釋、重構 | 即時程式碼補全 |
| 上下文理解 | 整個專案 | 當前檔案 |
| 學習曲線 | 低（聊天） | 中（需適應建議） |
| 最佳用途 | 學習、理解、規劃 | 快速編碼 |

結論：兩者可以互補使用！

## Q5: 可以用中文問問題嗎？

**A:** 可以！Claude 支援繁體中文。但建議：
- 技術術語用英文（如 function、array）會更精確
- 中英混用也沒問題
- 要求生成的程式碼註解可以用中文

## Q6: VSCode 版本太舊，無法安裝怎麼辦？

**A:** Claude Code 需要 VSCode 1.98.0 或更新版本：
- 更新 VSCode：Help → Check for Updates
- 或下載最新版：https://code.visualstudio.com/
- 如果無法更新，可以使用 CLI 版本

## Q7: 為什麼 Claude 的回應很慢？

**A:** 可能的原因和解決方法：
- 網路速度慢：檢查網路連線
- Anthropic 伺服器負載高：稍後再試
- 問題太複雜：將大問題拆成小問題
- 檔案太大：只引用必要的部分

## Q8: 可以在公司專案中使用嗎？

**A:** 使用前請確認：
- 公司的資安政策是否允許
- 是否有 NDA（保密協議）限制
- 敏感資料不要分享給 Claude
- 考慮使用 Claude for Enterprise（有額外保障）

建議：先詢問主管或資安部門

## Q9: 生成的程式碼有版權問題嗎？

**A:** 根據 Anthropic 的使用條款：
- 你擁有生成的程式碼
- 可以用於商業用途
- 但要確認程式碼不侵犯他人版權
- 重要專案建議進行程式碼審查

## Q10: 遇到技術問題找誰求助？

**A:** 求助管道：
- 官方文檔：https://docs.claude.com/
- GitHub Issues：https://github.com/anthropics/claude-code/issues
- Anthropic 支援：https://support.anthropic.com/
- 社群論壇：Reddit、Discord

---

## 導航

- **上一節**: [A. 快速參考卡](./A-quick-reference.md)
- **下一節**: [C. 延伸學習資源](./C-resources.md)
- **返回**: [附錄目錄](./README.md)
