<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend Admin Dashboard</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f3f7fb;
            color: #1f2937;
        }
        .topbar {
            background: #0d3b66;
            color: #fff;
            padding: 18px 28px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .topbar h1 {
            margin: 0;
            font-size: 28px;
        }
        .topbar form {
            margin: 0;
        }
        .logout {
            background: #fff;
            color: #0d3b66;
            border: 0;
            border-radius: 8px;
            padding: 10px 14px;
            cursor: pointer;
            font-weight: 700;
        }
        .wrap {
            max-width: 1200px;
            margin: 24px auto;
            padding: 0 16px 32px;
        }
        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .card {
            background: #fff;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
        }
        .label {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .value {
            font-size: 30px;
            font-weight: 700;
            color: #0d3b66;
        }
        .grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 24px;
        }
        .panel {
            background: #fff;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 12px 10px;
            border-bottom: 1px solid #e5e7eb;
            text-align: left;
            font-size: 14px;
        }
        th {
            color: #6b7280;
        }
        .tag {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            text-transform: capitalize;
        }
        .confirmed { background: #dcfce7; color: #166534; }
        .pending { background: #fef3c7; color: #92400e; }
        .cancelled { background: #fee2e2; color: #991b1b; }
        .active { background: #dbeafe; color: #1d4ed8; }
        .maintenance { background: #e5e7eb; color: #374151; }
        .cancelled-ferry { background: #fee2e2; color: #991b1b; }
        @media (max-width: 900px) {
            .grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="topbar">
        <div>
            <h1>Backend Admin</h1>
            <div>Welcome, {{ $adminName }}</div>
        </div>
        <form method="POST" action="/admin/logout">
            @csrf
            <button class="logout" type="submit">Logout</button>
        </form>
    </div>

    <div class="wrap">
        <div class="cards">
            <div class="card"><div class="label">Users</div><div class="value">{{ $stats['users'] }}</div></div>
            <div class="card"><div class="label">Ferries</div><div class="value">{{ $stats['ferries'] }}</div></div>
            <div class="card"><div class="label">Bookings</div><div class="value">{{ $stats['bookings'] }}</div></div>
            <div class="card"><div class="label">Revenue</div><div class="value">Rs {{ number_format((float) $stats['total_revenue'], 2) }}</div></div>
            <div class="card"><div class="label">Confirmed</div><div class="value">{{ $stats['confirmed_bookings'] }}</div></div>
            <div class="card"><div class="label">Pending</div><div class="value">{{ $stats['pending_bookings'] }}</div></div>
        </div>

        <div class="grid">
            <div class="panel">
                <h2>Recent Bookings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Route</th>
                            <th>Travel Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($recentBookings as $booking)
                            <tr>
                                <td>{{ $booking->user->name ?? 'Unknown' }}</td>
                                <td>{{ $booking->ferry->route ?? 'N/A' }}</td>
                                <td>{{ optional($booking->travel_date)->format('Y-m-d') }}</td>
                                <td>Rs {{ number_format((float) $booking->total_amount, 2) }}</td>
                                <td><span class="tag {{ $booking->status }}">{{ $booking->status }}</span></td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5">No bookings found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <div class="panel">
                <h2>Ferries</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($ferries as $ferry)
                            <tr>
                                <td>{{ $ferry->name }}</td>
                                <td>
                                    <span class="tag {{ $ferry->status === 'cancelled' ? 'cancelled-ferry' : $ferry->status }}">
                                        {{ $ferry->status }}
                                    </span>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="2">No ferries found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
