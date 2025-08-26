import { useState, useEffect } from "react";
import { Eye, EyeOff, Wifi, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CreditCardProps {
  cardNumber?: string;
  balance?: number;
  cardholderName?: string;
  expiryDate?: string;
  className?: string;
}

const CreditCard = ({
  cardNumber = "4532 1234 5678 9012",
  balance = 12847.5,
  cardholderName = "John Doe",
  expiryDate = "12/27",
  className,
}: CreditCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const toggleVisibility = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    if (!isVisible) {
      setIsVisible(true);
      const id = setTimeout(() => {
        setIsVisible(false);
        setTimeoutId(null);
      }, 5000);
      setTimeoutId(id);
    } else {
      setIsVisible(false);
    }
  };

  const copyCardNumber = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber.replace(/\s/g, ""));
      setIsCopied(true);
      toast.success("Card number copied to clipboard!");

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Could not copy to clipboard");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const formatCardNumber = (number: string, visible: boolean) => {
    if (visible) return number;

    // Extract last 5 digits from the formatted number for 13-digit wallet numbers
    const digits = number.replace(/\s/g, ""); // Remove spaces
    if (digits.length === 13) {
      const lastFive = digits.slice(-5);
      return `•••• •••• ${lastFive}`;
    } else if (digits.length >= 4) {
      const lastFour = digits.slice(-4);
      return `•••• •••• •••• ${lastFour}`;
    }
    return "•••• •••• •••••";
  };

  const formatBalance = (amount: number, visible: boolean) => {
    if (visible) return `৳${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
    return "••••••";
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-md h-56 rounded-3xl p-8 text-foreground",
        "bg-gradient-card backdrop-blur-glass border border-white/10",
        "shadow-glass hover:shadow-glow transition-all duration-300",
        "overflow-hidden group bg-primary/40",
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-glass opacity-50" />

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Top section with balance and visibility toggle */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Available Balance</p>
            <p className={cn("text-2xl font-bold transition-all duration-300", isVisible ? "blur-none" : "blur-sm")}>
              {formatBalance(balance, isVisible)}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVisibility}
            className={cn(
              "h-10 w-10 rounded-full bg-white/10 hover:bg-white/20",
              "border border-white/20 transition-all duration-200",
              "group-hover:scale-105"
            )}
          >
            {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>

        {/* Middle section with card number */}
        <div className="space-y-3">
          <div className="flex justify-between items-center mt-2">
            <Wifi className="h-6 w-6 text-black/80" />
            <div className="text-right">
              <p className="text-xs text-muted-foreground">CONTACTLESS</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div
              className={cn(
                "font-mono text-lg tracking-widest transition-all duration-300 flex-1",
                isVisible ? "blur-none" : "blur-sm"
              )}
            >
              {formatCardNumber(cardNumber, isVisible)}
            </div>
            <Button
              variant="ghost"
              title="Copy card number"
              size="icon"
              onClick={copyCardNumber}
              className={cn(
                "h-5 w-5 rounded-full bg-white/10 hover:bg-white/20",
                "border border-white/20 transition-all duration-200 ml-2",
                "opacity-80 hover:opacity-100"
              )}
            >
              {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Bottom section with name and expiry */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-muted-foreground mb-1">CARDHOLDER</p>
            <p className="text-sm font-semibold uppercase tracking-wide">{cardholderName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">EXPIRES</p>
            <p className="text-sm font-semibold">{expiryDate}</p>
          </div>
        </div>
      </div>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default CreditCard;
