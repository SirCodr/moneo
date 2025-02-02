import type { Metadata } from "next"
import LoginForm from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login | Expense Tracker",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
      <LoginForm />
  );
}