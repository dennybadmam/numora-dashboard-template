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
    <div className="min-h-dvh bg-[#0B0F19] text-white flex flex-col max-w-lg mx-auto border-x border-white/5">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 glass">
        <div className="flex items-center gap-2.5">
          <img src={siteConfig.logoUrl} alt="" className="h-8 w-8" />
          <div>
            <p className="text-sm font-semibold leading-none">{siteConfig.name}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              {user?.currency} · {user?.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="p-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white"
          aria-label="Log out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-24 animate-fade-up">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg border-t border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl">
        <ul className="grid grid-cols-4 gap-1 px-2 py-2">
          {links.map(({ to, end, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition",
                    isActive ? "text-cyan-300 bg-white/5" : "text-slate-500",
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
