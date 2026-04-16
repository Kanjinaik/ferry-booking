<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminWebMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!session('admin_user_id')) {
            return redirect('/admin/login');
        }

        return $next($request);
    }
}
