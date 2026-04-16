<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Ferry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminWebController extends Controller
{
    public function loginForm()
    {
        if (session('admin_user_id')) {
            return redirect('/admin/dashboard');
        }

        return view('admin.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $credentials['email'])
            ->where('role', 'admin')
            ->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return back()
                ->withErrors(['email' => 'Invalid admin credentials.'])
                ->onlyInput('email');
        }

        $request->session()->regenerate();
        $request->session()->put('admin_user_id', $user->id);
        $request->session()->put('admin_user_name', $user->name);

        return redirect('/admin/dashboard');
    }

    public function dashboard()
    {
        $stats = [
            'users' => User::count(),
            'ferries' => Ferry::count(),
            'bookings' => Booking::count(),
            'confirmed_bookings' => Booking::where('status', Booking::STATUS_CONFIRMED)->count(),
            'pending_bookings' => Booking::where('status', Booking::STATUS_PENDING)->count(),
            'cancelled_bookings' => Booking::where('status', Booking::STATUS_CANCELLED)->count(),
            'total_revenue' => Booking::where('status', Booking::STATUS_CONFIRMED)->sum('total_amount'),
        ];

        $recentBookings = Booking::with(['user', 'ferry'])
            ->latest()
            ->limit(10)
            ->get();

        $ferries = Ferry::orderBy('name')->get();

        return view('admin.dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings,
            'ferries' => $ferries,
            'adminName' => session('admin_user_name', 'Admin'),
        ]);
    }

    public function logout(Request $request)
    {
        $request->session()->forget(['admin_user_id', 'admin_user_name']);
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
