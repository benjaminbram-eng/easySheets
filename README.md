# Google Sheets Viewer with OAuth

A React application that lets users sign in with Google and view their Google Sheets in an embedded iframe.

## Features

- 🔐 Google OAuth authentication
- 📊 Automatically fetches user's Google Sheets
- 📱 Clean, responsive UI
- ⚡ Built with React, TypeScript, and Vite

## Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google Sheets API
   - Google Drive API
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
7. Copy your **Client ID**

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

### 3. Install and Run

```bash
npm install
npm run dev
```

Open your browser to `http://localhost:5173`

## How It Works

1. User clicks "Sign in with Google"
2. Google OAuth flow authenticates the user
3. App requests access to Google Sheets and Drive (read-only)
4. Fetches user's spreadsheets from Google Drive
5. Displays them in a sidebar
6. Selected sheet is shown in an embedded iframe

## Tech Stack

- React 18
- TypeScript
- Vite
- Google Identity Services
- Google Sheets API
- Google Drive API

## Security

- Uses OAuth 2.0 for secure authentication
- Only requests read-only access to sheets
- No server-side storage of credentials
- Access tokens managed in browser session
