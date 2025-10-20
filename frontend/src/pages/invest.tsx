import { Card } from "@/components/ui/card";
import React from "react";

export default function invest() {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h3 className="text-2xl  font-bold mb-4 text-dark"> Tokenization Real-World Assets</h3>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">    
        <Card className="p-10 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-dark">Tokenized Assets</h2>
          <p className="text-neutral-700">
            Explore our diverse portfolio of tokenized real-world assets, including hotel 
            properties and room inventories. Invest with as little as $1 and earn passive yields 
            of 6-10% APY backed by verifiable rental income.
          </p>
          <p className="text-neutral-700 mt-4">
            Our assets are fully compliant with regulations and undergo rigorous due
             diligence to ensure transparency and security for our investors.
            Tokenized RWAs encompass a wide range of assets including real estate, government 
            and corporate bonds, commodities (gold, oil), fine art, intellectual property, 
            and private credit. Each token represents a fraction or full ownership of the 
            underlying asset, granting rights proportional to the holder’s share. This concept
             bridges traditional finance (TradFi) and decentralized finance (DeFi) by bringing 
             off-chain assets onto blockchain 
            ledgers, where transparency and immutability enhance trust and accessibility.
          </p> 
        </Card>

       <Card className="p-10 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-dark"> How Tokenization Works?</h2>
        <p className="text-neutral-700 mt-4">
          
        The process of tokenizing real-world assets involves several key stages:

        Asset Selection and Legal Validation: Verifying ownership, assessing asset value, 
         and ensuring proper legal documentation linking the asset to its token.

        Information Conversion: Translating asset data into digital metadata managed via 
        blockchain oracles (like Chainlink Proof of Reserve) for verification.​

        Token Minting and Issuance: Creating fungible (ERC-20) or non-fungible (ERC-721) tokens governed 
        by smart contracts, specifying ownership rights, and launching them on a blockchain.

        Trading and Management: Once issued, tokens can be traded, lent, or collateralized 
        within DeFi platforms or secondary markets, while smart contracts automate profit-sharing or governance.
          </p>
           </Card>
           <Card className="p-10 shadow-md">
             <h2 className="text-2xl font-bold mb-4 text-dark">Benefits of Tokenized RWAs</h2>
          <p className="text-neutral-700">
           Increased Liquidity: Enables fractional ownership, allowing investors to trade small portions 
           of high-value assets such as real estate or art.

          Greater Accessibility: Opens investment opportunities to a broader audience, including retail 
          investors who typically cannot afford entry into traditional markets.​

          Transparency & Security: Every transaction is recorded immutably on the blockchain,
           reducing fraud and ensuring traceable ownership history.

          24/7 Global Trading: Unlike traditional financial markets, tokenized assets are 
          tradable any time across international boundaries.

          Operational Efficiency: Streamlined asset issuance, settlement, and management 
          through smart contracts eliminate intermediaries and reduce costs.​
          </p>
           </Card>
          
       
         
         <Card className="p-10 shadow-md">
         
          <h2 className="text-2xl font-bold mb-4 text-dark"> Risks and Challenges</h2>
<p className="text-neutral-700 mt-4">
   Despite its benefits, RWA tokenization faces regulatory, technical, and market challenges:

   Regulatory Oversight: Global jurisdictions differ in licensing,
    taxation, and compliance requirements for digital securities.

   Custody and Legal Ownership: Establishing enforceable legal 
   frameworks for blockchain-registered ownership is still evolving.

   Price Volatility and Liquidity Gaps: Low secondary market activity 
   can affect token value stability in early-stage ecosystems.

   Cybersecurity Risks: Smart contract vulnerabilities and oracle manipulation 
   remain ongoing concerns.​
 </p>
    </Card>
    <Card className="p-10 shadow-md">
 <h2 className="text-2xl font-bold mb-4 text-dark"> The Future of Tokenized RWAs</h2>
<p className="text-neutral-700 mt-4" >
 According to financial research, tokenized RWA markets surpassed $13.5 billion by 2024 and are projected
 to reach $2 trillion by 2030 as major institutions adopt the technology. BlackRock, Franklin Templeton,
 and JPMorgan are piloting RWA tokenization platforms linking blockchain-based assets with traditional 
 finance systems. Platforms like Chainlink CCIP and Hyperledger Besu are enabling multi-chain interoperability,
 while decentralized proofing mechanisms ensure transparency and reliability. Ultimately, tokenized RWAs are positioned 
 to redefine global finance, creating a seamless hybrid between conventional markets and the programmable digital economy.​
 In essence, Tokenized Real-World Assets transform real physical and financial ownership 
 into programmable digital assets, enabling a more inclusive, transparent, and efficient global 
 financial ecosystem that aligns with the principles of decentralized finance.
</p>
        
 </Card>    
 <Card className="p-10 shadow-md">
 <h2 className="text-2xl font-bold mb-4 text-dark"> Technologies that ensure security in Tokenized Real-World Asset (RWA) platforms </h2>
<p className="text-neutral-700 mt-4" >
 Smart Contracts: These automate asset management, enforce ownership rules, execute transactions, and ensure
  regulatory compliance without manual intervention. Smart contracts can automatically handle payments, 
 transfer restrictions, and compliance checks, reducing errors and fraud while maintaining transparency.<br/>​

Oracles and Proof of Reserve: Oracle networks such as Chainlink provide secure and decentralized feeds
 of off-chain asset data (e.g., property valuation, gold reserves) to the blockchain, verifying that digital
  tokens are backed by actual assets. Proof of Reserve mechanisms cryptographically guarantee that token minting 
  is always collateralized, preventing infinite minting attacks and boosting trustworthiness.​


</p>
        
 </Card> 

        
          </div>
          <br/>
          
            <img src="/assets/images/rwa.png" alt="Invest Image 1" className="w-full h-auto mb-4 rounded-lg" />
           <br/>
        <img src="/assets/images/chainlink1.jpg" alt="Invest Image 1" className="w-full h-auto mb-4 rounded-lg" />
        </div>
        
      </div>
    );
  
}
  //const { portfolio, investments = [] } = portfolioData || {};