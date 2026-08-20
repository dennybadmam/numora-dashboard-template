import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { OverviewPage } from "./pages/OverviewPage";
import { NumbersPage } from "./pages/NumbersPage";
import { WalletPage } from "./pages/WalletPage";
import { InboxPage } from "./pages/InboxPage";
import { AuthProvider, useAuth } from "./lib/auth";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="numbers" element={<NumbersPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="wallet" element={<WalletPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
