import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function MagicLinkHandler() {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const processMagicLink = async () => {
      const { error } = await supabase.auth.getSessionFromUrl();

      if (error) {
        console.error("Magic link error:", error.message);
      } else {
        // Wait briefly to allow session propagation
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    };

    processMagicLink();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg bg-black">
      <div className="animate-pulse text-center">
        <p>Signing you in...</p>
        <p className="text-sm opacity-70 mt-2">Please wait ⏳</p>
      </div>
    </div>
  );
}
