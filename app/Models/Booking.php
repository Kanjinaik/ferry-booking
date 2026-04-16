<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Fillable fields for mass assignment
    protected $fillable = [
        'user_id',
        'ferry_id',
        'passengers',
        'adults',
        'children',
        'vehicle_type',
        'vehicle_count',
        'special_requests',
        'total_amount',
        'status',
        'booking_date',
        'travel_date',
        'razorpay_order_id',
        'razorpay_payment_id',
        'razorpay_signature'
    ];

    // Cast attributes
    protected $casts = [
        'user_id' => 'integer',
        'ferry_id' => 'integer',
        'passengers' => 'integer',
        'adults' => 'integer',
        'children' => 'integer',
        'vehicle_count' => 'integer',
        'total_amount' => 'decimal:2',
        'booking_date' => 'date',
        'travel_date' => 'date',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ferry()
    {
        return $this->belongsTo(Ferry::class);
    }

    // Computed property for status badge
    public function getStatusBadgeAttribute()
    {
        $badges = [
            self::STATUS_PENDING => 'Pending',
            self::STATUS_CONFIRMED => 'Confirmed',
            self::STATUS_CANCELLED => 'Cancelled',
        ];
        return $badges[$this->status] ?? $this->status;
    }

    // Scopes
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    // Status handling
    const STATUS_PENDING   = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_CANCELLED = 'cancelled';
}
