<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FerryController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\PaymentController;

/*
|-------------------------------------------------------------------------- 
| 🔓 PUBLIC ROUTES (NO TOKEN) 
|-------------------------------------------------------------------------- 
*/

// Auth
Route::get('/login', function () {
    return response()->json([
        'message' => 'Use POST for /api/login. Open the admin UI at http://localhost:3000/admin',
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', function () {
    return response()->json([
        'message' => 'Use POST for /api/register. Open the app UI at http://localhost:3000/register',
    ]);
});

/*
|-------------------------------------------------------------------------- 
| 🚢 PUBLIC FERRY ROUTES 
|-------------------------------------------------------------------------- 
*/
Route::get('/ferries/check-availability', [FerryController::class, 'checkAvailability']);

Route::prefix('ferries')->group(function () {
    Route::get('/', [FerryController::class, 'index']);         // Get all ferries
    Route::get('/routes', [FerryController::class, 'routes']);  // Get all ferry routes
    Route::get('/{id}', [FerryController::class, 'show']);      // Get specific ferry by ID
    Route::get('/{id}/availability', [FerryController::class, 'availability']); // Ferry availability for the specific ferry
});

/*
|-------------------------------------------------------------------------- 
| 🔐 PROTECTED ROUTES (JWT REQUIRED) 
|-------------------------------------------------------------------------- 
*/
Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Payment routes
    Route::post('/create-payment-order', [PaymentController::class, 'createOrder']);
    Route::post('/verify-payment', [PaymentController::class, 'verifyPayment']);

    // Bookings
    Route::prefix('bookings')->group(function () {
        Route::post('/', [BookingController::class, 'store']);
        Route::get('/my', [BookingController::class, 'myBookings']);
        Route::get('/', [BookingController::class, 'index']);
        Route::get('/{id}', [BookingController::class, 'show']);
        Route::put('/{id}', [BookingController::class, 'update']);
        Route::delete('/{id}', [BookingController::class, 'destroy']);
        Route::put('/{id}/status', [BookingController::class, 'updateStatus']);
    });

    // Ferry routes (Create, Update, Delete)
    Route::prefix('ferries')->group(function () {
        Route::post('/', [FerryController::class, 'store']);
        Route::put('/{id}', [FerryController::class, 'update']);
        Route::delete('/{id}', [FerryController::class, 'destroy']);
    });

    // Admin statistics
    Route::get('/admin/statistics', [BookingController::class, 'statistics']);
});

/*
|-------------------------------------------------------------------------- 
| 👑 ADMIN ONLY (JWT + ADMIN MIDDLEWARE) 
|-------------------------------------------------------------------------- 
*/
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/bookings', [BookingController::class, 'index']);
    Route::get('/admin/ferries', [FerryController::class, 'index']);
});

/*
|-------------------------------------------------------------------------- 
| ⚠ REMOVE SANCTUM DUPLICATE 
|-------------------------------------------------------------------------- 
| We are using JWT only.
*/
