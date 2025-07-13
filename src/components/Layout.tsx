import { useState, useEffect, ReactNode } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black text-zinc-900 dark:text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="flex items-center space-x-3">
          {session && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </button>
          )}
          <h1 className="text-xl font-semibold text-indigo-600">PokéStock</h1>
        </div>
        {session && (
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        )}
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="fixed top-16 left-0 w-64 h-full bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 shadow-lg p-6 space-y-4 z-50">
          <p className="text-sm font-medium">🔧 Coming soon</p>
          <ul className="space-y-2">
            <li className="text-zinc-500">Settings</li>
            <li className="text-zinc-500">Import CSV</li>
            <li className="text-zinc-500">Market Sync</li>
          </ul>
        </aside>
      )}

      {/* Tab Navigation */}
      {session && (
        <nav className="flex space-x-4 px-6 py-3 border-b dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <button
            className={`text-sm font-medium ${
              currentPath === "/dashboard"
                ? "text-indigo-600"
                : "text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
            }`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`text-sm font-medium ${
              currentPath === "/inventory"
                ? "text-indigo-600"
                : "text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
            }`}
            onClick={() => navigate("/inventory")}
          >
            Inventory
          </button>
          <button
            className={`text-sm font-medium ${
              currentPath === "/profile"
                ? "text-indigo-600"
                : "text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
            }`}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </nav>
      )}

      {/* Main content */}
      <main className="px-4 py-8 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
