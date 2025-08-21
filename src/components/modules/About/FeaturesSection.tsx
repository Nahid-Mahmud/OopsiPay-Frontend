import CashOutIcon from "@/assets/icons/cash-out.png";
import InstantTransfer from "@/assets/icons/instant.png";
import ReceiveMoney from "@/assets/icons/receive_money.png";
import SendMoney from "@/assets/icons/send-money.png";
import AddMoney from "@/assets/icons/deposit.png";
import Secure from "@/assets/icons/insurance.png";

const Features = [
  {
    icon: CashOutIcon,
    title: "Cash Out",
    description: "Cash out your funds to your bank account or mobile wallet instantly.",
  },
  {
    icon: SendMoney,
    title: "Send Money",
    description: "Send money to anyone, anywhere, instantly.",
  },
  {
    icon: ReceiveMoney,
    title: "Receive Money",
    description: "Receive money from anyone, anywhere, instantly.",
  },
  {
    icon: InstantTransfer,
    title: "Instant Transfer",
    description: "Transfer money instantly to anyone, anywhere.",
  },
  {
    icon: AddMoney,
    title: "Add Money",
    description: "Add money to your wallet from your bank account or credit card.",
  },
  {
    icon: Secure,
    title: "Secure",
    description: "Your transactions are protected with bank-level security.",
  },
];

export default function FeaturesSection() {
  return (
    <div>
      <section className="py-10  mx-auto max-w-6xl space-y-12 px-5 md:px-0">
        <div className="space-y-4">
          <h2 className="md:text-4xl text-xl font-bold text-center">Your Complete Payment Solution</h2>
          <p className="text-lg text-muted-foreground text-center max-w-lg mx-auto">
            From daily transactions to international transfers, SwiftPay makes managing your money effortless.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Features.map((feature, index) => (
            <div
              key={index}
              className="group hover:shadow-xl border   rounded-md transition-all cursor-pointer  duration-300  shadow-none hover:border hover:border-green-400"
            >
              <div className="flex flex-col items-center text-center p-6 space-y-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  width={100}
                  height={100}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
