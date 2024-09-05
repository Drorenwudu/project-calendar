<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/x-icon" href="{{ asset('event-not-available-svgrepo-com.ico') }}">
    <title>Calendar</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
</head>

<body>
    <div id="app"></div>
</body>

</html>
