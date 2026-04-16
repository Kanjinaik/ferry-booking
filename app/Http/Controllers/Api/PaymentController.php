<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Razorpay\Api\Api;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * Create Razorpay order
     */
    public function createOrder(Request $request)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        try {
            $order = $api->order->create([
                'receipt'  => 'booking_' . time(),
                'amount'   => $request->amount * 100, // amount in paise
                'currency' => 'INR',
            ]);

            return response()->json([
                'success' => true,
                'order' => $order
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Verify Razorpay payment and create booking
     */
    public function verifyPayment(Request $request)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        try {
            // Verify payment signature
            $attributes = [
                'razorpay_order_id'   => $request->order_id,
                'razorpay_payment_id' => $request->payment_id,
                'razorpay_signature'  => $request->signature,
            ];

            $api->utility->verifyPaymentSignature($attributes);

            // Payment verified ✅, create booking
            $bookingData = $request->booking;

            $booking = Booking::create([
                'user_id'           => Auth::id(),
                'ferry_id'          => $bookingData['ferry_id'],
                'passengers'        => $bookingData['passengers'] ?? 1,
                'adults'            => $bookingData['adults'] ?? 1,
                'children'          => $bookingData['children'] ?? 0,
                'vehicle_type'      => $bookingData['vehicle_type'] ?? 'none',
                'vehicle_count'     => $bookingData['vehicle_count'] ?? 0,
                'special_requests'  => $bookingData['special_requests'] ?? null,
                'total_amount'      => $bookingData['total'],
                'booking_date'      => now(),
                'travel_date'       => $bookingData['travel_date'],
                'status'            => 'confirmed',

                'razorpay_order_id' => $request->order_id,
                'razorpay_payment_id' => $request->payment_id,
                'razorpay_signature'  => $request->signature,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment verified & booking created successfully',
                'booking_id' => $booking->id,
                'booking' => $booking
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment verification failed',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
