import { useState } from "react";
import { AxiosError } from "axios";
import type { User } from "@/types/user.types";
import { AuthContext, type LoginPayload, type RegisterPayload } from "./auth.context";
import { registerRequest as registerService, loginRequest as loginService } from "@/services/auth.service";

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const TOKEN_KEY = 'token';

  const [, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY)
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
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      const message = error instanceof AxiosError
        ? error.response?.data?.message ?? 'Login Failed'
        : 'Login Failed';
      throw new Error(message);
    }
  }

  function logout() {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
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