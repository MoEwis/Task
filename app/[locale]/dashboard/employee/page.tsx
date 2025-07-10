"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function EmployeePage() {
  const t = useTranslations("EmployeePage");

  return (
    <div className="p-8 max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <Link
        href="/dashboard/employee/profile"
        className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
      >
        {t("goToProfile")}
      </Link>
    </div>
  );
}
