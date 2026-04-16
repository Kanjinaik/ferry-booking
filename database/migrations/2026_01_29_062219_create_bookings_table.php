<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('ferry_id')->constrained()->onDelete('cascade');
            
            // Passenger details
            $table->integer('passengers')->default(1);
            $table->integer('adults')->default(1);
            $table->integer('children')->default(0);
            
            // Vehicle details
            $table->string('vehicle_type')->default('none');
            $table->integer('vehicle_count')->default(0);
            
            // Booking details
            $table->text('special_requests')->nullable();
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->string('status')->default('pending');
            
            // Dates
            $table->date('booking_date');
            $table->date('travel_date');
            
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['user_id', 'status']);
            $table->index('travel_date');
            $table->index('status');

             $table->string('razorpay_order_id')->nullable();
        $table->string('razorpay_payment_id')->nullable();
        $table->string('razorpay_signature')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
