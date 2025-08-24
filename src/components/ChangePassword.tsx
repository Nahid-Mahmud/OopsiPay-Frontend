import { Lock, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import PasswordInput from "./PasswordInput";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { changePasswordValidationSchema } from "@/validations/changePassword.zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ChangePassword() {
  const [changePasswordFn, { isLoading }] = useChangePasswordMutation();

  const form = useForm<z.infer<typeof changePasswordValidationSchema>>({
    resolver: zodResolver(changePasswordValidationSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordValidationSchema>) => {
    try {
      const res = await changePasswordFn({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).unwrap();

      if (res.success) {
        toast.success("Password changed successfully!");
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };
  return (
    <div className="lg:col-span-2 space-y-8">
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-serif flex items-center gap-3">
            <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Lock className="h-5 w-5 text-destructive" />
            </div>
            Change Password
          </CardTitle>
          <CardDescription className="text-base">
            Update your password to keep your account secure. Use a strong password with at least 8 characters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your current password"
                        className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">Enter your current password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PasswordInput form={form} name="newPassword" label="New Password" placeholder="Enter new password" />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">Confirm your new password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Requirements */}
              <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Password Requirements</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• At least one uppercase letter</li>
                      <li>• At least one lowercase letter</li>
                      <li>• At least one number</li>
                      <li>• At least one special character</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Change Password Button */}
              <div className="flex justify-end pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  variant="destructive"
                  className="min-w-[160px] h-12 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Changing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Change Password
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
