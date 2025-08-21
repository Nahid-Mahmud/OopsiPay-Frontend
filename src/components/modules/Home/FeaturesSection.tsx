import CashOutIcon from "@/assets/icons/cash-out.png";
import InstantTransfer from "@/assets/icons/instant.png";
import ReceiveMoney from "@/assets/icons/receive_money.png";
import SendMoney from "@/assets/icons/send-money.png";

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
];

export default function FeaturesSection() {
  return (
    <div>
      <section className="py-40 container mx-auto">
        <h2 className="md:text-5xl text-xl font-bold text-center mb-20">Your Complete Payment Solution</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {Features.map((feature, index) => (
            <div
              key={index}
              className="group hover:shadow-xl  rounded-md transition-all cursor-pointer  duration-300  shadow-none hover:border hover:border-green-400"
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
