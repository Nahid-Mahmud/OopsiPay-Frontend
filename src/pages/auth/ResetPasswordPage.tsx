import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
// import { useResetPasswordMutation } from "@/redux/features/auth/auth.api"; // Uncomment when API is ready
import { resetPasswordValidationSchema } from "@/validations/resetPassword.zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

export default function ResetPasswordPage() {
  // const [resetPasswordFn, { isLoading }] = useResetPasswordMutation(); // Uncomment when API is ready

  const [resetPasswordFn, { isLoading }] = useResetPasswordMutation();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const form = useForm<z.infer<typeof resetPasswordValidationSchema>>({
    resolver: zodResolver(resetPasswordValidationSchema),
    defaultValues: {
      password: "",
      cPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordValidationSchema>) => {
    try {
      if (!token || !id) {
        toast.error("Invalid token or ID. Please try again.");
        return;
      }

      const res = await resetPasswordFn({ newPassword: values.password, id, token }).unwrap();
      if (res.success) {
        toast.success("Password reset successful! You can now log in.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message === "jwt expired") {
        toast.error("Token Expired. Please try again.");
      } else {
        toast.error("Failed to reset password. Please try again later.");
      }
    }
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
            <div className="text-center">
              <Link to="/" aria-label="go home" className="mx-auto block w-fit">
                OopsiPAY
              </Link>
              <h1 className=" mb-1 mt-4 text-xl font-semibold">Reset Password</h1>
              <p className="text-muted-foreground text-sm">Enter your new password below.</p>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-0.5">
                <PasswordInput form={form} />
              </div>
              <div className="space-y-0.5">
                <FormField
                  control={form.control}
                  name="cPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" autoComplete="new-password" required {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">Re-enter your new password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={isLoading} type="submit" className="w-full cursor-pointer">
                Reset Password {isLoading && <Loader2 className="inline-block h-4 w-4 animate-spin" />}
              </Button>
            </div>
          </div>

          <div className="p-3">
            <p className="text-accent-foreground text-center text-sm">
              Remember your password?
              <Button asChild variant="link" className="px-2">
                <Link to="/login">Sign In</Link>
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
}
