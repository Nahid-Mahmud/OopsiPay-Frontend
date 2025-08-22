import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        action=""
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
              <div className="space-y-2">
                <Label htmlFor="firstName" className="block text-sm">
                  First Name
                </Label>
                <Input type="text" required name="firstName" id="firstName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="block text-sm">
                  Last Name
                </Label>
                <Input type="text" required name="lastName" id="lastName" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input type="email" required name="email" id="email" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className=" text-sm">
                  Password
                </Label>
                <Button asChild variant="link" size="sm">
                  <Link to="/forget-password" className="link intent-info variant-ghost text-sm">
                    Forgot your Password ?
                  </Link>
                </Button>
              </div>
              <Input type="password" required name="password" id="password" className="input sz-md variant-mixed" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="cPassword" className=" text-sm">
                  Confirm Password
                </Label>
              </div>
              <Input type="password" required name="cPassword" id="cPassword" className="input sz-md variant-mixed" />
            </div>

            <Button className="w-full">Register Account</Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <Link to="#">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
