"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangePinMutation, useSetPinMutation, useUserInfoQuery } from "@/redux/features/user/user.api";
import { changePinZodSchema, setPinZodSchema } from "@/validations/changePin.zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Save, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ChangePinPage() {
  const [changePin, { isLoading: isChanging }] = useChangePinMutation();
  const [setPin, { isLoading: isSetting }] = useSetPinMutation();
  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfoQuery();

  const hasPin = userInfo?.data?.pin;

  // Form for changing existing pin
  const changePinForm = useForm<z.infer<typeof changePinZodSchema>>({
    resolver: zodResolver(changePinZodSchema),
    defaultValues: {
      oldPin: "",
      newPin: "",
      confirmPin: "",
    },
  });

  // Form for setting pin first time
  const setPinForm = useForm<z.infer<typeof setPinZodSchema>>({
    resolver: zodResolver(setPinZodSchema),
    defaultValues: {
      newPin: "",
      confirmPin: "",
    },
  });

  const onChangePinSubmit = async (values: z.infer<typeof changePinZodSchema>) => {
    try {
      const res = await changePin({
        oldPin: values.oldPin,
        newPin: values.newPin,
      }).unwrap();

      if (res.success) {
        toast.success("PIN changed successfully!");
        changePinForm.reset();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Change PIN error:", error);
      toast.error("Failed to change PIN. Please try again.");
    }
  };

  const onSetPinSubmit = async (values: z.infer<typeof setPinZodSchema>) => {
    try {
      const res = await setPin({
        pin: values.newPin,
      }).unwrap();

      if (res.success) {
        toast.success("PIN set successfully!");
        setPinForm.reset();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Set PIN error:", error);
      toast.error("Failed to set PIN. Please try again.");
    }
  };

  if (isLoadingUserInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex justify-center items-center py-8">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {hasPin ? (
        // Change PIN Form
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-serif flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <KeyRound className="h-5 w-5 text-destructive" />
              </div>
              Change Security PIN
            </CardTitle>
            <CardDescription className="text-base">
              Enter your current PIN and choose a new one. Your PIN should be at least 5 digits long.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...changePinForm}>
              <form onSubmit={changePinForm.handleSubmit(onChangePinSubmit)} className="space-y-6">
                <FormField
                  control={changePinForm.control}
                  name="oldPin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current PIN</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          inputMode="numeric"
                          placeholder="Enter your current PIN"
                          className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 text-center text-lg tracking-widest"
                          {...field}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/\D/g, "");
                            field.onChange(numericValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={changePinForm.control}
                    name="newPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New PIN</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            inputMode="numeric"
                            placeholder="Enter new PIN"
                            className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 text-center text-lg tracking-widest"
                            {...field}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/\D/g, "");
                              field.onChange(numericValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={changePinForm.control}
                    name="confirmPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New PIN</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            inputMode="numeric"
                            placeholder="Confirm new PIN"
                            className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 text-center text-lg tracking-widest"
                            {...field}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/\D/g, "");
                              field.onChange(numericValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* PIN Requirements */}
                <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">PIN Security Guidelines</p>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Use at least 5 digits for your PIN</li>
                        <li>• Avoid obvious patterns like 12345 or 11111</li>
                        <li>• Don't use your birthday or phone number</li>
                        <li>• Choose something memorable but unique</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Change PIN Button */}
                <div className="flex justify-end pt-6 border-t">
                  <Button
                    type="submit"
                    disabled={isChanging}
                    size="lg"
                    variant="destructive"
                    className="min-w-[160px] h-12 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isChanging ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Changing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Change PIN
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        // Set PIN Form (First Time)
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-serif flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <KeyRound className="h-5 w-5 text-primary" />
              </div>
              Set Your Security PIN
            </CardTitle>
            <CardDescription className="text-base">
              You haven't set a PIN yet. Create a secure PIN to protect your transactions. Your PIN should be at least 5
              digits long.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...setPinForm}>
              <form onSubmit={setPinForm.handleSubmit(onSetPinSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={setPinForm.control}
                    name="newPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New PIN</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            inputMode="numeric"
                            placeholder="Enter your PIN"
                            className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 text-center text-lg tracking-widest"
                            {...field}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/\D/g, "");
                              field.onChange(numericValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={setPinForm.control}
                    name="confirmPin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm PIN</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            inputMode="numeric"
                            placeholder="Confirm your PIN"
                            className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 text-center text-lg tracking-widest"
                            {...field}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/\D/g, "");
                              field.onChange(numericValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* PIN Requirements */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">PIN Security Guidelines</p>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Use at least 5 digits for your PIN</li>
                        <li>• Avoid obvious patterns like 12345 or 11111</li>
                        <li>• Don't use your birthday or phone number</li>
                        <li>• Choose something memorable but unique</li>
                        <li>• You can change this PIN later if needed</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Set PIN Button */}
                <div className="flex justify-end pt-6 border-t">
                  <Button
                    type="submit"
                    disabled={isSetting}
                    size="lg"
                    className="min-w-[160px] h-12 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isSetting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Setting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Set PIN
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
