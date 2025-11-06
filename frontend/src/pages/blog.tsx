import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Leveraged Yield Loop with VBILL in Aave’s Horizon RWA Market",
    imageUrl: "/assets/images/blog1.jpg",
    link: "#",
  },
  {
    id: 2,
    title:
      "Securitize and VanEck Bring VBILL to Aave Horizon and Adopt Chainlink NAVLink Feeds",
    imageUrl: "/assets/images/blog2.jpg",
    link: "#",
  },
  {
    id: 3,
    title:
      "HLSCOPE Gains Instant RLUSD Liquidity by Composing with VBILL’s RWA Assets",
    imageUrl: "/assets/images/blog3.jpg",
    link: "#",
  },
];

export default function Blog() {
  return ( 
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
          <Card className="p-10 shadow-md">
             <h3 className="text-2xl text-center font-bold mb-4 text-dark">Blog</h3>
             </Card>
        <h1 className="text-3xl text-center font-bold text-neutral-900 mb-8">
          Real World Asset (RWA) Hotel News
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden shadow-md hover:shadow-xl transition border border-neutral-200 rounded-2xl"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3 line-clamp-3">
                  {post.title}
                </h3>
                <a
                  href={post.link}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  Read More →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden shadow-md hover:shadow-xl transition border border-neutral-200 rounded-2xl"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3 line-clamp-3">
                  {post.title}
                </h3>
                <a
                  href={post.link}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  Read More →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
