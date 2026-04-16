<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Ferry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    /**
     * Book a ferry (store a new booking)
     */
    public function store(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'ferry_id' => 'required|exists:ferries,id',
            'passengers' => 'required|integer|min:1',
            'adults' => 'required|integer|min:0',
            'children' => 'required|integer|min:0',
            'vehicle_type' => 'nullable|string|in:none,car,bike,bus,truck',
            'vehicle_count' => 'nullable|integer|min:0',
            'special_requests' => 'nullable|string|max:500',
            'travel_date' => 'required|date|after_or_equal:today'
        ]);

        // Ensure adults + children equals passengers
        if (($validated['adults'] + $validated['children']) !== $validated['passengers']) {
            return response()->json([
                'status' => false,
                'message' => 'Adults and children count must equal total passengers'
            ], 422);
        }

        return DB::transaction(function () use ($validated) {
            // Find the ferry
            $ferry = Ferry::findOrFail($validated['ferry_id']);

            // Check availability
            $bookedPassengers = $ferry->bookings()
                ->whereDate('travel_date', $validated['travel_date'])
                ->where('status', Booking::STATUS_CONFIRMED)
                ->sum('passengers');

            $availableSeats = $ferry->seats - $bookedPassengers;

            if ($availableSeats < $validated['passengers']) {
                return response()->json([
                    'status' => false,
                    'message' => 'Not enough seats available for this ferry on the selected date'
                ], 422);
            }

            // Calculate total price
            $passengerCost = $ferry->price * $validated['passengers'];
            
            $vehiclePrices = [
                'car' => 500,
                'bike' => 200,
                'bus' => 1500,
                'truck' => 2000
            ];
            
            $vehicleCost = 0;
            if ($validated['vehicle_type'] !== 'none' && $validated['vehicle_count'] > 0) {
                $vehicleCost = $vehiclePrices[$validated['vehicle_type']] * $validated['vehicle_count'];
            }

            $totalAmount = $passengerCost + $vehicleCost;

            // Create booking
            $booking = Booking::create([
                'user_id' => auth('api')->id(),
                'ferry_id' => $ferry->id,
                'passengers' => $validated['passengers'],
                'adults' => $validated['adults'],
                'children' => $validated['children'],
                'vehicle_type' => $validated['vehicle_type'] ?? 'none',
                'vehicle_count' => $validated['vehicle_count'] ?? 0,
                'special_requests' => $validated['special_requests'],
                'total_amount' => $totalAmount,
                'status' => Booking::STATUS_CONFIRMED,
                'booking_date' => now(),
                'travel_date' => $validated['travel_date']
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Booking confirmed successfully!',
                'booking' => $booking->load('ferry'),
                'total_amount' => $totalAmount
            ], 201);
        });
    }

    /**
     * Get all bookings of the logged-in user
     */
    public function myBookings()
    {
        // Fetch bookings with ferry relation
        $bookings = Booking::with('ferry')
            ->where('user_id', auth('api')->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($booking) {
                $booking->status_badge = $booking->status_badge;
                return $booking;
            });

        return response()->json([
            'status' => true,
            'data' => $bookings
        ]);
    }

    /**
     * List all bookings (admin)
     */
    public function index(Request $request)
    {
        $query = Booking::with('ferry', 'user');
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('travel_date', [$request->start_date, $request->end_date]);
        }
        
        $bookings = $query->orderBy('created_at', 'desc')->get();
        
        // Add computed properties
        $bookings->each(function($booking) {
            $booking->status_badge = $booking->status_badge;
        });

        return response()->json([
            'status' => true,
            'data' => $bookings
        ]);
    }

    /**
     * Show a single booking
     */
    public function show($id)
    {
        $booking = Booking::with('ferry', 'user')
            ->where('user_id', auth('api')->id())
            ->find($id);

        if (!$booking) {
            return response()->json([
                'status' => false,
                'message' => 'Booking not found or not authorized'
            ], 404);
        }

        $booking->status_badge = $booking->status_badge;

        return response()->json([
            'status' => true,
            'data' => $booking
        ]);
    }

    /**
     * Cancel a booking
     */
    public function destroy($id)
    {
        $booking = Booking::where('user_id', auth('api')->id())
            ->where('status', Booking::STATUS_CONFIRMED)
            ->find($id);

        if (!$booking) {
            return response()->json([
                'status' => false,
                'message' => 'Booking not found, not authorized, or cannot be cancelled'
            ], 404);
        }

        // Allow cancellation only 24 hours before travel
        if ($booking->travel_date->lt(now()->addDay())) {
            return response()->json([
                'status' => false,
                'message' => 'Cannot cancel booking within 24 hours of travel'
            ], 422);
        }

        $booking->update(['status' => Booking::STATUS_CANCELLED]);

        return response()->json([
            'status' => true,
            'message' => 'Booking cancelled successfully'
        ]);
    }

    /**
     * Update booking status (admin)
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,confirmed,cancelled'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $request->status]);

        return response()->json([
            'status' => true,
            'message' => 'Booking status updated successfully',
            'booking' => $booking
        ]);
    }

    /**
     * Get booking statistics (admin)
     */
    public function statistics()
    {
        $stats = [
            'total_bookings' => Booking::count(),
            'confirmed_bookings' => Booking::where('status', Booking::STATUS_CONFIRMED)->count(),
            'pending_bookings' => Booking::where('status', Booking::STATUS_PENDING)->count(),
            'cancelled_bookings' => Booking::where('status', Booking::STATUS_CANCELLED)->count(),
            'total_revenue' => Booking::where('status', Booking::STATUS_CONFIRMED)->sum('total_amount'),
            'todays_bookings' => Booking::whereDate('created_at', today())->count(),
            'this_months_bookings' => Booking::whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count()
        ];

        return response()->json([
            'status' => true,
            'data' => $stats
        ]);
    }
}
