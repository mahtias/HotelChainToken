export {};
declare module "web3modal";
declare global {
  interface Window {
    ethereum?: import("ethers").providers.ExternalProvider;
  }
}