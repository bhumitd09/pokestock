import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import App from "./App";
import "@/index.css"; // 

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </BrowserRouter>
);
