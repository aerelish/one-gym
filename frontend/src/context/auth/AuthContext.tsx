import { useState } from "react";
import { AxiosError } from "axios";
import type { User } from "@/types/user.types";
import { AuthContext, type LoginPayload, type RegisterPayload } from "./auth.context";
import { loginRequest as loginService } from "@/services/auth.service";

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const TOKEN_KEY = 'token';

  const [, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY)
  })
  const [user,] = useState<User | null>(null);

  function register(payload: RegisterPayload) {
    console.log("Registering user:", payload);
  }

  async function login(payload: LoginPayload) {
    try {
      const { token } = await loginService(payload.email, payload.password);
      setToken(token);
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      const message = error instanceof AxiosError
        ? error.response?.data?.message ?? 'Login failed'
        : 'Login failed';
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