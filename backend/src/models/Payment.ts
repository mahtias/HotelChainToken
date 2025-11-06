export interface Payment {
  id?: number;
  bookingId: number;
  txHash: string;
  amount: number;
  status: "pending" | "confirmed" | "failed";
  createdAt?: Date;
}
