import { useState } from "react";
import { AuthContext, type User, type RegisterPayload } from "./auth.context";

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user,] = useState<User | null>(null);

  function register(payload: RegisterPayload) {
    console.log("Registering user:", payload);
  }

  function login(user: User) {
    console.log("Logging in user:", user);
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