<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ferry;
use Illuminate\Http\Request;

class FerryController extends Controller
{
    private function normalizedRoute(string $from, string $to): string
    {
        return trim($from) . ' -> ' . trim($to);
    }

    /**
     * Display a listing of all ferries
     * Optional filters: from, to, date
     */
    public function index(Request $request)
    {
        $query = Ferry::query()->where('status', 'active');

        if ($request->filled('from') && $request->filled('to')) {
            $query->where('route', $this->normalizedRoute($request->from, $request->to));
        }

        if ($request->filled('date')) {
            $query->whereHas('schedules', function ($q) use ($request) {
                $q->whereDate('departure_datetime', $request->date);
            });
        }

        return response()->json($query->get());
    }

    /**
     * Show a single ferry
     */
    public function show($id)
    {
        return response()->json(Ferry::findOrFail($id));
    }

    /**
     * Store a new ferry
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'route' => 'required|string|max:255',
            'departure_time' => 'required|date_format:H:i',
            'arrival_time' => 'required|date_format:H:i',
            'seats' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'status' => 'nullable|string|in:active,maintenance,cancelled',
            'description' => 'nullable|string'
        ]);

        $data['status'] = $data['status'] ?? 'active';

        return response()->json(Ferry::create($data), 201);
    }

    /**
     * Update an existing ferry
     */
    public function update(Request $request, $id)
    {
        $ferry = Ferry::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'route' => 'sometimes|required|string|max:255',
            'departure_time' => 'sometimes|required|date_format:H:i',
            'arrival_time' => 'sometimes|required|date_format:H:i',
            'seats' => 'sometimes|required|integer|min:1',
            'price' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|string|in:active,maintenance,cancelled',
            'description' => 'nullable|string'
        ]);

        $ferry->update($data);

        return response()->json($ferry);
    }

    /**
     * Delete a ferry
     */
    public function destroy($id)
    {
        $ferry = Ferry::findOrFail($id);
        $ferry->delete();

        return response()->json(['message' => 'Ferry deleted successfully']);
    }

    /**
     * Get all distinct routes
     */
    public function routes()
    {
        return response()->json(
            Ferry::where('status', 'active')->distinct()->pluck('route')
        );
    }

    /**
     * Check availability for a specific ferry
     */
    public function availability(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
            'passengers' => 'required|integer|min:1'
        ]);

        $ferry = Ferry::findOrFail($id);

        $bookedPassengers = $ferry->bookings()
            ->whereDate('travel_date', $request->date)
            ->where('status', 'confirmed')
            ->sum('passengers');

        $availableSeats = $ferry->seats - $bookedPassengers;

        return response()->json([
            'available' => $availableSeats >= $request->passengers,
            'available_seats' => $availableSeats,
            'total_seats' => $ferry->seats,
            'requested_passengers' => $request->passengers
        ]);
    }

    /**
     * Check availability by route (active ferries only)
     */
    public function checkAvailability(Request $request)
    {
        $from = $request->from;
        $to = $request->to;

        if (!$from || !$to) {
            return response()->json([
                'success' => false,
                'message' => 'Please provide both "from" and "to" locations.'
            ]);
        }

        $ferries = Ferry::where('route', $this->normalizedRoute($from, $to))
            ->where('status', 'active')
            ->get();

        if ($ferries->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No ferry available for the selected route.'
            ]);
        }

        return response()->json([
            'success' => true,
            'ferries' => $ferries
        ]);
    }
}
