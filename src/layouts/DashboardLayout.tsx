import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home, Inbox, Phone, Wallet, LogOut } from "lucide-react";
import { siteConfig } from "../../site.config";
import { useAuth } from "../lib/auth";

const links = [
  { to: "/app", end: true, label: "Home", icon: Home },
  { to: "/app/numbers", label: "Numbers", icon: Phone },
  { to: "/app/inbox", label: "Inbox", icon: Inbox },
  { to: "/app/wallet", label: "Wallet", icon: Wallet },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col max-w-lg mx-auto border-x border-border">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur border-b border-border">
        <div className="flex items-center gap-2">
          <img src={siteConfig.logoUrl} alt="" className="h-8 w-8" />
          <div>
            <p className="text-sm font-semibold leading-none">{siteConfig.name}</p>
            <p className="text-xs text-muted mt-0.5">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="p-2 rounded-lg text-muted hover:bg-card hover:text-foreground"
          aria-label="Log out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg border-t border-border bg-white/95 backdrop-blur">
        <ul className="grid grid-cols-4 gap-1 px-2 py-2">
          {links.map(({ to, end, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium",
                    isActive ? "text-primary bg-primary/10" : "text-muted",
                  ].join(" ")
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
