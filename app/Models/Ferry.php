<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ferry extends Model
{
    protected $fillable = [
        'name',
        'route',
        'capacity',
        'departure_time',
        'arrival_time',
        'seats',
        'price',
        'status',
        'description'
    ];

    const STATUS_ACTIVE = 'active';
    const STATUS_MAINTENANCE = 'maintenance';
    const STATUS_CANCELLED = 'cancelled';

    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    public function scopeByRoute($query, $from, $to)
    {
        return $query->where('route', "$from → $to");
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function schedules()
    {
        return $this->hasMany(FerrySchedule::class);
    }
}
