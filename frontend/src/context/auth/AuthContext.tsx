import { useState } from "react";
import { AxiosError } from "axios";
import type { User } from "@/types/user.types";
import { AuthContext, type LoginPayload, type RegisterPayload } from "./auth.context";
import { registerRequest as registerService, loginRequest as loginService } from "@/services/auth.service";

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const TOKEN_KEY = 'token';

  // helper functions to manage token in localStorage with error handling
  // cross-browser safe and handles cases where localStorage is unavailable (e.g., in private mode)
  function getStoredToken() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  function storeToken(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      return;
    }
  }

  function clearStoredToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      return;
    }
  }

  const [, setToken] = useState<string | null>(() => {
    return getStoredToken();
  })
  const [user, setUser] = useState<User | null>(null);

  async function register(payload: RegisterPayload) {
    try {
      const user = await registerService(payload);
      setUser(user);
    } catch (error) {
      const message = error instanceof AxiosError
        ? error.response?.data?.message ?? 'Registration Failed'
        : 'Registration Failed';
      throw new Error(message);
    }
  }

  async function login(payload: LoginPayload) {
    try {
      const { token } = await loginService(payload);
      setToken(token);
      storeToken(token);
    } catch (error) {
      const message = error instanceof AxiosError
        ? error.response?.data?.message ?? 'Login Failed'
        : 'Login Failed';
      throw new Error(message);
    }
  }

  function logout() {
    setToken(null);
    clearStoredToken();
  }

  return (
    <AuthContext.Provider value={{
      user,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}