{{-- <!DOCTYPE html>
<html class="scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}"> --}}

{{-- <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">


    <!-- Icon SEO -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
    <link rel="manifest" href="/favicons/site.webmanifest">



    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head> --}}

{{-- <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ $title ?? config('app.name', 'Laravel') }}</title>

    <!-- Description -->
    @if (!empty($description))
        <meta name="description" content="{{ $description }}">
    @endif

    <!-- OG -->
    @if (!empty($title))
        <meta property="og:title" content="{{ $title }}">
    @endif
    @if (!empty($description))
        <meta property="og:description" content="{{ $description }}">
    @endif
    @if (!empty($image))
        <meta property="og:image" content="{{ $image }}">
    @endif
    @if (!empty($url))
        <meta property="og:url" content="{{ $url }}">
    @endif
    <meta property="og:type" content="article" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    @if (!empty($title))
        <meta name="twitter:title" content="{{ $title }}">
    @endif
    @if (!empty($description))
        <meta name="twitter:description" content="{{ $description }}">
    @endif
    @if (!empty($image))
        <meta name="twitter:image" content="{{ $image }}">
    @endif

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Icon SEO -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
    <link rel="manifest" href="/favicons/site.webmanifest">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>


<body class="font-montserrat antialiased scroll-smooth">
    @inertia
</body>

</html> --}}

<!DOCTYPE html>
<html class="scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Dynamic Title -->
    <title inertia>{{ $title ?? config('app.name', 'Laravel') }}</title>

    <!-- SEO Description -->
    @if (!empty($description))
        <meta name="description" content="{{ $description }}">
    @endif

    <!-- Open Graph -->
    @if (!empty($title))
        <meta property="og:title" content="{{ $title }}">
    @endif
    @if (!empty($description))
        <meta property="og:description" content="{{ $description }}">
    @endif
    @if (!empty($image))
        <meta property="og:image" content="{{ $image }}">
    @endif
    @if (!empty($url))
        <meta property="og:url" content="{{ $url }}">
    @endif
    <meta property="og:type" content="article">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    @if (!empty($title))
        <meta name="twitter:title" content="{{ $title }}">
    @endif
    @if (!empty($description))
        <meta name="twitter:description" content="{{ $description }}">
    @endif
    @if (!empty($image))
        <meta name="twitter:image" content="{{ $image }}">
    @endif

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
    <link rel="manifest" href="/favicons/site.webmanifest">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-montserrat antialiased scroll-smooth">
    @inertia
</body>

</html>
