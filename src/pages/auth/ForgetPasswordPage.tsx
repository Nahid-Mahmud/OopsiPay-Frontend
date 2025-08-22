import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgetPasswordMutation } from "@/redux/features/auth/auth.api";
import { forgetPasswordValidationSchema } from "@/validations/forgetPassword.zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

export default function ForgetPasswordPage() {
  const [forgetPasswordFn, { isLoading }] = useForgetPasswordMutation();

  const form = useForm<z.infer<typeof forgetPasswordValidationSchema>>({
    resolver: zodResolver(forgetPasswordValidationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgetPasswordValidationSchema>) => {
    try {
      const res = await forgetPasswordFn(values).unwrap();
      if (res.success) {
        toast.success("Password reset link sent! Please check your email.");
      }
    } catch {
      toast.error("Failed to send reset link. Please try again later.");
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
              <h1 className=" mb-1 mt-4 text-xl font-semibold">Forgot Password?</h1>
              <p className="text-muted-foreground text-sm">Enter your email to receive a password reset link.</p>
            </div>

            <div className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" required {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">Enter your registered email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit" className="w-full cursor-pointer">
                Send Reset Link {isLoading && <Loader2 className="inline-block h-4 w-4 animate-spin" />}
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
