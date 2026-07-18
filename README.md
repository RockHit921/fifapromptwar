# ⚽ ApexArena 2026 — GenAI FIFA World Cup Smart Stadium OS

> **Smart Stadiums & Tournament Operations Platform**

ApexArena 2026 is an AI-powered Smart Stadium Platform designed for the **FIFA World Cup 2026**. It unifies **Fan Experience Navigation & Assistance** with a **Venue Security & Operations Control Center**, leveraging **Google Gemini GenAI**, **Web Speech Synthesis/Recognition**, **Web Audio Acoustic Beacons**, **Google Cloud Run container readiness**, and **WCAG 2.1 AA Accessibility Standards**.

---

## 🚀 Key Platform Capabilities

### 1. Dual Persona Interface & Match Physics Simulation
- **Live Match Timeline Simulator**: Controls matchday crowd flow dynamics across Pre-Match Inflow, Kickoff Gate Surge, 45' Halftime Rush, and 85' Rapid Egress phases. Includes scanner processing speed tuning slider (1.5s - 8.0s).
- **Fan Experience Portal**:
  - **Multilingual Voice/Text AI Companion**: Answers queries in 10+ languages (English, Spanish, French, Portuguese, German, Arabic, Japanese, Korean, Hindi, Chinese) using Google Gemini and Web Speech API.
  - **Interactive Stadium Map**: Real-time gate turnstile wait times, satellite/tactical layer toggle, step-free wheelchair paths, and Web Audio acoustic direction beacons.
  - **Digital NFC & QR Pass Scanner**: Interactive mobile ticket scanning & Eco Point redemption modal.
  - **Smart Queue & Wait Predictor**: Calculates turnstile throughput and food/restroom queue wait times. Recommends alternative fast-track gates automatically.
  - **EcoGoal Sustainability Rewards**: Gamified points for zero-emission transit, reusable cups, and off-peak gate entry.
- **Operations & Security Command Center**:
  - **AI Crowd & Gate Density Radar**: Real-time sector congestion telemetry with radar sweep visualization.
  - **Gemini Vision CCTV Safety Auditor**: Multimodal image analysis inspecting CCTV feeds to calculate safety scores (0-100) with interactive bounding box hazard annotations.
  - **Emergency Incident Dispatcher**: Real-time volunteer task routing and Gemini-generated emergency response playbooks.
  - **Multilingual PA Announcement Generator**: Instant Public Address broadcast generator producing simultaneous scripts in English, Spanish, and French with text-to-speech broadcast controls.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core**: React 19 + TypeScript + Vite 6
- **Styling**: TailwindCSS v4 + Glassmorphism design system + Lucide Icons
- **AI & Audio**: `@google/genai` (Gemini 2.5 Flash), Web Speech API (TTS & STT), Web Audio API
- **Testing**: Vitest + React Testing Library + JSDOM
- **Deployment**: Dockerfile + Express Production Server (`server.js`)

---

## 🏁 Quick Start & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Run Automated Unit Tests
```bash
npm run test
```

### 4. Build for Production
```bash
npm run build
npm start
```
