import { useEffect, useState } from "react";
import {useAccount,useChainId,useSwitchChain,usePublicClient,} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";

// Minimal ERC-20 ABI for Transfer events
const ERC20_ABI = [
  {
    name: "Transfer",
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
  },
];

// Props interface for type safety
interface Props {
  bookingId: number;
  expectedAmount?: string;
}

export default function VoucherPaymentFlow({
  bookingId,
  expectedAmount = "10",
}: Props) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const publicClient = usePublicClient();

  const [txHash, setTxHash] = useState<string | null>(null);
  const [voucherId, setVoucherId] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "waiting" | "verifying" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  const API_URL = import.meta.env.VITE_API_URL;
  const USDC_ADDRESS = import.meta.env.VITE_USDC_CONTRACT;
  const RECEIVER = import.meta.env.VITE_RECEIVER_WALLET;

  //  Listen for on-chain USDC Transfer events
  useEffect(() => {
  if (!isConnected || !address || !publicClient || !USDC_ADDRESS || !RECEIVER)
    return;

  // Type the ABI event properly
  const unwatch = publicClient.watchContractEvent({
    address: USDC_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
    eventName: "Transfer",
    onLogs: async (logs) => {
      //  Each log is a TypedEventLog, so we can safely destructure `args`
      for (const log of logs as unknown as Array<{
        args: { from: string; to: string; value: bigint };
        transactionHash: string;
      }>) {
        const { from, to, value } = log.args;

        if (
          to?.toLowerCase() === RECEIVER.toLowerCase() &&
          from?.toLowerCase() === address.toLowerCase()
        ) {
          setStatus("verifying");
          setMessage(`Detected payment of ${value.toString()}. Verifying...`);

          try {
            const res = await axios.post(`${API_URL}/api/payments/confirm`, {
              txHash: log.transactionHash,
              bookingId,
              userWallet: address,
            });

            if (res.data.success) {
              setTxHash(log.transactionHash);
              setVoucherId(res.data.voucherId);
              setStatus("success");
              setMessage(" Payment verified & voucher minted!");
            } else {
              setStatus("error");
              setMessage(" Verification failed: " + res.data.message);
            }
          } catch (err: any) {
            setStatus("error");
            setMessage(
              " Error verifying payment: " +
                (err.response?.data?.message || err.message)
            );
          }
        }
      }
    },
  });

  return () => unwatch?.();
}, [isConnected, address, publicClient, chainId]);

  // 💅 UI rendering
  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white rounded-2xl shadow-xl p-6 mt-10 border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-center">
         Voucher Payment Flow
      </h2>

      {!isConnected ? (
        <div className="flex justify-center mb-4">
          <ConnectButton />
        </div>
      ) : (
        <>
          <p className="mb-2 text-sm text-gray-400">Connected: {address}</p>

          {chainId !== 84532 && (
            <button
              onClick={() => switchChain?.({ chainId: 84532 })}
              className="text-blue-400 underline mb-4"
            >
              Switch to Base Sepolia
            </button>
          )}

          {status === "idle" && (
            <p className="text-yellow-400 text-sm mb-3">
               Waiting for USDC transfer to {RECEIVER.slice(0, 8)}... Expected:
              {expectedAmount} USDC
            </p>
          )}

          {status === "verifying" && (
            <p className="text-blue-400 text-sm">{message}</p>
          )}

          {status === "success" && (
            <div className="bg-green-900 text-green-200 p-3 rounded text-center text-sm mt-3">
               Voucher minted successfully! <br />
              <span className="font-bold">Voucher ID: {voucherId}</span> <br />
              <a
                href={`https://sepolia.basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-green-400"
              >
                View on BaseScan
              </a>
            </div>
          )} 

          {status === "error" && (
            <p className="text-red-400 mt-3">{message}</p>
          )}
        </>
      )}
    </div>
  );
}
