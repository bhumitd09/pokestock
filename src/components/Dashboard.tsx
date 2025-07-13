import { useEffect, useState } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Card {
  id: number;
  name: string;
  set: string;
  condition: string;
  price: number;
  image_url?: string;
  created_at: string;
}

export default function Dashboard() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [cards, setCards] = useState<Card[]>([]);
  const [filter, setFilter] = useState("30");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);

      let query = supabase.from("cards").select("*").eq("user_id", session?.user.id);

      if (filter !== "all") {
        const since = new Date();
        since.setDate(since.getDate() - parseInt(filter));
        query = query.gte("created_at", since.toISOString());
      }

      const { data } = await query;
      if (data) setCards(data);

      setLoading(false);
    }

    fetchCards();

    const sub = supabase
      .channel("cards-realtime")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "cards",
        filter: `user_id=eq.${session?.user.id}`,
      }, fetchCards)
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [supabase, session, filter]);

  const totalCards = cards.length;
  const totalValue = cards.reduce((sum, c) => sum + (c.price || 0), 0);
  const uniqueSets = Array.from(new Set(cards.map(c => c.set)));

  const conditionCounts = ["Mint", "Near Mint", "Good", "Fair", "Poor"].map((cond) => ({
    condition: cond,
    count: cards.filter((c) => c.condition === cond).length,
  }));

  const recent = [...cards]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600">📊 Dashboard</h1>
        <div className="flex gap-2 text-sm">
          {["7", "30", "all"].map(val => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-3 py-1 rounded ${
                filter === val
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {val === "all" ? "All" : `${val}d`}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ label: "Total Cards", value: totalCards },
          { label: "Total Value", value: `£${totalValue.toFixed(2)}` },
          { label: "Unique Sets", value: uniqueSets.length }]
          .map(({ label, value }) => (
            <motion.div
              key={label}
              className="bg-gradient-to-br from-white/10 to-zinc-900/30 border border-white/10 dark:border-zinc-800 p-5 rounded-2xl shadow backdrop-blur"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-sm text-zinc-400">{label}</h2>
              <motion.p
                key={value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold mt-1 text-white"
              >
                {value}
              </motion.p>
            </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow">
        <h2 className="text-lg font-semibold mb-2 text-indigo-500">Cards by Condition</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={conditionCounts}>
            <XAxis dataKey="condition" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} isAnimationActive />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Cards */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow">
        <h2 className="text-lg font-semibold mb-3 text-indigo-500">Recently Added</h2>
        <ul className="space-y-3">
          {recent.map((card) => (
            <li key={card.id} className="p-3 rounded bg-white/5 hover:bg-white/10 transition border border-white/10">
              <div className="font-semibold">{card.name}</div>
              <div className="text-sm text-zinc-400">
                {card.set} · {new Date(card.created_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
