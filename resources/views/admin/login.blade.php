<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend Admin Login</title>
    <style>
        body {
            margin: 0;
            font-family: Georgia, "Times New Roman", serif;
            background: linear-gradient(135deg, #0d3b66, #145374);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #123;
        }
        .card {
            width: min(420px, 92vw);
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
            padding: 32px;
        }
        h1 {
            margin: 0 0 8px;
            font-size: 32px;
            color: #0d3b66;
        }
        p {
            margin: 0 0 24px;
            color: #5b6b7a;
        }
        label {
            display: block;
            margin: 0 0 8px;
            font-weight: 700;
            color: #264653;
        }
        input {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 14px;
            margin-bottom: 18px;
            border: 1px solid #c7d4df;
            border-radius: 10px;
            font-size: 15px;
        }
        button {
            width: 100%;
            padding: 13px 16px;
            border: 0;
            border-radius: 10px;
            background: #0077b6;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
        }
        .error {
            margin-bottom: 18px;
            padding: 12px 14px;
            border-radius: 10px;
            background: #fdecec;
            color: #b42318;
        }
        .hint {
            margin-top: 16px;
            font-size: 13px;
            color: #6b7280;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Backend Admin</h1>
        <p>Sign in to the Laravel admin panel.</p>

        @if ($errors->any())
            <div class="error">{{ $errors->first() }}</div>
        @endif

        <form method="POST" action="/admin/login">
            @csrf
            <label for="email">Email</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" required>

            <label for="password">Password</label>
            <input id="password" type="password" name="password" required>

            <button type="submit">Login</button>
        </form>

        <div class="hint">Use your admin account to access the backend panel.</div>
    </div>
</body>
</html>
