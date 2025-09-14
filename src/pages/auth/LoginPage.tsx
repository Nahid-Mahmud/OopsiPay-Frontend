import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { USER_ROLES } from "@/constants/user.constants";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { loginUserValidationSchema } from "@/validations/auth.zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export default function LoginPage() {
  const [loginUserFn, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginUserValidationSchema>>({
    resolver: zodResolver(loginUserValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const defaultCredentials = {
    USER: { email: "kamla@oletters.com", password: "passwordA1@" },
    AGENT: { email: "newagent@oletters.com", password: "Pa$$w0rd!" },
    ADMIN: { email: "admin@gmaill.com", password: "Pa$$w0rd!34" },
  };

  const loginWithRole = (role: keyof typeof defaultCredentials) => {
    const credentials = defaultCredentials[role];
    form.setValue("email", credentials.email);
    form.setValue("password", credentials.password);
    form.handleSubmit(onSubmit)();
  };

  const getRoute = (role: string) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return "/admin";
      case USER_ROLES.SUPER_ADMIN:
        return "/admin";
      case USER_ROLES.USER:
        return "/user";
      case USER_ROLES.AGENT:
        return "/agent";
      default:
        return "/";
    }
  };

  const onSubmit = async (values: z.infer<typeof loginUserValidationSchema>) => {
    try {
      const res = await loginUserFn(values).unwrap();
      if (res.success) {
        toast.success("Login successful!");
        // expire in 30 days
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = `user=${true}; path=/; expires=${expires.toUTCString()}`;

        const userRole = res.data.role;

        navigate(getRoute(userRole), { replace: true });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data.message === "User is not verified") {
        navigate("/verify-email", {
          state: { email: values.email },
        });
        toast.warning("Please verify your email before logging in.");
        return;
      }

      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      {/*  */}

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
              <h1 className=" mb-1 mt-4 text-xl font-semibold">Sign in to OopsiPAY</h1>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="email" required {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">This is your public display Email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-0.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link to="/forget-password" className="text-xs text-primary underline">
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" autoComplete="current-password" required {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">This is your public display Password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={isLoading} type="submit" className="w-full cursor-pointer">
                Sign In {isLoading && <Loader2 className="inline-block h-4 w-4 animate-spin" />}
              </Button>

              <div className="mt-4 flex flex-col gap-2">
                <p className="text-center mb-2 underline font-bold text-2xl">Login As</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => loginWithRole("USER")}
                    variant="outline"
                    className="w-fit flex-1"
                  >
                    User
                  </Button>
                  <Button
                    type="button"
                    onClick={() => loginWithRole("AGENT")}
                    variant="outline"
                    className="w-fit flex-1"
                  >
                    Agent
                  </Button>
                  <Button
                    type="button"
                    onClick={() => loginWithRole("ADMIN")}
                    variant="outline"
                    className="w-fit flex-1"
                  >
                    Admin
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="flex justify-center mb-2">
              <Button asChild variant="link" className="px-2">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            <p className="text-accent-foreground text-center text-sm">
              Don&apos;t have an account?
              <Button asChild variant="link" className="px-2">
                <Link to="/register">Create Account</Link>
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
}
