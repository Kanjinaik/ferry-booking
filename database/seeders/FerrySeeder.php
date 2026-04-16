<?php

namespace Database\Seeders;

use App\Models\Ferry;
use App\Models\User;
use Illuminate\Database\Seeder;

class FerrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ferries = [
            [
                'name' => 'M2M-1',
                'route' => 'Mumbai -> Alibaug',
                'capacity' => 500,
                'departure_time' => '08:00:00',
                'arrival_time' => '09:00:00',
                'seats' => 500,
                'price' => 350.00,
                'status' => 'active',
                'description' => 'Fast ferry service to Alibaug',
            ],
            [
                'name' => 'M2M-2',
                'route' => 'Mumbai -> Mandwa',
                'capacity' => 400,
                'departure_time' => '09:30:00',
                'arrival_time' => '10:30:00',
                'seats' => 400,
                'price' => 400.00,
                'status' => 'active',
                'description' => 'Regular service to Mandwa',
            ],
            [
                'name' => 'M2M-3',
                'route' => 'Alibaug -> Mumbai',
                'capacity' => 500,
                'departure_time' => '16:00:00',
                'arrival_time' => '17:00:00',
                'seats' => 500,
                'price' => 350.00,
                'status' => 'active',
                'description' => 'Return journey to Mumbai',
            ],
            [
                'name' => 'M2M-4',
                'route' => 'Mandwa -> Mumbai',
                'capacity' => 400,
                'departure_time' => '17:30:00',
                'arrival_time' => '18:30:00',
                'seats' => 400,
                'price' => 400.00,
                'status' => 'maintenance',
                'description' => 'Currently under maintenance',
            ],
        ];

        foreach ($ferries as $ferry) {
            Ferry::updateOrCreate(['name' => $ferry['name']], $ferry);
        }

        User::updateOrCreate(
            ['email' => 'admin@m2mferries.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password123'),
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'john@example.com'],
            [
                'name' => 'John Doe',
                'password' => bcrypt('password123'),
                'role' => 'user',
            ]
        );
    }
}
