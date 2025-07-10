"use client";
import { useProfileQuery } from "@/redux/features/authApi";
import LogoutButton from "@/components/logout";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const { data, error, isLoading } = useProfileQuery();
  const t = useTranslations("Profile");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{t("error")}</p>
      </div>
    );
  }

  const user = data?.data?.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center space-y-4">
        <LogoutButton />

        <h2 className="text-2xl font-bold">
          {t("welcome", { name: user?.name })}
        </h2>
        <p className="text-gray-700">
          {t("email")}: {user?.email}
        </p>
        <p className="text-gray-700">
          {t("type")}: {user?.type}
        </p>
      </div>
    </div>
  );
}
