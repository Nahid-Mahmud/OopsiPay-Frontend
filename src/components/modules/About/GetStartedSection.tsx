export default function GetStartedSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get started in minutes</h2>
          <p className="text-xl text-muted-foreground">Join millions who trust SwiftPay with their money</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent text-black-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold mb-4">Sign Up</h3>
            <p className="text-muted-foreground">
              Create your account with just your Email. Verification takes seconds.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent text-black-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold mb-4">Add Your Details</h3>
            <p className="text-muted-foreground">Complete your profile for seamless money management.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent text-black-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold mb-4">Start Transacting</h3>
            <p className="text-muted-foreground">
              Send money, pay bills, and manage your finances with confidence. Your digital wallet is ready!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
