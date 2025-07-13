import { useEffect, useState } from "react";

export default function Profile() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">🧑 Profile Settings</h1>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
        Dark Mode
      </label>
    </div>
  );
}
