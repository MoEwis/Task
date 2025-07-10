"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const AdminPage = () => {
  const t = useTranslations("Admin");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-gray-600">{t("description")}</p>

        <Link href="/dashboard/admin/profile">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {t("goToProfile")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
