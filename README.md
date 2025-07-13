# 🧢 PokéStock — The Ultimate Pokémon Card Inventory Tracker

![PokéStock Banner](https://raw.githubusercontent.com/bhumitd09/pokestock/src/assets/banner.png)

**PokéStock** is a beautifully designed web app that lets collectors manage and visualize their Pokémon card collections with ease.  
Built with **React**, **Supabase**, and **Tailwind CSS**, it's perfect for both casual collectors and serious hobbyists.

---

## ✨ Features

- 📋 **Inventory System** – Add, edit, and delete Pokémon cards with detailed info
- 📈 **Dashboard Analytics** – View charts, total value, and recent activity
- 🌓 **Dark Mode Toggle** – Save your theme preference with style
- 🔍 **Search & Filter** – Locate cards with full-text search
- 🔄 **Real-Time Sync** – Live updates via Supabase subscriptions
- 🎨 **Framer Motion Animations** – Smooth modals and transitions
- 🧪 **Auth System** – Email + password or magic link login
- 📦 **Responsive Design** – Mobile and desktop optimized

---

## 📸 Preview

![PokéStock Preview](https://raw.githubusercontent.com/bhumitd9/pokestock/src/assets/screenshot.png)

> ⚠️ Replace these image URLs with your actual hosted assets

---

## 🚀 Tech Stack

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | React + Vite + TypeScript                 |
| UI        | Tailwind CSS + Shadcn/UI + Framer Motion  |
| Backend   | Supabase (Auth + Database)                |
| Charts    | Recharts                                  |
| Routing   | React Router                              |
| State     | React Hooks                               |

---

## 🛠 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/bhumitd9/pokestock.git
cd pokestock
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

- Create a project at [supabase.com](https://supabase.com)
- Enable Auth (Email, Password, Magic Link)
- Create a `cards` table with the following columns:

| Column      | Type      | Notes                         |
|-------------|-----------|-------------------------------|
| `id`        | Integer   | Primary Key                   |
| `name`      | Text      | Card name                     |
| `set`       | Text      | Set name                      |
| `condition` | Text      | e.g. Near Mint, Damaged       |
| `price`     | Float     | Estimated value               |
| `image_url` | Text      | (optional)                    |
| `created_at`| Timestamp | Default: now()                |
| `user_id`   | UUID      | Supabase Auth user reference  |

### 4. Add environment variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run the dev server

```bash
npm run dev
```

---

## 🗺 Roadmap

- ✅ Dark mode toggle with persistence  
- ✅ Table-based inventory UI (pagination, filtering, search)  
- ✅ Add/Edit/Delete modals  
- 🔜 User avatars and profile customization  
- 🔜 CSV import/export support  
- 🔮 AI-powered eBay price syncing  
- 📱 Mobile app (React Native)

---

## 💖 Credits

Built with passion by [@bhumitd09](https://github.com/bhumitd9)

> Pokémon © Nintendo / Game Freak — for inspiration purposes only.

---
