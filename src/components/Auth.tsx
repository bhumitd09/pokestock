import { useState, useEffect } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Auth() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [magicLink, setMagicLink] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigate("/");
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (magicLink) {
      await supabase.auth.signInWithOtp({ email });
    } else {
      await supabase.auth.signInWithPassword({ email, password });
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('/src/assets/wallpaper/36sr31w5cqud1.gif')",
      }}
    >
      <div className="backdrop-blur-md bg-white/20 dark:bg-black/30 border border-white/30 dark:border-zinc-800 rounded-2xl p-8 shadow-2xl w-[90%] max-w-md text-center text-white animate-fade-in">
        <h1 className="text-2xl font-bold mb-2">Welcome Back to</h1>
        <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow">PokéStock</h2>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-purple-600"
          />
          {!magicLink && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-purple-600 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-400 hover:bg-purple-500 text-black font-bold py-2 rounded-md transition"
          >
            {loading ? "Loading..." : magicLink ? "Send Magic Link" : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          Prefer magic link?{" "}
          <button
            onClick={() => setMagicLink(!magicLink)}
            className="underline text-purple-800 hover:text-white"
            type="button"
          >
            Use magic link
          </button>
        </div>
      </div>
    </div>
  );
}