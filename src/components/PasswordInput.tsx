import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";

type PasswordInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
};

export default function PasswordInput<T extends FieldValues>({
  form,
  name = "password" as Path<T>,
  label = "Password",
  placeholder = "Enter password",
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder={placeholder}
                required
                {...field}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
              </div>
            </div>
          </FormControl>
          <FormDescription className="sr-only">This is your password field.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
