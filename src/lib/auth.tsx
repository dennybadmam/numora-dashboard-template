import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CurrencyCode } from "../../site.config";

export type User = {
  name: string;
  email: string;
  phone: string;
  dialCode: string;
  currency: CurrencyCode;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
  dialCode: string;
  currency: CurrencyCode;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => { ok: true } | { ok: false; message: string };
  register: (input: RegisterInput) => { ok: true } | { ok: false; message: string };
  loginDemo: () => void;
  logout: () => void;
  setCurrency: (c: CurrencyCode) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "numora-session-v2";

const DEMO_USER: User = {
  name: "Alex Morgan",
  email: "alex@numora.app",
  phone: "8141620644",
  dialCode: "+234",
  currency: "USD",
};

function loadUser(): User | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUser());

  const persist = useCallback((next: User | null) => {
    setUser(next);
    if (next) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      if (!email.trim() || !password.trim()) {
        return { ok: false as const, message: "Enter your email and password." };
      }
      const existing = loadUser();
      persist({
        name: existing?.name || email.split("@")[0] || "User",
        email: email.trim().toLowerCase(),
        phone: existing?.phone || "",
        dialCode: existing?.dialCode || "+1",
        currency: existing?.currency || "USD",
      });
      return { ok: true as const };
    },
    [persist],
  );

  const register = useCallback(
    (input: RegisterInput) => {
      if (!input.name.trim()) return { ok: false as const, message: "Enter your full name." };
      if (!input.email.trim()) return { ok: false as const, message: "Enter a valid email." };
      if (input.password.length < 6)
        return { ok: false as const, message: "Password must be at least 6 characters." };
      if (!input.phone.trim()) return { ok: false as const, message: "Enter your phone number." };
      persist({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone.replace(/\D/g, ""),
        dialCode: input.dialCode,
        currency: input.currency,
      });
      return { ok: true as const };
    },
    [persist],
  );

  const loginDemo = useCallback(() => persist(DEMO_USER), [persist]);
  const logout = useCallback(() => persist(null), [persist]);

  const setCurrency = useCallback(
    (currency: CurrencyCode) => {
      if (!user) return;
      persist({ ...user, currency });
    },
    [user, persist],
  );

  const value = useMemo(
    () => ({ user, login, register, loginDemo, logout, setCurrency }),
    [user, login, register, loginDemo, logout, setCurrency],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
