import React from "react";
import { Card } from "@/components/ui/card";
export default function Whitepaper() {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
           <Card className="p-10 shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-dark">DIGIREAL ASSETS Whitepaper</h3>

            <p> DIGIREAL ASSETS is a Hong Kong-based blockchain startup dedicated to transforming the
 hotel industry through Real World Assets(RWA)tokenization.By leveraging blockchain
 technology,we fractionalize hotel properties,room inventories,and revenue streams into
 digital tokens,enabling low-threshold investments starting from as little as $1,passive yields
 of 6-10%Annual Percentage Yield (APY)backed by verifiable real rental income,and
 decentralized autonomous organization(DAO)governance for enhanced community
 participation and transparency.Positioned in Hong Kong,we capitalize on the city's LEAP
 framework (Legal clarity,Expansion of tokenized products,Advanced use cases,Policy
 support),introduced on June 26,2025,which aims to create a unified regulatory regime for
 digital assets and unlock a $24 billion RWA tokenization opportunity in the region.Our
 platform targets the Asia Pacific hotel market,which boasts a robust pipeline of 957,000
 rooms under contract,with a 4.2%year-over-year growth,and Revenue Per Available Room
 (RevPAR)projected to increase by 3.0%in 2025,primarily driven by Average Daily Rate
 (ADR).Globaly,the RWA market has reached approximately $25 billion in Q22025,
 marking a 260%surge from $8.6 billion at the year's start,and is projected to grow to $30
 trillion by 2030,highlighting the immense feasibility and reliability of tokenization in bridging
 traditional assets with blockchain.Our Minimum Viable Product(MVP)will launch with
 essential tokenization features,fully compliant with the Securities and Futures Commission
 (SFC)'s A-S-P-I-Re roadmap released on February 19,2025,and the Digital Asset Policy
 2.0,ensuring high feasibility through streamlined regulations and investor protection.This
 positions DIGIREAL ASSETS to democratize hotel investments,addressing the $4.8 trillion
 global hotel sector's challenges with proven tokenization benefits like 20-50%liquidity
 enhancement and reduced entry barriers.</p>
            </Card>  

<Card className="mt-8 p-10 shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-dark">Whitepaper Download</h3>
<img src="/assets/images/rwa2.png" alt="rwa 2" className="w-full h-auto mb-0 rounded-lg" />
            <p> You can download the full whitepaper <a href="/docs/DRA.pdf" className="text-blue-600 underline" download>here</a>.</p>
            </Card>
            
        </div>
      </div>
    );
  
}
  //const { portfolio, investments = [] } = portfolioData || {};