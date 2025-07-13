import { useSession, useSessionContext } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading } = useSessionContext();
  const session = useSession();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Checking session...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
