"use client";

// context/AuthContext.tsx
// Konteks autentikasi simulasi dan penyimpanan event tersimpan (bookmark)
// Mengikuti aturan AGENTS.md: sessionStorage & localStorage dibungkus try/catch

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "mitra" | "lari";

export interface UserSession {
  role: UserRole;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserSession | null;
  login: (role: UserRole) => void;
  logout: () => void;
  savedEventIds: number[];
  toggleSaveEvent: (eventId: number) => { success: boolean; saved: boolean };
  isEventSaved: (eventId: number) => boolean;
  returnUrl: string;
  setReturnUrl: (url: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [savedEventIds, setSavedEventIds] = useState<number[]>([]);
  const [returnUrl, setReturnUrl] = useState<string>("/");

  // Membaca sesi dari sessionStorage saat aplikasi dimuat pertama kali
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("rc-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Abaikan jika sessionStorage dinonaktifkan atau gagal
    }

    try {
      const storedSaved = localStorage.getItem("rc-saved-events");
      if (storedSaved) {
        setSavedEventIds(JSON.parse(storedSaved));
      }
    } catch {
      // Abaikan jika localStorage dinonaktifkan atau gagal
    }
  }, []);

  // Fungsi login simulasi
  const login = (role: UserRole) => {
    const newUser: UserSession = {
      role,
      name: "Darren Pratama",
      email: "darren@contoh.id",
    };
    setUser(newUser);
    try {
      sessionStorage.setItem("rc-user", JSON.stringify(newUser));
    } catch {
      // Abaikan bila ada hambatan storage
    }
  };

  // Fungsi logout simulasi
  const logout = () => {
    setUser(null);
    try {
      sessionStorage.removeItem("rc-user");
    } catch {
      // Abaikan
    }
  };

  // Toggle simpan event (khusus Pengguna Lari)
  const toggleSaveEvent = (eventId: number): { success: boolean; saved: boolean } => {
    if (!user || user.role !== "lari") {
      return { success: false, saved: false };
    }

    let nextSaved: number[];
    let isNowSaved = false;

    if (savedEventIds.includes(eventId)) {
      nextSaved = savedEventIds.filter((id) => id !== eventId);
      isNowSaved = false;
    } else {
      nextSaved = [...savedEventIds, eventId];
      isNowSaved = true;
    }

    setSavedEventIds(nextSaved);
    try {
      localStorage.setItem("rc-saved-events", JSON.stringify(nextSaved));
    } catch {
      // Abaikan
    }

    return { success: true, saved: isNowSaved };
  };

  const isEventSaved = (eventId: number) => {
    return savedEventIds.includes(eventId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        savedEventIds,
        toggleSaveEvent,
        isEventSaved,
        returnUrl,
        setReturnUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}
