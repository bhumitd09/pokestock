# 🧢 PokéStock — The Ultimate Pokémon Card Inventory Tracker

![PokéStock Banner](https://raw.githubusercontent.com/bhumitd9/pokestock/src/assets/banner.png)

PokéStock is a beautifully designed web app that lets collectors manage and visualize their Pokémon card collections with ease. Built using **React**, **Supabase**, and **Tailwind CSS**, it's designed for both casual collectors and hardcore inventory nerds.

---

## ✨ Features

- 📋 **Inventory System** — Add, edit, and delete Pokémon cards with full details.
- 📈 **Dashboard Analytics** — Real-time stats, visual charts, and recent activity.
- 🌓 **Dark Mode Toggle** — Stylish theme support with saved preference.
- 🔍 **Search + Filter** — Easily locate cards with full-text filtering.
- 🔄 **Live Updates** — Real-time syncing via Supabase subscriptions.
- 🎨 **Framer Motion Animations** — Smooth UI transitions and modals.
- 📦 **Responsive Layout** — Mobile & desktop optimized.
- 🧪 **Auth** — Secure login via email + password or magic link.

---

## 📸 Preview

![PokéStock Preview](https://raw.githubusercontent.com/bhumitd9/pokestock/src/assets/screenshot.png)

> Replace these image URLs with actual hosted screenshots or assets in your repo.

---

## 🚀 Tech Stack

- **Frontend**: React + Vite + TypeScript
- **UI**: Tailwind CSS + Shadcn/ui + Framer Motion
- **Backend**: Supabase (Auth + Database)
- **Charts**: Recharts
- **Routing**: React Router
- **State**: React Hooks

---

## 🔧 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/bhumitd9/pokestock.git
cd pokestock


2. **Install dependencies**
npm install

3. **Set up Supabase**
Create a Supabase project at supabase.com

Enable Auth (Email + Magic Link + Password)

Create a cards table with fields:

id (int, PK)

name (text)

set (text)

condition (text)

price (float)

image_url (text)

created_at (timestamp, default now)

user_id (uuid)

4. **Configure environment**
Create a .env file in the root:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

5. **Start the dev server**
npm run dev

---

🗺 Roadmap
 Dark mode toggle with persistence

 Table pagination and filtering

 Add/Edit/Delete card modals

 User avatars + profile customization

 CSV import/export support

 eBay price syncing via AI 🔮

 Mobile app (React Native)

 ---

💖 Credits
Built by @bhumitd9

---

Pokémon © Nintendo / Game Freak — for inspiration only.

