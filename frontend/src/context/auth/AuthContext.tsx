import { useState } from "react";
import { AuthContext, type User, type RegisterPayload } from "./auth.context";
import { login as loginService } from "@/services/auth.service";

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user,] = useState<User | null>(null);

  function register(payload: RegisterPayload) {
    console.log("Registering user:", payload);
  }

  async function login(user: User) {
    const data = await loginService(user.email, user.password);
    if (data) console.log("Login successful:", data);
  }

  function logout() {
    console.log("Logging out user");
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