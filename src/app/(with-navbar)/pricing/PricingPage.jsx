"use client"
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for beginners exploring coding challenges.",
    color: "from-zinc-800 to-zinc-900",
    icon: <Star className="text-zinc-400" />,
    features: [
      "Access to 100+ problems",
      "Basic editor & test cases",
      "Limited daily submissions",
      "Community forum access",
    ],
  },
  {
    name: "Pro",
    price: "₹499 /mo",
    description: "For serious coders who want to level up fast.",
    color: "from-indigo-600 to-indigo-800",
    icon: <Star className="text-indigo-300" />,
    features: [
      "Access to all problems",
      "Detailed solution insights",
      "Priority code execution",
      "Unlimited submissions",
      "AI-powered hints",
    ],
    highlight: true,
  },
  {
    name: "Legend",
    price: "₹999 /mo",
    description: "For the elite who crave mastery and recognition.",
    color: "from-yellow-600 to-yellow-800",
    icon: <Crown className="text-yellow-300" />,
    features: [
      "All Pro features",
      "Early access to new contests",
      "1-on-1 code reviews",
      "Global leaderboard badge",
      "Exclusive Discord access",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Choose Your <span className="text-indigo-400">Path</span> to Mastery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Whether you're just starting or already a beast — pick the plan that
          matches your grind.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Card
              className={`relative bg-gradient-to-b ${
                plan.color
              } border-zinc-700/70 rounded-2xl shadow-lg ${
                plan.highlight ? "scale-105 border-indigo-500/40" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 right-4 bg-indigo-500 text-xs font-semibold px-2 py-1 rounded-md">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center space-y-2">
                <div className="flex justify-center text-4xl">{plan.icon}</div>
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <p className="text-zinc-400">{plan.description}</p>
                <p className="text-3xl font-extrabold mt-4">{plan.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Check className="text-green-400 w-4 h-4" /> {f}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlight ? "default" : "secondary"}
                  className={`w-full mt-6 ${
                    plan.highlight
                      ? "bg-indigo-600 hover:bg-indigo-500"
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                >
                  {plan.highlight ? "Upgrade to Pro" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center mt-16 text-zinc-400 text-sm">
        <p>
          Need a custom team plan?{" "}
          <span className="text-indigo-400 cursor-pointer hover:underline">
            Contact us
          </span>
        </p>
      </div>
    </div>
  );
}
