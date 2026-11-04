<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=dm-sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=playfair-display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&family=jetbrains-mono:wght@0,400;0,500;0,600&display=swap" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
