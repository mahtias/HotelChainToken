import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


export default function Ecosystem() {
  return (
    <div className="min-h-screen bg-neutral-50">
        <Card className="p-10 shadow-md"> 
          <h1  className="text-2xl font-bold mb-4 text-dark">
            Our Partner Ecosystem 
         </h1>  
             </Card>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold mb-6 text-dark">Blockchain</h3>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/aptos.png"
              alt="Aptos logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Aptos Labs</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Aptos Labs is an independent Layer 1 blockchain platform focused on
                delivering fast, secure, and scalable decentralized applications
                (dApps). It leverages the Move programming language, originally
                developed for the Meta Diem blockchain project.
              </p>
              <Button  variant="outline" className="mt-4 w-fit">Chain</Button>
            </div> 
          </Card>

          {/* CARD 2 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/arthuir.svg"
              alt="Arbitrum logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Arbitrum</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
               Arbitrum is a Layer 2 scaling solution for Ethereum developed by Offchain 
               Labs designed to overcome Ethereum's scalability limitations by increasing
                throughput and reducing transaction fees while maintaining Ethereum's 
                strong security guarantees. </p> <br/>
              <Button  variant="outline" className="mt-4 w-fit">Chain</Button>
            </div>
          </Card>

          {/* CARD 3 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/binance.png"
              alt="binance logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Binace</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                BNB Chain is a scalable and decentralized blockchain ecosystem designed to
                 power Web3 applications through smart contracts, Layer 2 solutions,
                  and decentralized data storage. It emerged from the merging of Binance
                   Chain and Binance Smart Chain.
                    
              </p> <br/>
              <Button  variant="outline" className="mt-4 w-fit">Chain</Button>
            </div>
          </Card>
        </div>
          <br/>
          {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/plume.svg"
              alt="Aptos logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Plume</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Plume Chain is a modular, EVM-compatible public blockchain purpose-built for 
                the tokenization and management of Real-World Assets (RWAs) within decentralized 
                finance (DeFi) ecosystems. It provides a comprehensive stack, including tokenization
                 engines, built-in compliance modules (AML/KYC), smart wallets with custody and 
                 compliance, and a native oracle for asset data. 
              </p>
               <Button  variant="outline" className="mt-4 w-fit">Chain</Button>
            </div>
          </Card>

          {/* CARD 2 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/ethereum.png"
              alt="Ethereum logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Ethereum</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ethereum is a pioneering decentralized blockchain platform launched in 
                2015 by Vitalik Buterin and co-founders, designed to enable programmable 
                smart contracts and decentralized applications (dApps). It expanded blockchain’s
                 role from simple peer-to-peer transactions (as in Bitcoin) to an all-encompassing 
                 “world computer” that can automate complex logic autonomously and transparently without intermediaries. .
              </p>
             <Button  variant="outline" className="mt-4 w-fit">Chain</Button>
            </div>
          </Card>

          {/* CARD 3 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/solana.jpg"
              alt="Chainlink logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Solana</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Solana is a high-performance, permissionless Layer 1 blockchain platform
                 designed to facilitate scalable decentralized applications (dApps) and 
                 crypto projects. It uniquely combines a modified Delegated Proof of Stake
                  (dPoS) consensus mechanism with its innovative Proof of History (PoH) algorithm,
                 which acts as a cryptographic clock to order transactions efficiently.
              </p>
               <Button  variant="outline" className="mt-4 w-fit">Chain</Button>
            </div>
          </Card>
        </div>

       
      </div>



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold mb-6 text-dark"> Custodians & Exchanges</h3>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/anchor.png"
              alt="Aptos logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Anchorage Digital</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Anchorage Digital is a leading regulated digital asset platform that provides 
                institutional solutions for crypto custody, staking, trading, governance, and 
                settlement. Founded in 2017 and headquartered in San Francisco, it is renowned as
                 the first federally chartered cryptocurrency bank in the United States, a status
                  granted by the Office of the Comptroller of the Currency in 2021.
              </p>
            <Button  variant="ghost" className="mt-4 w-fit">Custody</Button>
            </div>
          </Card>

          {/* CARD 2 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/Bigo.png"
              alt="Ethereum logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">BitGo</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                BitGo is a leading digital asset infrastructure and security company 
                founded in 2013, headquartered in Palo Alto, California. It specializes
                 in providing institutional-grade cryptocurrency custody, wallet,
                  trading, and settlement solutions. BitGo pioneered multi-signature 
                  wallet technology, which enhances security by requiring multiple keys
                   to authorize transactions.
              </p>
                 <Button  variant="ghost" className="mt-4 w-fit">Custody</Button>
            </div>
          </Card>

          {/* CARD 3 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/coper.png"
              alt="copper logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Copper</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Copper is a leading technology company specializing in secure digital 
                asset custody, collateral management, and prime brokerage services aimed
                 at institutional investors. Founded in 2018 and headquartered in Zug, 
                 Switzerland, Copper provides a comprehensive platform that enables its 
                 clients—including hedge funds, exchange-traded product (ETP) providers
              </p> <br/>
            <Button  variant="ghost" className="mt-4 w-fit">Custody</Button>
            </div>
          </Card>
        </div>
          <br/>
          {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/crypto.png"
              alt="Aptos logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Crypto.com</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Crypto.com is a global cryptocurrency platform founded in 2016, known
                 for offering a comprehensive suite of digital asset services, including a 
                 cryptocurrency exchange, wallet, payment solutions, staking, and decentralized
                  finance (DeFi) 
                products. With over 100 million global users as of mid-2024.
              </p>
             <Button  variant="default" className="mt-4 w-fit">Exchange</Button>
            </div>
              
          </Card>

          {/* CARD 2 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/deribit.png"
              alt="Ethereum logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Deribit</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
               Deribit is a leading cryptocurrency derivatives exchange founded in 2016,
                primarily known for its futures and options trading on Bitcoin (BTC) and 
                Ethereum (ETH). Headquartered in Dubai, Deribit offers a sophisticated platform
                 tailored for professional traders, providing high liquidity. 
              </p>
                     <Button  variant="default" className="mt-4 w-fit">Exchange</Button>
            </div>
          </Card>

          {/* CARD 3 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/firblock.png"
              alt="Chainlink logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Fireblocks</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
               Fireblocks is a leading digital asset security platform founded in 2017
                that provides institutional-grade infrastructure for managing, transferring,
                 and securing cryptocurrencies and tokenized assets. It is widely trusted by 
                 traditional financial institutions.
              </p> <br/>
                <Button  variant="ghost" className="mt-4 w-fit">Custody</Button>
            </div>
             
          </Card>
        </div>
      </div>


         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold mb-6 text-dark"> DeFi Protocols</h3>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/agora.png"
              alt="Aptos logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Agora</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Agora is a digital finance platform that focuses 
                on enabling companies to launch white-labeled, branded stablecoins using its 
                infrastructure. One of its flagship products is AUSD, a 1:1 digital dollar 
                stablecoin backed by cash, U.S. Treasury bills, and other safe instruments, 
                designed for global and institutional use.
              </p>
               <Button  variant="destructive" className="mt-4 w-fit">DeFi</Button>
            </div>
          </Card>

          {/* CARD 2 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/drift.png"
              alt="Ethereum logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Drift</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Drift is a decentralized exchange (DEX) built on the Solana blockchain
                 that specializes in perpetual futures and spot trading with up to 10x 
                 leverage. It enables fully on-chain, transparent, and non-custodial
                  trading where users maintain control of their assets without 
                  intermediaries.
              </p> <br/>
               <Button  variant="destructive" className="mt-4 w-fit">DeFi</Button>
            </div>
          </Card>

          {/* CARD 3 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/Elixir.png"
              alt="Chainlink logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Elixir</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Elixir is a cryptocurrency and decentralized finance (DeFi) platform
                 focused on enabling peer-to-peer lending, payments, and real-world 
                 asset liquidity through blockchain technology. It operates with the 
                 native ELX token, an ERC-20 token on Ethereum, which powers the 
                 ecosystem
              </p> <br/>
              <Button  variant="destructive" className="mt-4 w-fit">DeFi</Button>
            </div>
          </Card>
        </div>
          <br/>
          {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/Zero.png"
              alt="Aptos logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Zero Hash</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
               Zero Hash is a leading cryptocurrency infrastructure provider focused on
                enabling enterprises to seamlessly integrate crypto, stablecoin, and tokenized
                 asset solutions into their platforms. It offers end-to-end APIs and embeddable
                  developer toolkits that power crypto trading, payments, account funding, 
                  remittances, staking, and tokenization for large 
               financial institutions, fintechs, and brokerages worldwide
              </p>
                <Button  variant="destructive" className="mt-4 w-fit">DeFi</Button>
            </div>
          </Card>

          {/* CARD 2 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/velo.png"
              alt="Ethereum logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Velo</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
            Velo is a blockchain-based financial infrastructure platform designed to 
            modernize cross-border payments and digital credit issuance. Built on the 
            Stellar and Nova blockchains, Velo provides fast, secure, and low-cost transfer
             of value globally. 
              </p> <br/><br/>
                 <Button  variant="destructive" className="mt-4 w-fit">DeFi</Button>
            </div>
          </Card>

          {/* CARD 3 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/ethna.png"
              alt="Chainlink logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Ethena</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ethena is a decentralized finance (DeFi) protocol built on the Ethereum blockchain
                 that offers a synthetic dollar stablecoin called USDe. USDe is pegged 1:1 to the
                  US dollar but is backed by overcollateralized cryptocurrency deposits, such as
                   staked Ethereum (stETH), and uses sophisticated delta-hedging strategies with
                    derivatives to maintain price stability in volatile markets
              </p>
                    <Button  variant="destructive" className="mt-4 w-fit">DeFi</Button>
              
            </div>
          </Card>
        </div>
      </div>


         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold mb-6 text-dark"> Oracles</h3>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CARD 1 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/Chainlink-logo.png"
              alt="Aptos logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Chainlink</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
              Chainlink is a decentralized oracle network that enables smart contracts on various
               blockchains to securely access and interact with real-world data, APIs, and external systems. 
               It solves the critical “oracle problem” by providing reliable, tamper-proof 
               off-chain data inputs to on-chain smart contracts through a decentralized network
                of independent oracle nodes. 
              </p>
                <Button  variant="secondary" className="mt-4 w-fit">Oracle</Button>
            </div>
          </Card>

          {/* CARD 2 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/apro.png"
              alt="apro logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">Apro</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                APRO is an innovative decentralized oracle platform designed to
                 provide highly secure, reliable, and efficient data services primarily
                  focusing on the Bitcoin ecosystem but also supporting multiple major 
                  blockchains, including Ethereum. APRO combines off-chain processing
                   with on-chain verification in a two-layer oracle network architecture
                    that significantly enhances data accuracy.
              </p>
                 <Button  variant="secondary" className="mt-4 w-fit">Oracle</Button>
            </div>
          </Card>

          {/* CARD 3 */}
          <Card className="p-4 shadow-md flex items-start gap-4">
            <img
              src="/assets/images/bny.png"
              alt="BYN logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h4 className="text-lg font-semibold mb-2">BNY</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
              BNY Mellon, also known simply as BNY, is one of the world's largest and oldest 
              financial institutions specializing in asset servicing and custody. It currently
               oversees over $55 trillion in assets under custody and administration, serving
                over 90% of Fortune 100 companies and many of the world's largest banks and 
                pension funds. 
              </p>    <br/>
                  <Button  variant="secondary" className="mt-4 w-fit">Oracle</Button>
            </div>
          </Card>
        </div>
         
      </div>
    </div>
  );
}
