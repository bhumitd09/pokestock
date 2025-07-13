import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Auth from "@/components/Auth";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageWrapper from "@/components/PageWrapper";
import Dashboard from "@/components/Dashboard";
import Inventory from "@/components/Inventory";
import Profile from "@/components/Profile";
import MagicLinkHandler from "@/components/MagicLinkHandler";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageWrapper><Auth /></PageWrapper>} />
        <Route path="/magic" element={<PageWrapper><MagicLinkHandler /></PageWrapper>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Layout>
                <PageWrapper>
                  <Inventory />
                </PageWrapper>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <PageWrapper>
                  <Profile />
                </PageWrapper>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </AnimatePresence>
  );
}
