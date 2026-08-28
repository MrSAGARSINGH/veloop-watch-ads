# VELOOP Rewards — Watch Ads

A premium, responsive Watch Ads experience built for the VELOOP Rewards frontend internship task.

The page allows users to discover advertisements, watch them completely, earn VELOOP Earn Tokens (VEs), track their daily progress, and review their recent earning activity.

---

## ✨ Project Overview

VELOOP Rewards is a reward-focused platform where users can earn VEs by completing short advertisements.

For this task, the original Watch Ads experience was completely redesigned with a modern dark fintech-inspired interface focused on:

- Premium visual design
- Clear earning information
- Smooth interactions
- Responsive layouts
- Reward-focused UX
- Progress tracking
- Meaningful loading and completion states

The goal was to create an experience that feels trustworthy, rewarding, interactive, and easy to use.

---

## 🚀 Features

### 🎯 Premium Watch Ads Experience

- Modern dark-themed UI
- Premium gradient-based visual system
- Reward-focused interface
- Responsive layout across screen sizes
- Subtle hover and transition effects

### 💰 Earnings Dashboard

- Today's earnings
- Lifetime earnings
- Ads watched today
- Remaining advertisements
- Daily earning goal
- Dynamic earning progress

### ▶️ Watch Advertisements

- Multiple advertisement cards
- Advertisement category and brand
- Reward amount
- Advertisement duration
- Watch Advertisement CTA
- Watching state
- Countdown timer
- Progress indicator
- Completed state
- Reward success feedback

### 📊 Progress Tracking

- Daily earning goal
- Dynamic percentage calculation
- Remaining VEs
- Goal completion state
- Daily bonus section

### 🏆 Daily Bonus

- Interactive bonus banner
- Goal-based reward messaging
- Navigation to `/watchAd-bonus`

### 🧾 Recent Activity

- Completed advertisement history
- Reward amount
- Advertisement duration
- Completion status
- Relative activity time
- View All interaction

### 📱 Responsive Design

Designed to work across:

- Mobile devices
- Large mobile phones
- Tablets
- Laptops
- Desktop screens
- Full HD displays
- Ultra-wide screens

### ♿ Accessibility

- Semantic HTML
- Accessible buttons
- ARIA labels
- Progressbar accessibility
- Keyboard focus states
- Reduced-motion support

---

## 🛠️ Technology Stack

- React.js
- Vite
- React Hooks
- JavaScript
- SCSS
- Lucide React
- CSS3
- Responsive Design

> Note: The assignment recommends Bootstrap 5 and CSS Modules. This implementation uses a custom SCSS architecture to maintain a reusable and scalable styling system.

---

## 📁 Project Structure

```text
src/
│
├── components/
│   ├── activity/
│   │   └── RecentActivity.jsx
│   │
│   ├── ads/
│   │   └── AdSection.jsx
│   │
│   ├── earnings/
│   │   ├── EarningsInfo.jsx
│   │   └── HowItWorks.jsx
│   │
│   ├── hero/
│   │   └── WatchAdsHero.jsx
│   │
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   │
│   ├── progress/
│   │   └── DailyProgress.jsx
│   │
│   └── stats/
│       └── Stats.jsx
│
├── data/
│   └── ads.js
│
├── hooks/
│   └── useAdWatch.js
│
├── styles/
│   └── globals.scss
│
├── App.jsx
└── main.jsx