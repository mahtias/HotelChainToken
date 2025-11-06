export interface Booking {
  id?: number; 
  hotelId: string;
  userWallet: string;
  checkinDate: Date;
  checkoutDate: Date;
  status: "pending" | "confirmed" | "completed";
}
