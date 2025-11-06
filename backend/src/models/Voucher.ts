export interface Voucher {
  id?: number;
  bookingId: number;
  voucherTokenId: string;
  issuedAt: Date;
}
