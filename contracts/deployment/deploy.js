const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying HotelVest smart contracts...");
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy HotelAssetToken (NFT for hotel assets)
  console.log("\n1. Deploying HotelAssetToken...");
  const HotelAssetToken = await ethers.getContractFactory("HotelAssetToken");
  const hotelAssetToken = await HotelAssetToken.deploy();
  await hotelAssetToken.deployed();
  console.log("HotelAssetToken deployed to:", hotelAssetToken.address);

  // Deploy ChainlinkPriceOracle
  console.log("\n2. Deploying ChainlinkPriceOracle...");
  const ChainlinkPriceOracle = await ethers.getContractFactory("ChainlinkPriceOracle");
  const chainlinkPriceOracle = await ChainlinkPriceOracle.deploy();
  await chainlinkPriceOracle.deployed();
  console.log("ChainlinkPriceOracle deployed to:", chainlinkPriceOracle.address);

  // Deploy HotelInvestmentManager
  console.log("\n3. Deploying HotelInvestmentManager...");
  const HotelInvestmentManager = await ethers.getContractFactory("HotelInvestmentManager");
  const hotelInvestmentManager = await HotelInvestmentManager.deploy(hotelAssetToken.address, chainlinkPriceOracle.address);
  await hotelInvestmentManager.deployed();
  console.log("HotelInvestmentManager deployed to:", hotelInvestmentManager.address);

  // Deploy HotelRoyaltyManager
  console.log("\n4. Deploying HotelRoyaltyManager...");
  const HotelRoyaltyManager = await ethers.getContractFactory("HotelRoyaltyManager");
  const hotelRoyaltyManager = await HotelRoyaltyManager.deploy(hotelInvestmentManager.address);
  await hotelRoyaltyManager.deployed();
  console.log("HotelRoyaltyManager deployed to:", hotelRoyaltyManager.address);

  // Mint sample hotel assets
  console.log("\n5. Minting sample hotel assets...");
  
  const sampleHotels = [
    {
      name: "Ocean Vista Resort",
      location: "Maldives",
      type: "luxury",
      value: ethers.utils.parseEther("8200"), // $8.2M equivalent
      rooms: 145,
      rating: 480, // 4.8/5 stars
      tokenURI: "https://api.hotelvest.com/metadata/ocean-vista-resort"
    },
    {
      name: "Manhattan Business Hub",
      location: "New York, NY",
      type: "business",
      value: ethers.utils.parseEther("15700"), // $15.7M equivalent
      rooms: 287,
      rating: 460, // 4.6/5 stars
      tokenURI: "https://api.hotelvest.com/metadata/manhattan-business-hub"
    },
    {
      name: "Le Petit Château",
      location: "Paris, France",
      type: "boutique",
      value: ethers.utils.parseEther("4800"), // $4.8M equivalent
      rooms: 62,
      rating: 490, // 4.9/5 stars
      tokenURI: "https://api.hotelvest.com/metadata/le-petit-chateau"
    }
  ];

  const hotelAssetIds = [];
  for (let i = 0; i < sampleHotels.length; i++) {
    const hotel = sampleHotels[i];
    const tx = await hotelAssetToken.mintHotelAsset(
      deployer.address,
      hotel.name,
      hotel.location,
      hotel.type,
      hotel.value,
      hotel.rooms,
      hotel.rating,
      hotel.tokenURI
    );
    const receipt = await tx.wait();
    const tokenId = receipt.events[0].args.tokenId;
    hotelAssetIds.push(tokenId);
    console.log(`Minted hotel asset: ${hotel.name} (Token ID: ${tokenId})`);
  }

  // Create investment pools
  console.log("\n6. Creating investment pools...");
  
  const investmentPools = [
    {
      tokenName: "Ocean Vista Resort Shares",
      tokenSymbol: "OVRS",
      fundingGoal: ethers.utils.parseEther("1000"), // $1M funding goal
      minInvestment: ethers.utils.parseEther("2.5"), // $2,500 minimum
      maxInvestment: ethers.utils.parseEther("100"), // $100,000 maximum
      expectedReturn: 1250, // 12.5% (in basis points)
      fundingDuration: 30 * 24 * 60 * 60, // 30 days
      pricePerToken: ethers.utils.parseEther("0.001") // $1 per token
    },
    {
      tokenName: "Manhattan Business Hub Shares",
      tokenSymbol: "MBHS",
      fundingGoal: ethers.utils.parseEther("2000"), // $2M funding goal
      minInvestment: ethers.utils.parseEther("5"), // $5,000 minimum
      maxInvestment: ethers.utils.parseEther("200"), // $200,000 maximum
      expectedReturn: 980, // 9.8% (in basis points)
      fundingDuration: 45 * 24 * 60 * 60, // 45 days
      pricePerToken: ethers.utils.parseEther("0.001") // $1 per token
    },
    {
      tokenName: "Le Petit Château Shares",
      tokenSymbol: "LPCS",
      fundingGoal: ethers.utils.parseEther("800"), // $800K funding goal
      minInvestment: ethers.utils.parseEther("1.5"), // $1,500 minimum
      maxInvestment: ethers.utils.parseEther("50"), // $50,000 maximum
      expectedReturn: 1120, // 11.2% (in basis points)
      fundingDuration: 60 * 24 * 60 * 60, // 60 days
      pricePerToken: ethers.utils.parseEther("0.001") // $1 per token
    }
  ];

  const poolIds = [];
  for (let i = 0; i < investmentPools.length; i++) {
    const pool = investmentPools[i];
    const tx = await hotelInvestmentManager.createInvestmentPool(
      hotelAssetIds[i],
      pool.tokenName,
      pool.tokenSymbol,
      pool.fundingGoal,
      pool.minInvestment,
      pool.maxInvestment,
      pool.expectedReturn,
      pool.fundingDuration,
      pool.pricePerToken
    );
    const receipt = await tx.wait();
    const poolId = receipt.events[0].args.poolId;
    poolIds.push(poolId);
    console.log(`Created investment pool: ${pool.tokenName} (Pool ID: ${poolId})`);
  }

  // Create revenue streams
  console.log("\n7. Creating revenue streams...");
  
  for (let i = 0; i < poolIds.length; i++) {
    const distributionFrequency = 30 * 24 * 60 * 60; // 30 days
    const platformFee = 500; // 5% platform fee
    
    await hotelRoyaltyManager.createRevenueStream(
      poolIds[i],
      distributionFrequency,
      platformFee
    );
    console.log(`Created revenue stream for Pool ID: ${poolIds[i]}`);
  }

  // Print deployment summary
  console.log("\n" + "=".repeat(60));
  console.log("DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log("HotelAssetToken:", hotelAssetToken.address);
  console.log("ChainlinkPriceOracle:", chainlinkPriceOracle.address);
  console.log("HotelInvestmentManager:", hotelInvestmentManager.address);
  console.log("HotelRoyaltyManager:", hotelRoyaltyManager.address);
  console.log("\nHotel Asset Token IDs:", hotelAssetIds);
  console.log("Investment Pool IDs:", poolIds);
  console.log("\nDeployment completed successfully!");
  
  // Save deployment addresses for frontend integration
  const deploymentData = {
    network: "localhost", // or process.env.HARDHAT_NETWORK
    contracts: {
      HotelAssetToken: hotelAssetToken.address,
      ChainlinkPriceOracle: chainlinkPriceOracle.address,
      HotelInvestmentManager: hotelInvestmentManager.address,
      HotelRoyaltyManager: hotelRoyaltyManager.address
    },
    hotelAssets: hotelAssetIds,
    investmentPools: poolIds,
    deployedAt: new Date().toISOString()
  };
  
  const fs = require("fs");
  fs.writeFileSync(
    "./deployment-addresses.json",
    JSON.stringify(deploymentData, null, 2)
  );
  console.log("\nDeployment addresses saved to deployment-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });