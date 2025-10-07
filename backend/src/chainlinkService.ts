import { ethers } from "ethers";

// Chainlink Price Feed Contract ABI (minimal for price feeds)
const CHAINLINK_PRICE_FEED_ABI = [
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "price", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

// Chainlink Price Feed addresses (Ethereum mainnet)
const PRICE_FEED_ADDRESSES = {
  ETH: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH/USD
  BTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c", // BTC/USD
  LINK: "0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c", // LINK/USD
  USDC: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6", // USDC/USD
  USDT: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D", // USDT/USD
  DAI: "0xAed0c38402d19D19b40A5e30deBe78FB6d3e8F13", // DAI/USD
  MATIC: "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676", // MATIC/USD
  AVAX: "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7", // AVAX/USD
  BNB: "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A", // BNB/USD
  ADA: "0xAE48c91dF1fE419994FFDa27da09D5aC69c30f55", // ADA/USD
};

// Fallback prices (in case Chainlink is not available)
const FALLBACK_PRICES = {
  ETH: 3200,
  BTC: 67000,
  LINK: 14,
  USDC: 1,
  USDT: 1,
  DAI: 1,
  MATIC: 0.85,
  AVAX: 38,
  BNB: 315,
  ADA: 0.45,
};

interface PriceData {
  symbol: string;
  price: number;
  decimals: number;
  updatedAt: number;
  source: "chainlink" | "fallback";
}

export class ChainlinkService {
  private provider: ethers.JsonRpcProvider;
  private priceCache: Map<string, { data: PriceData; timestamp: number }> =
    new Map();
  private readonly CACHE_DURATION = 300000; // 5 minutes

  constructor() {
    // Initialize with a public RPC provider
    this.provider = new ethers.JsonRpcProvider(
      process.env.ETHEREUM_RPC_URL ||
        "https://eth-mainnet.g.alchemy.com/v2/demo"
    );
  }

  async getPrice(symbol: string): Promise<PriceData> {
    const upperSymbol = symbol.toUpperCase();

    // Check cache
    const cached = this.priceCache.get(upperSymbol);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const priceData = await this.fetchChainlinkPrice(upperSymbol);
      this.priceCache.set(upperSymbol, { data: priceData, timestamp: Date.now() });
      return priceData;
    } catch (error) {
      console.error(`Error fetching Chainlink price for ${upperSymbol}:`, error);
      return this.getFallbackPrice(upperSymbol);
    }
  }

  async getMultiplePrices(symbols: string[]): Promise<PriceData[]> {
    return Promise.all(symbols.map((s) => this.getPrice(s)));
  }

  private async fetchChainlinkPrice(symbol: string): Promise<PriceData> {
    const feedAddress = PRICE_FEED_ADDRESSES[symbol as keyof typeof PRICE_FEED_ADDRESSES];
    if (!feedAddress) throw new Error(`No Chainlink price feed for ${symbol}`);

    const priceFeedContract = new ethers.Contract(
      feedAddress,
      CHAINLINK_PRICE_FEED_ABI,
      this.provider
    );

    const [roundId, price, startedAt, updatedAt, answeredInRound] =
      await priceFeedContract.latestRoundData();

    const decimals: number = await priceFeedContract.decimals();
    const humanReadablePrice = Number(ethers.formatUnits(price, decimals));

    return {
      symbol,
      price: humanReadablePrice,
      decimals,
      updatedAt: Number(updatedAt),
      source: "chainlink",
    };
  }

  private getFallbackPrice(symbol: string): PriceData {
    const fallbackPrice = FALLBACK_PRICES[symbol as keyof typeof FALLBACK_PRICES];
    if (!fallbackPrice) throw new Error(`No fallback price for ${symbol}`);

    return {
      symbol,
      price: fallbackPrice,
      decimals: 8,
      updatedAt: Date.now(),
      source: "fallback",
    };
  }

  async convertUSDToETH(usdAmount: number): Promise<number> {
    const ethPrice = await this.getPrice("ETH");
    return usdAmount / ethPrice.price;
  }

  async convertETHToUSD(ethAmount: number): Promise<number> {
    const ethPrice = await this.getPrice("ETH");
    return ethAmount * ethPrice.price;
  }

  async calculatePortfolioValue(holdings: { symbol: string; amount: number }[]) {
    const prices = await this.getMultiplePrices(holdings.map((h) => h.symbol));
    const breakdown = holdings.map((holding, i) => {
      const p = prices[i];
      const valueUSD = holding.amount * p.price;
      return { symbol: holding.symbol, amount: holding.amount, priceUSD: p.price, valueUSD };
    });
    const totalValue = breakdown.reduce((sum, b) => sum + b.valueUSD, 0);
    return { totalValue, breakdown };
  }

  async getMarketData() {
    const mainAssets = ["ETH", "BTC", "LINK", "USDC"];
    const prices = await this.getMultiplePrices(mainAssets);
    const multipliers = { ETH: 120000000, BTC: 19000000, LINK: 617000000, USDC: 32000000000 };
    const marketCap = prices.reduce(
      (sum, p) => sum + p.price * (multipliers[p.symbol as keyof typeof multipliers] || 1_000_000),
      0
    );
    return {
      prices,
      marketCap,
      totalValueLocked: marketCap * 0.15,
      lastUpdated: Date.now(),
    };
  }

  clearCache() {
    this.priceCache.clear();
  }

  getCachedPrices() {
    return Array.from(this.priceCache.entries()).map(([symbol, cached]) => ({
      symbol,
      price: cached.data.price,
      cachedAt: cached.timestamp,
    }));
  }
}

export const chainlinkService = new ChainlinkService();
