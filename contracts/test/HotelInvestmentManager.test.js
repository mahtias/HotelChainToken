const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HotelInvestmentManager", function () {
  let hotelAssetToken;
  let hotelInvestmentManager;
  let owner;
  let investor1;
  let investor2;
  let hotelAssetId;
  let poolId;

  beforeEach(async function () {
    [owner, investor1, investor2] = await ethers.getSigners();

    // Deploy HotelAssetToken
    const HotelAssetToken = await ethers.getContractFactory("HotelAssetToken");
    hotelAssetToken = await HotelAssetToken.deploy();
    await hotelAssetToken.deployed();

    // Deploy HotelInvestmentManager
    const HotelInvestmentManager = await ethers.getContractFactory("HotelInvestmentManager");
    hotelInvestmentManager = await HotelInvestmentManager.deploy(hotelAssetToken.address);
    await hotelInvestmentManager.deployed();

    // Mint a hotel asset
    const tx = await hotelAssetToken.mintHotelAsset(
      owner.address,
      "Test Hotel",
      "Test Location",
      "luxury",
      ethers.utils.parseEther("1000"),
      100,
      450,
      "https://test.com/metadata"
    );
    const receipt = await tx.wait();
    hotelAssetId = receipt.events[0].args.tokenId;
  });

  describe("Investment Pool Creation", function () {
    it("Should create an investment pool", async function () {
      const tx = await hotelInvestmentManager.createInvestmentPool(
        hotelAssetId,
        "Test Hotel Shares",
        "THS",
        ethers.utils.parseEther("100"), // funding goal
        ethers.utils.parseEther("1"), // min investment
        ethers.utils.parseEther("10"), // max investment
        1000, // 10% expected return
        30 * 24 * 60 * 60, // 30 days
        ethers.utils.parseEther("0.01") // price per token
      );
      
      const receipt = await tx.wait();
      poolId = receipt.events[0].args.poolId;
      
      const pool = await hotelInvestmentManager.getInvestmentPool(poolId);
      expect(pool.hotelAssetId).to.equal(hotelAssetId);
      expect(pool.hotelName).to.equal("Test Hotel");
      expect(pool.isActive).to.be.true;
    });

    it("Should fail to create pool for non-owned asset", async function () {
      // Transfer the asset to investor1
      await hotelAssetToken.transferFrom(owner.address, investor1.address, hotelAssetId);
      
      await expect(
        hotelInvestmentManager.createInvestmentPool(
          hotelAssetId,
          "Test Hotel Shares",
          "THS",
          ethers.utils.parseEther("100"),
          ethers.utils.parseEther("1"),
          ethers.utils.parseEther("10"),
          1000,
          30 * 24 * 60 * 60,
          ethers.utils.parseEther("0.01")
        )
      ).to.be.revertedWith("Must own hotel asset to create investment pool");
    });
  });

  describe("Investment", function () {
    beforeEach(async function () {
      // Create an investment pool
      const tx = await hotelInvestmentManager.createInvestmentPool(
        hotelAssetId,
        "Test Hotel Shares",
        "THS",
        ethers.utils.parseEther("100"),
        ethers.utils.parseEther("1"),
        ethers.utils.parseEther("10"),
        1000,
        30 * 24 * 60 * 60,
        ethers.utils.parseEther("0.01")
      );
      
      const receipt = await tx.wait();
      poolId = receipt.events[0].args.poolId;
    });

    it("Should allow investment in hotel pool", async function () {
      const investmentAmount = ethers.utils.parseEther("5");
      
      await hotelInvestmentManager.connect(investor1).investInHotel(poolId, {
        value: investmentAmount
      });
      
      const pool = await hotelInvestmentManager.getInvestmentPool(poolId);
      expect(pool.currentFunding).to.equal(investmentAmount);
      
      const userInvestments = await hotelInvestmentManager.getUserInvestments(investor1.address);
      expect(userInvestments.length).to.equal(1);
      expect(userInvestments[0]).to.equal(poolId);
    });

    it("Should fail investment below minimum", async function () {
      const investmentAmount = ethers.utils.parseEther("0.5"); // Below minimum
      
      await expect(
        hotelInvestmentManager.connect(investor1).investInHotel(poolId, {
          value: investmentAmount
        })
      ).to.be.revertedWith("Below minimum investment");
    });

    it("Should track multiple investors", async function () {
      await hotelInvestmentManager.connect(investor1).investInHotel(poolId, {
        value: ethers.utils.parseEther("5")
      });
      
      await hotelInvestmentManager.connect(investor2).investInHotel(poolId, {
        value: ethers.utils.parseEther("3")
      });
      
      const pool = await hotelInvestmentManager.getInvestmentPool(poolId);
      expect(pool.currentFunding).to.equal(ethers.utils.parseEther("8"));
      
      const stats = await hotelInvestmentManager.getPlatformStats();
      expect(stats.totalInvestorsCount).to.equal(2);
    });
  });

  describe("Portfolio Management", function () {
    beforeEach(async function () {
      // Create pool and make investments
      const tx = await hotelInvestmentManager.createInvestmentPool(
        hotelAssetId,
        "Test Hotel Shares",
        "THS",
        ethers.utils.parseEther("100"),
        ethers.utils.parseEther("1"),
        ethers.utils.parseEther("10"),
        1000,
        30 * 24 * 60 * 60,
        ethers.utils.parseEther("0.01")
      );
      
      const receipt = await tx.wait();
      poolId = receipt.events[0].args.poolId;
      
      await hotelInvestmentManager.connect(investor1).investInHotel(poolId, {
        value: ethers.utils.parseEther("5")
      });
    });

    it("Should provide portfolio summary", async function () {
      const portfolio = await hotelInvestmentManager.getUserPortfolioSummary(investor1.address);
      
      expect(portfolio.totalInvestment).to.equal(ethers.utils.parseEther("5"));
      expect(portfolio.numberOfInvestments).to.equal(1);
    });

    it("Should provide investment details", async function () {
      const details = await hotelInvestmentManager.getUserInvestmentDetails(investor1.address, poolId);
      
      expect(details.investmentAmount).to.equal(ethers.utils.parseEther("5"));
      expect(details.tokenBalance).to.equal(ethers.utils.parseEther("500")); // 5 ETH / 0.01 ETH per token
    });
  });
});