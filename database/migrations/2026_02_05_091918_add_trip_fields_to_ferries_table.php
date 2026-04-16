<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ferries', function (Blueprint $table) {
            $table->time('departure_time')->after('route');
            $table->time('arrival_time')->after('departure_time');
            $table->integer('seats')->after('capacity');
            $table->decimal('price', 8, 2)->after('seats');
        });
    }

    public function down(): void
    {
        Schema::table('ferries', function (Blueprint $table) {
            $table->dropColumn([
                'departure_time',
                'arrival_time',
                'seats',
                'price'
            ]);
        });
    }
};
