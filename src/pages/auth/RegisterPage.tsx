import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegisterMutation } from "@/redux/features/user/user.api";

import { registerUserValidationSchema } from "@/validations/user.zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export default function RegisterPage() {
  const [registerUserFn, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerUserValidationSchema>>({
    resolver: zodResolver(registerUserValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cPassword: "",
      role: "USER",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerUserValidationSchema>) => {
    try {
      const res = await registerUserFn(values).unwrap();

      if (res.success) {
        toast.success("Registration successful! Please check your email to verify your account.");
        navigate("/verify-email", {
          state: { email: values.email },
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Registration failed. Please try again later.");
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
              <h1 className=" mb-1 mt-4 text-xl font-semibold">Create a OopsiPAY Account</h1>
            </div>

            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">This is your public display First Name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">This is your public display Last Name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange} required>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="USER">User</SelectItem>
                              <SelectItem value="AGENT">Agent</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="sr-only">This is your public display Role.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-0.5">
                <PasswordInput form={form} />
              </div>
              <div className="space-y-0.5">
                <FormField
                  control={form.control}
                  name="cPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Confirm Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input type="password" autoComplete="new-password" required {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display Confirm Password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={isLoading} type="submit" className="w-full cursor-pointer">
                Register Account {isLoading && <Loader2 className="inline-block h-4 w-4 animate-spin" />}
              </Button>
            </div>
          </div>

          <div className="p-3">
            <p className="text-accent-foreground text-center text-sm">
              Have an account ?
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
