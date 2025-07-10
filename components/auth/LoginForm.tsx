"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputForm } from "./InputForm";
import { loginSchema } from "@/schema/loginSchema";
import { useTranslations } from "next-intl";

interface Props {
  onSubmit: (data: z.infer<typeof loginSchema>) => void;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, isLoading }: Props) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const t = useTranslations("Login");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm mx-auto pt-24 space-y-4"
      >
        <InputForm
          name="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          control={form.control}
        />

        <InputForm
          name="password"
          label={t("password")}
          placeholder={t("passwordPlaceholder")}
          type="password"
          control={form.control}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("loading") : t("login")}
        </Button>
      </form>
    </Form>
  );
}
