<?php

use App\Http\Controllers\AdminWebController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect(env('FRONTEND_URL', '/admin/login'));
});

Route::get('/admin', function () {
    return redirect('/admin/login');
});

Route::get('/admin/login', [AdminWebController::class, 'loginForm']);
Route::post('/admin/login', [AdminWebController::class, 'login']);

Route::middleware('admin.web')->group(function () {
    Route::get('/admin/dashboard', [AdminWebController::class, 'dashboard']);
    Route::post('/admin/logout', [AdminWebController::class, 'logout']);
});
