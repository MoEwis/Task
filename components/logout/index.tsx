"use client";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/redux/features/authApi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LogoutButton() {
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const t = useTranslations("LogoutButton");

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      router.push("/login");
    } catch (error) {
      console.error(" Logout error", error);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? t("loggingOut") : t("logout")}
    </Button>
  );
}
