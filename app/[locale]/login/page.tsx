"use client";
import { useLoginMutation } from "@/redux/features/authApi";
import { useRouter } from "next/navigation";
import { ILoginDTO } from "@/types/auth";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (data: ILoginDTO) => {
    try {
      const res = await login(data).unwrap();
      if (res.data.type === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/employee");
      }
    } catch {
      alert("Login failed.");
    }
  };

  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
