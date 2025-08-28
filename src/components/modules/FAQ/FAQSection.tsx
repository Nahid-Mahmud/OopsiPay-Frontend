import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Getting Started",
    question: "How do I create an OopsiPAY account?",
    answer:
      "Creating an OopsiPAY account is simple and secure. Download the app from your device's app store, click 'Sign Up', and follow the easy steps to verify your identity. You'll need a valid email address and phone number to get started.",
  },
  {
    id: 2,
    category: "Getting Started",
    question: "What documents do I need for verification?",
    answer:
      "For account verification, you'll need a government-issued photo ID (passport, driver's license, or national ID card) and proof of address (utility bill or bank statement from the last 3 months). The verification process typically takes 24-48 hours.",
  },
  {
    id: 3,
    category: "Security",
    question: "How secure is my money with OopsiPAY?",
    answer:
      "Your security is our top priority. We use bank-level encryption, multi-factor authentication, and are regulated by financial authorities. Your funds are protected by deposit insurance, and we never store your sensitive financial information.",
  },
  {
    id: 4,
    category: "Security",
    question: "What should I do if I suspect fraudulent activity?",
    answer:
      "If you notice any suspicious activity, immediately contact our 24/7 fraud hotline, freeze your account through the app's security settings, and report the incident. We'll investigate promptly and protect your account while reviewing the case.",
  },
  {
    id: 5,
    category: "Transactions",
    question: "How long do transfers take?",
    answer:
      "Instant transfers between OopsiPAY users happen in seconds. Bank transfers typically take 1-3 business days, while international transfers can take 1-5 business days depending on the destination country and banking regulations.",
  },
  {
    id: 6,
    category: "Transactions",
    question: "What are the transfer limits?",
    answer:
      "Daily transfer limits vary by account type and verification level. Basic accounts can send up to $1,000 per day, while verified accounts can send up to $10,000 per day. Monthly limits are higher, and business accounts have custom limits.",
  },
  {
    id: 7,
    category: "Fees",
    question: "What fees does OopsiPAY charge?",
    answer:
      "OopsiPAY offers competitive pricing with no hidden fees. Sending money to other OopsiPAY users is free. Bank transfers have a small flat fee, and international transfers have transparent exchange rates with no markup.",
  },
  {
    id: 8,
    category: "Fees",
    question: "Are there any monthly account fees?",
    answer:
      "No, OopsiPAY accounts have no monthly maintenance fees. You only pay for the services you use, such as international transfers or premium features. Basic money management and domestic transfers remain free.",
  },
  {
    id: 9,
    category: "Support",
    question: "How can I contact customer support?",
    answer:
      "Our customer support team is available 24/7 through multiple channels: in-app chat, email support@oopsipay.com, phone hotline, and social media. For urgent security issues, use our priority fraud hotline for immediate assistance.",
  },
  {
    id: 10,
    category: "Support",
    question: "What languages does OopsiPAY support?",
    answer:
      "OopsiPAY is available in over 15 languages including English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Arabic, Chinese, Japanese, Korean, Hindi, and more. You can change your language preference in the app settings.",
  },
];

const categories = ["All", "Getting Started", "Security", "Transactions", "Fees", "Support"];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqData.filter((item) => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const searchMatch =
      searchTerm === "" ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <section className="pt-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Browse through our most common questions and find the answers you need
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-black/50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-blue-600 mb-1">{item.category}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 pr-4">{item.question}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 dark:text-white/50" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-white/50" />
                    )}
                  </div>
                </div>
              </button>

              {openItems.includes(item.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-4">
                    <p className="text-gray-600 dark:text-white/70 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            </div>
            {searchTerm ? (
              <div>
                <p className="text-gray-500 text-lg mb-2">No questions found for "{searchTerm}"</p>
                <p className="text-gray-400 text-sm">Try adjusting your search terms or browse by category</p>
              </div>
            ) : (
              <p className="text-gray-500 text-lg">No questions found for this category.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
