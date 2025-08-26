import { ArrowDownToLine, ArrowUpFromLine, Send, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaymentType = "CASH_IN" | "CASH_OUT" | "SEND_MONEY" | "ADMIN_CREDIT";
type TRole = "USER" | "AGENT" | "ADMIN" | "SUPER_ADMIN";

interface PaymentOption {
  type: PaymentType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  allowedRoles: TRole[];
}

interface PaymentOptionsProps {
  userRole?: TRole;
  onPaymentSelect?: (type: PaymentType) => void;
  className?: string;
}

const paymentOptions: PaymentOption[] = [
  {
    type: "CASH_IN",
    label: "Cash In",
    icon: ArrowDownToLine,
    description: "Add funds to User wallet",
    allowedRoles: ["AGENT"], // Only agents can use CASH_IN
  },
  {
    type: "CASH_OUT",
    label: "Withdraw",
    icon: ArrowUpFromLine,
    description: "Withdraw to your bank",
    allowedRoles: ["USER"], // Only users can cash out
  },
  {
    type: "SEND_MONEY",
    label: "Send Money",
    icon: Send,
    description: "Transfer to friends",
    allowedRoles: ["USER"], // Only users can send money
  },
  {
    type: "ADMIN_CREDIT",
    label: "Admin Credit",
    icon: Shield,
    description: "Administrative credits",
    allowedRoles: ["ADMIN", "SUPER_ADMIN"], // Only admin and super admin can use admin credit
  },
];

const PaymentOptions = ({ userRole, onPaymentSelect, className }: PaymentOptionsProps) => {
  const handlePaymentClick = (type: PaymentType) => {
    onPaymentSelect?.(type);
  };

  // Filter payment options based on user role
  const filteredOptions = paymentOptions.filter((option) =>
    userRole ? option.allowedRoles.includes(userRole) : false
  );

  // If no role is provided or no options are available, show a message
  if (!userRole) {
    return (
      <div className={cn("space-y-4", className)}>
        <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
        <div className="text-center text-muted-foreground">
          <p>Loading payment options...</p>
        </div>
      </div>
    );
  }

  if (filteredOptions.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
        <div className="text-center text-muted-foreground">
          <p>No payment options available for your role.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-4">
        {filteredOptions.map((option) => {
          const IconComponent = option.icon;

          return (
            <Button
              key={option.type}
              variant="ghost"
              onClick={() => handlePaymentClick(option.type)}
              className={cn(
                "h-auto p-6 flex flex-col items-center gap-3 text-center",
                "bg-gradient-glass backdrop-blur-light border border-white/10",
                "hover:bg-black/80 hover:border-white/20 hover:shadow-glow",
                "transition-all duration-300 group animate-fade-in bg-black/20 hover:text-white/80 cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-full bg-primary/50 text-primary-foreground",
                  "group-hover:bg-primary/60 group-hover:scale-110",
                  "transition-all duration-200"
                )}
              >
                <IconComponent className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-sm">{option.label}</p>
                <p className="md:text-xs text-wrap leading-relaxed">{option.description}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentOptions;
