<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your BFF app

This project uses a BFF (Backend for Frontend) + API Proxy architecture.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local`
3. Run the app (Express + Vite middleware):
   `npm run dev`

## Production

1. Build frontend assets:
   `npm run build`
2. Start server:
   `npm run start`
