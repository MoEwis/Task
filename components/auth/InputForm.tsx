"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, useController } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
}

export function InputForm({
  name,
  label,
  placeholder,
  type = "text",
  control,
}: Props) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} placeholder={placeholder} {...field} />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
