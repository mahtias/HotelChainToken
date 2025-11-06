import { useEffect, useState } from "react";
import VoucherPaymentFlow from "../components/VoucherPayments/VoucherPaymentFlow";
import axios from "axios";

export default function Bookings() {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Example: simulate fetching an active booking
  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await axios.get(`${API_URL}/api/bookings/active`);
        setBooking(res.data.booking);
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading booking...</p>;

  if (!booking)
    return <p className="text-center text-gray-400">No active booking found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-4"> Booking Details</h1>

      <div className="mb-4 text-sm">
        <p>Hotel: {booking.hotelName}</p>
        <p>Check-in: {new Date(booking.checkinDate).toLocaleDateString()}</p>
        <p>Check-out: {new Date(booking.checkoutDate).toLocaleDateString()}</p>
        <p>Amount: {booking.amount} USDC</p>
      </div>

      {/* Integrate voucher payment */}
      <VoucherPaymentFlow bookingId={booking.id} expectedAmount={booking.amount.toString()} />
    </div>
  );
}
