import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type TVerifyOtp = z.infer<typeof verifyOtpSchema>;

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtpFn, { isLoading: isResending }] = useSendOtpMutation();
  const [sendOtpTime, setSendOtpTime] = useState<number | null>(null);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSendOtpTime((prev) => {
        if (prev === null) return null;
        if (prev <= 1) return null;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/login");
    } else {
      setPageLoading(false);
    }
  }, [location.state?.email, navigate]);

  const form = useForm<TVerifyOtp>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: TVerifyOtp) => {
    if (!location.state?.email) {
      toast.error("Email not found in state. Please try again.");
      return;
    }

    try {
      const res = await verifyOtp({
        email: location.state?.email,
        otp: values.otp,
      }).unwrap();

      if (res.success) {
        toast.success("Email verified successfully!");
        navigate("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Verification failed");
    }
  };

  const handleResendOtp = async () => {
    const toastId = toast.loading("Resending OTP...");
    try {
      const res = await resendOtpFn({
        email: location.state?.email,
      }).unwrap();
      if (res.success) {
        toast.dismiss(toastId);
        toast.success("OTP resent successfully!");

        setSendOtpTime(5);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      toast.dismiss(toastId);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
            <div className="text-center">
              <h1 className="mb-1 mt-4 text-xl font-semibold">Verify Your Email</h1>
              <p className="text-muted-foreground text-sm mb-4">Enter the 6-digit code sent to your email.</p>
            </div>
            <div className="mt-6 flex flex-col gap-5 items-center justify-center ">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                        <InputOTPGroup>
                          {[...Array(6)].map((_, i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit" className="w-full cursor-pointer">
                Verify {isLoading && <Loader2 className="inline-block h-4 w-4 animate-spin" />}
              </Button>
            </div>
            <div className="mt-5 ">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p className=""> Didn't receive the code?</p>{" "}
                <Button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={sendOtpTime !== null || isResending}
                  className="cursor-pointer disabled:cursor-not-allowed"
                  variant="link"
                >
                  Resend {sendOtpTime !== null ? `(${sendOtpTime})` : ""}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
