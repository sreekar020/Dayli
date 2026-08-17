# 🔥 Gojo — Real-Time Habit Tracker

**Gojo** is a modern, cross-platform mobile application built with **React Native (Expo SDK 57)** and **TypeScript**, powered by **Appwrite BaaS**. It features real-time WebSocket database synchronization, intuitive swipe gestures for habit management, optimistic UI updates for 0ms interaction latency, and custom authentication route guards.

---

## ✨ Features

- 🔐 **Secure Authentication**: Email & password signup/login powered by Appwrite Account API with custom regex validation (email format & password strength criteria).
- ⚡ **Real-Time Data Sync**: Uses Appwrite WebSockets (`client.subscribe`) to reflect habit creations, updates, and deletions instantly across all logged-in client devices.
- 👆 **Swipe Gestures**: Built with `react-native-gesture-handler`:
  - **Swipe Right**: Mark a habit as completed and increment your streak count.
  - **Swipe Left**: Delete a habit with immediate optimistic feedback.
- 🚀 **Optimistic UI Updates**: Instant client-side state mutations for habit deletions with automatic fallback rollback on network failures.
- 🔥 **Streak & Frequency Tracking**: Visual indicators displaying current consecutive day streaks and customizable target frequencies (*Daily*, *Weekly*, *Monthly*).
- 🛡️ **Protected Navigation Guards**: Tab and stack navigation guarded by React Context API (`AuthContext`), automatically redirecting unauthenticated sessions.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [React Native 0.86](https://reactnative.dev/) with [Expo SDK 57](https://docs.expo.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Navigation** | [Expo Router v57](https://docs.expo.dev/router/introduction) (File-based Routing) |
| **Backend & Auth** | [Appwrite Cloud SDK](https://appwrite.io/) (`react-native-appwrite`) |
| **Real-Time Engine** | Appwrite Realtime WebSockets |
| **State Management** | React Context API (`AuthContext`) & Local State (`useState`) |
| **UI Components** | React Native Paper, React Native Vector Icons |
| **Gestures & Animations** | `react-native-gesture-handler`, `react-native-reanimated` |

---

## 📁 Project Structure

```text
gojo/
├── assets/                  # App icons, splash screens, and images
├── database.type.ts         # TypeScript interfaces for Appwrite Document models
├── src/
│   ├── app/                 # Expo Router routes & pages
│   │   ├── (tabs)/          # Protected bottom tab navigation
│   │   │   ├── index.tsx    # Home screen (Habit list feed & swipe actions)
│   │   │   ├── add-habit.tsx# Create habit form
│   │   │   ├── streaks.tsx  # Streak tracking screen
│   │   │   └── _layout.tsx  # Tab layout & RouteGuard protection
│   │   ├── authentication/  # Auth stack screens
│   │   │   ├── login.tsx    # Login screen
│   │   │   └── auth.tsx     # Account registration screen
│   │   └── _layout.tsx      # Root Stack Layout & AuthProvider
│   ├── components/          # Reusable UI components & styles
│   ├── hooks/               # Custom React hooks (theming, scheme)
│   └── lib/                 # Service clients & context providers
│       ├── appwrite.ts      # Appwrite Client, Account, and Database initialization
│       └── auth-context.tsx # Global Auth Context & session management
├── .env                     # Environment variables configuration
├── app.json                 # Expo configuration manifest
└── package.json             # Project dependencies & scripts
```

---

## 🗄️ Database Schema

### `habits` Collection

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `$id` | `String` | Document unique ID |
| `userId` | `String` | ID of the habit owner |
| `title` | `String` | Title of the habit |
| `description` | `String` | Habit details or notes |
| `frequency` | `String` | Frequency (`Daily`, `Weekly`, `Monthly`) |
| `streak_count` | `Integer` | Consecutive days completed |
| `last_completed`| `ISO Date` | Last completion timestamp |

---

## 🚀 Quick Start Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- Expo Go App on iOS/Android device OR an Android Emulator / iOS Simulator

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/gojo.git
   cd gojo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy or create the `.env` file with your Appwrite project & database keys as shown above.

4. **Start the development server**:
   ```bash
   npx expo start
   ```

5. **Run on Target Device**:
   - Scan the QR code using the **Expo Go** app (Android) or Camera app (iOS).
   - Press `a` for Android Emulator or `i` for iOS Simulator.
   - Press `w` to run in web browser.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
