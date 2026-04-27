import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type WalletState = {
  address: string | null;
  balance: number; // SOL
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
};

const WalletCtx = createContext<WalletState | null>(null);

const STORAGE_KEY = "mckwork:wallet";

function randomAddress() {
  const chars = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 40; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { address: string; balance: number };
        setAddress(parsed.address);
        setBalance(parsed.balance ?? 0);
      }
    } catch {}
  }, []);

  const connect = () => {
    const addr = randomAddress();
    setAddress(addr);
    setBalance(0);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ address: addr, balance: 0 }));
    } catch {}
  };

  const disconnect = () => {
    setAddress(null);
    setBalance(0);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <WalletCtx.Provider value={{ address, balance, connected: !!address, connect, disconnect }}>
      {children}
    </WalletCtx.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletCtx);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

export function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
