import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Tokenized() {
  const topics = [
    {
      title: "Tokenized Assets",
      desc: "Explore tokenized hotels and real estate with fractional ownership starting at $1, earning 6–10% APY backed by verified rental income.",
      link: "#",
    },
    {
      title: "How Tokenization Works",
      desc: "Learn how real-world assets are digitized, verified, and issued as blockchain tokens with transparent ownership and compliance.",
      link: "#",
    },
    {
      title: "Benefits of Tokenized RWAs",
      desc: "Tokenization brings liquidity, accessibility, transparency, and 24/7 trading to traditional financial assets through blockchain.",
      link: "#",
    },
    {
      title: "Risks and Challenges",
      desc: "Understand the legal, technical, and market challenges in RWA tokenization — from regulation to custody and cybersecurity.",
      link: "#",
    },
    {
      title: "The Future of Tokenized RWAs",
      desc: "RWA markets are projected to reach $2T by 2030 as institutions like BlackRock and JPMorgan adopt blockchain-based asset platforms.",
      link: "#",
    },
    {
      title: "Security Technologies",
      desc: "Smart contracts, oracles, and proof-of-reserve mechanisms ensure asset transparency, auditability, and collateral verification.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Tokenization of Real-World Assets (RWA)
        </h1>

        {/* Grid of smaller blog-style cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((item, idx) => (
            <Card
              key={idx}
              className="shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden"
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">{item.desc}</p>
                <a
                  href={item.link}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Read More →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Optional supporting image */}
        <div className="mt-12">
          <img
            src="/assets/images/rwa.png"
            alt="Tokenized RWA Overview"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
