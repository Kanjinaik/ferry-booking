<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Ferry;
use App\Models\Booking;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Admin dashboard statistics
     */
    public function dashboard()
    {
        $stats = [
            'users' => User::count(),
            'ferries' => Ferry::count(),
            'bookings' => Booking::count(),
            'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
            'pending_bookings' => Booking::where('status', 'pending')->count(),
            'cancelled_bookings' => Booking::where('status', 'cancelled')->count(),
            'total_revenue' => Booking::where('status', 'confirmed')->sum('total_amount'),
            'recent_bookings' => Booking::with('user', 'ferry')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
        ];

        return response()->json([
            'status' => true,
            'data' => $stats
        ]);
    }

    /**
     * Manage users
     */
    public function users(Request $request)
    {
        $users = User::query();
        
        if ($request->has('role')) {
            $users->where('role', $request->role);
        }
        
        if ($request->has('search')) {
            $users->where(function($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }
        
        $users = $users->paginate(20);
        
        return response()->json([
            'status' => true,
            'data' => $users
        ]);
    }

    /**
     * Create new ferry
     */
    public function createFerry(Request $request)
    {
        $validated = $request->validate([
            'route' => 'required|string|max:255',
            'departure_time' => 'required|date_format:H:i',
            'arrival_time' => 'required|date_format:H:i',
            'seats' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'status' => 'sometimes|string|in:active,maintenance,cancelled',
            'description' => 'nullable|string'
        ]);
        
        $validated['status'] = $validated['status'] ?? 'active';
        
        $ferry = Ferry::create($validated);
        
        return response()->json([
            'status' => true,
            'message' => 'Ferry created successfully',
            'data' => $ferry
        ], 201);
    }

    /**
     * Update ferry
     */
    public function updateFerry(Request $request, $id)
    {
        $ferry = Ferry::findOrFail($id);
        
        $validated = $request->validate([
            'route' => 'sometimes|required|string|max:255',
            'departure_time' => 'sometimes|required|date_format:H:i',
            'arrival_time' => 'sometimes|required|date_format:H:i',
            'seats' => 'sometimes|required|integer|min:1',
            'price' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|string|in:active,maintenance,cancelled',
            'description' => 'nullable|string'
        ]);
        
        $ferry->update($validated);
        
        return response()->json([
            'status' => true,
            'message' => 'Ferry updated successfully',
            'data' => $ferry
        ]);
    }

    /**
     * Delete ferry
     */
    public function deleteFerry($id)
    {
        $ferry = Ferry::findOrFail($id);
        $ferry->delete();
        
        return response()->json([
            'status' => true,
            'message' => 'Ferry deleted successfully'
        ]);
    }
}