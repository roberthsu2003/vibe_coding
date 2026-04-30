# 管理者登入-登出流程

## 建立一個簡單網站，使用 React + Vite + Supabase。

> 一般人可看首頁
> 右上角有「管理」按鈕
> 點管理才登入
> 登入後檢查是不是 admin
> 是 admin 才顯示「你是管理者」

Google AI Studio 的 Build mode 可用自然語言快速建立 App，也支援 npm 套件與安全祕密管理；Supabase Auth 則負責登入，RLS 負責授權控管。([Google AI for Developers][1])

👉 **[點此了解本專案詳細的技術架構與原理](./技術架構說明.md)**

## 第一步：Supabase 建一張 `profiles` 表

到 Supabase → SQL Editor 執行：

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text default 'user'
);

alter table public.profiles enable row level security;

create policy "anyone can read profiles"
on public.profiles
for select
using (true);
```

<details>
<summary>💡 點擊展開：這段 SQL 程式碼在做什麼？（初學者必看）</summary>

這段程式碼是用來告訴資料庫「我要建立一個儲存使用者資料的地方，並設定好安全規則」。詳細解釋如下：

1. **`create table public.profiles (...)`**：
   - 就像在 Excel 開一個新的工作表，命名為 `profiles`。
   - `id uuid primary key...`：這行確保這個表格裡面的 ID，會和 Supabase 註冊系統（`auth.users`）的 ID 連動。`on delete cascade` 表示如果使用者刪除帳號，這裡的資料也會自動同步刪除。
   - `email text`：建立一個欄位用來存 Email。
   - `role text default 'user'`：建立一個欄位記錄權限角色，預設身分是一般使用者（`'user'`）。

2. **`alter table public.profiles enable row level security;`**：
   - 這是一個非常重要的安全開關！開啟「資料列層級安全 (RLS)」。開啟後，預設情況下**沒有人**能讀取或修改這張表，把資料徹底鎖住。

3. **`create policy "anyone can read profiles" ...`**：
   - 因為我們剛剛把資料全鎖了，所以需要訂立規則：「允許任何人（`using (true)`）讀取（`select`）這張表」。這樣網頁前端在登入後，才能查詢到使用者的權限是不是管理者。

</details>

## 第二步：先建立管理者帳號

在 Supabase → Authentication → Users → Add user
建立你的管理者 email。

建立後複製該使用者的 UID，然後執行：

```sql
insert into public.profiles (id, email, role)
values ('貼上你的UID', '你的email', 'admin');
```

## 第三步：丟給 Google AI Studio 的 Prompt

你可以直接貼這段：

```text
請幫我建立一個簡單網站，使用 React + Vite + Supabase。

需求：
1. 首頁一般訪客都可以看到，不需要登入。
2. 右上角有一個「管理」按鈕。
3. 點「管理」後顯示登入表單。
4. 使用 Supabase Auth 的 email/password 登入。
5. 登入成功後，查詢 public.profiles 資料表。
6. 如果目前使用者的 role 是 admin，畫面顯示「你是管理者」。
7. 如果不是 admin，顯示「你不是管理者，無法進入後台」。
8. 右上角登入後改成「登出」按鈕。
9. 請使用 @supabase/supabase-js。
10. 請把 Supabase URL 和 anon key 放在環境變數：
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

請產生完整可執行的 React 專案程式碼，包含：
- package.json
- src/main.jsx
- src/App.jsx
- src/supabaseClient.js
- .env.example
```

## 第四步：前端環境變數

`.env` 放：

```env
VITE_SUPABASE_URL=你的Supabase網址
VITE_SUPABASE_ANON_KEY=你的anon key
```

重點是：**anon key 可以放前端，但 service role key 絕對不能放前端。**

這個範例很適合當第一堂實作：先讓學生看到「公開頁面 + 管理登入 + role 判斷」。下一步再加「管理者可以新增文章」。

[1]: https://ai.google.dev/gemini-api/docs/aistudio-build-mode?utm_source=chatgpt.com "Build apps in Google AI Studio | Gemini API"

