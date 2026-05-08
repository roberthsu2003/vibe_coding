# 加入圖片和音樂

[圖片和音樂的連結](./source/)

---

## 檔案放置建議：靜態檔 vs 資源檔

在 React (特別是使用 Vite) 的專案中，放置圖片和音樂等檔案主要有兩個地方，根據你的需求選擇合適的位置：

### 1. `public/` 目錄 (靜態檔案 Static Assets)
**放在這裡的檔案不會被編譯工具 (如 Vite) 處理，會直接原封不動地複製到打包後的根目錄。**

- **建議放置：**
  - 大型音樂檔案 (避免打包過慢)。
  - `favicon.ico`、`robots.txt` 等。
  - 不需要被 React 動態處理的固定資源。
- **如何使用：**
  - 在代碼中直接使用絕對路徑即可：
    ```jsx
    <img src="/logo.png" alt="Logo" />
    <audio src="/bgm.mp3" controls />
    ```

### 2. `src/assets/` 目錄 (資源檔案 Source Assets)
**放在這裡的檔案會被編譯工具處理，可以進行優化（如壓縮、加入雜湊值以利快取）。**

- **建議放置：**
  - 組件專用的圖標 (Icons)、小型圖片。
  - 需要被版本控制並隨代碼變動的資源。
- **如何使用：**
  - 必須透過 `import` 引入：
    ```jsx
    import myImage from './assets/image.png';

    function MyComponent() {
      return <img src={myImage} alt="Description" />;
    }
    ```

---

## 動態資料與檔案 (Dynamic Files)

如果你提到的「動態檔」是指會根據程式邏輯改變的內容：

1. **本地 JSON 資料**：
   - 建議放在 `src/data/` 或 `src/constants/` 下，透過 `import` 引入。
2. **遠端取得的檔案**：
   - 透過 API 取得的圖片網址或音樂連結，通常直接將 URL 放入 `src` 屬性即可。
3. **使用者上傳的檔案**：
   - 在開發環境通常存在組件的 `state` 中，生產環境則需上傳至雲端儲存（如 Supabase Storage, AWS S3）。

## 總結建議
- 如果是**課程練習用的素材**，建議先放在 `public/` 資料夾下，這樣引用路徑最簡單直覺。
- 如果是**專案正式開發**，小型圖示放 `src/assets/`，大型媒體檔案放 `public/` 或外部 CDN。