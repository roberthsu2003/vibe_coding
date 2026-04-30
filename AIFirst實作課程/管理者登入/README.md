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

