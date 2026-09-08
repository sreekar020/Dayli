# 🔥 Dayli — Real-Time Habit Tracker

**Dayli** is a modern, cross-platform mobile application built with **React Native (Expo SDK 57)** and **TypeScript**, powered by **Appwrite BaaS**. It features real-time WebSocket database synchronization, intuitive swipe gestures for habit management, optimistic UI updates for 0ms interaction latency, custom authentication route guards, and habit streak analytics.

---

## ✨ Features

- 🔐 **Secure Authentication**: Email & password signup/login powered by Appwrite Account API with custom validation.
- ⚡ **Real-Time Data Sync**: Uses Appwrite WebSockets (`client.subscribe`) to reflect habit creations, completions, updates, and deletions instantly across all logged-in client devices.
- 👆 **Swipe Gestures**: Built with `react-native-gesture-handler`:
  - **Swipe Right**: Mark a habit as completed for today and increment your streak count.
  - **Swipe Left**: Delete a habit with immediate optimistic UI feedback.
- 🚀 **Optimistic UI Updates**: Instant client-side state mutations for habit deletions and completions with automatic rollback on network failures.
- 🔥 **Streak & Frequency Tracking**: Visual indicators displaying current consecutive streaks and customizable target frequencies (*Daily*, *Weekly*, *Monthly*).
- 🏆 **Streaks Leaderboard & Analytics**: Dedicated Streaks tab featuring a Top 3 habits leaderboard, current vs. best streak counters, and total completion stats.
- 🛡️ **Protected Navigation Guards**: Tab and stack navigation guarded by React Context API (`AuthContext`), automatically redirecting unauthenticated sessions to login.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [React Native 0.86](https://reactnative.dev/) with [Expo SDK 57](https://docs.expo.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Navigation** | [Expo Router v57](https://docs.expo.dev/router/introduction) (File-based Routing) |
| **Backend & Auth** | [Appwrite Cloud SDK](https://appwrite.io/) (`react-native-appwrite`) |
| **Real-Time Engine** | Appwrite Realtime WebSockets (`client.subscribe`) |
| **State Management** | React Context API (`AuthContext`) & Local State (`useState`) |
| **UI Components** | React Native Paper, React Native Vector Icons |
| **Gestures & Animations** | `react-native-gesture-handler`, `react-native-reanimated` |

---

## 📁 Project Structure

```text
Dayli/
├── assets/                  # App icons, splash screens, and images
├── database.type.ts         # TypeScript interfaces for Appwrite Document models
├── src/
│   ├── app/                 # Expo Router routes & pages
│   │   ├── (tabs)/          # Protected bottom tab navigation
│   │   │   ├── index.tsx    # Home screen (Habit list feed & swipe actions)
│   │   │   ├── add-habit.tsx# Create habit form (Title, description, frequency)
│   │   │   ├── streaks.tsx  # Streaks leaderboard & analytics screen
│   │   │   └── _layout.tsx  # Tab layout & RouteGuard protection
│   │   ├── authentication/  # Auth stack screens
│   │   │   ├── login.tsx    # Sign-in screen
│   │   │   └── auth.tsx     # Sign-up screen
│   │   └── _layout.tsx      # Root Stack Layout & AuthProvider
│   ├── components/          # Reusable UI components & styles
│   │   ├── habitsCard.tsx   # Habit item styling & swipe layouts
│   │   └── SplashScreen.tsx # Animated startup screen
│   ├── constants/           # Color palettes & theme constants
│   ├── context/             # Global application state providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Service clients & context providers
│   │   ├── appwrite.ts      # Appwrite Client, Account, & Database init
│   │   └── auth-context.tsx # Global Auth Context & session management
│   └── styles/              # Global app stylesheets
├── .env                     # Environment variables configuration
├── app.json                 # Expo configuration manifest
└── package.json             # Project dependencies & scripts
```

---

## 🗄️ Database Schema

### 1. `habits` Collection

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `$id` | `String` | Document unique ID |
| `userId` | `String` | ID of the habit owner |
| `title` | `String` | Title of the habit |
| `description` | `String` | Habit details or notes |
| `frequency` | `String` | Target frequency (`Daily`, `Weekly`, `Monthly`) |
| `streak_count` | `Integer` | Consecutive days/periods completed |
| `last_completed`| `ISO Date` | Last completion timestamp |

### 2. `habits_completion` Collection

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `$id` | `String` | Document unique ID |
| `user_id` | `String` | ID of the habit owner |
| `habits_id` | `String` | ID of the related habit document |
| `$createdAt` | `ISO Date` | Auto-generated completion timestamp |

---

## 🚀 Quick Start Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- Expo Go App on iOS/Android device OR an Android Emulator / iOS Simulator

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Dayli.git
   cd Dayli
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory with your Appwrite project and database IDs:
   ```env
   EXPO_PUBLIC_APPWRITE_PROJECT_ID="your_appwrite_project_id"
   EXPO_PUBLIC_APPWRITE_PROJECT_NAME="your_app_name"
   EXPO_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"

   EXPO_PUBLIC_DB_ID="your_database_id"
   EXPO_PUBLIC_HABIT_DB_ID="habits"
   EXPO_PUBLIC_HABIT_COMPLETION="habits_completion"
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Run on Target Device**:
   - Scan the QR code using the **Expo Go** app (Android) or Camera app (iOS).
   - Press `a` for Android Emulator.
   - Press `i` for iOS Simulator.
   - Press `w` to launch in web browser.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
