import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  loginDemo: () => void;
  login: (email: string, password: string) => { ok: true } | { ok: false; message: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USER: User = {
  name: "Demo User",
  email: "demo@numora.app",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = sessionStorage.getItem("numora-demo-user");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const persist = useCallback((next: User | null) => {
    setUser(next);
    if (next) sessionStorage.setItem("numora-demo-user", JSON.stringify(next));
    else sessionStorage.removeItem("numora-demo-user");
  }, []);

  const loginDemo = useCallback(() => {
    persist(DEMO_USER);
  }, [persist]);

  const login = useCallback(
    (email: string, password: string) => {
      if (!email.trim() || !password.trim()) {
        return { ok: false as const, message: "Enter email and password" };
      }
      // Demo only — any non-empty credentials work. Buyers wire real auth later.
      persist({
        name: email.split("@")[0] || "User",
        email: email.trim().toLowerCase(),
      });
      return { ok: true as const };
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, loginDemo, login, logout }),
    [user, loginDemo, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
