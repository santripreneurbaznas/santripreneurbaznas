<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintenance Mode</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <style>
        .maintenance-bg {
            background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
            min-height: 100vh;
            overflow: hidden;
            position: relative;
        }

        .maintenance-card {
            backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.15);
            border-radius: 1.5rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            z-index: 10;
        }

        .spinner {
            animation: spin 3s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .leaf {
            position: absolute;
            opacity: 0.3;
            animation: float 15s infinite linear;
        }

        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
            }

            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }

        .circle-ornament {
            position: absolute;
            border-radius: 50%;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            animation: pulse 8s infinite alternate;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.3;
            }

            100% {
                transform: scale(1.1);
                opacity: 0.5;
            }
        }

        .progress-bar {
            height: 6px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
            overflow: hidden;
            margin: 20px 0;
        }

        .progress {
            height: 100%;
            background: white;
            border-radius: 3px;
            animation: progress-animation 3s ease-in-out infinite alternate;
        }

        @keyframes progress-animation {
            0% {
                width: 30%;
            }

            100% {
                width: 70%;
            }
        }

        .icon-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin: 30px 0;
        }

        .icon-item {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: all 0.3s ease;
        }

        .icon-item:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-5px);
        }

        @media (max-width: 640px) {
            .icon-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>

<body class="maintenance-bg flex items-center justify-center p-4">
    <!-- Background ornaments -->
    <div class="circle-ornament w-64 h-64 -top-32 -left-32"></div>
    <div class="circle-ornament w-96 h-96 -bottom-48 -right-48"></div>

    <!-- Leaves floating animation -->
    <div class="leaf" style="top: 10%; left: 5%; width: 40px;">
        <svg viewBox="0 0 512 512" fill="currentColor">
            <path
                d="M413.48,284.46c58.87,47.24,91.61,89,80.31,108.55-17.85,30.85-138.78-25.72-270.1-126.42S40.34,116.21,58.2,85.36c11.16-19.28,62.58-12.32,131.64,14.09">
            </path>
        </svg>
    </div>
    <div class="leaf" style="top: 70%; left: 80%; width: 60px; animation-delay: 3s;">
        <svg viewBox="0 0 512 512" fill="currentColor">
            <path
                d="M413.48,284.46c58.87,47.24,91.61,89,80.31,108.55-17.85,30.85-138.78-25.72-270.1-126.42S40.34,116.21,58.2,85.36c11.16-19.28,62.58-12.32,131.64,14.09">
            </path>
        </svg>
    </div>
    <div class="leaf" style="top: 30%; left: 90%; width: 50px; animation-delay: 7s;">
        <svg viewBox="0 0 512 512" fill="currentColor">
            <path
                d="M413.48,284.46c58.87,47.24,91.61,89,80.31,108.55-17.85,30.85-138.78-25.72-270.1-126.42S40.34,116.21,58.2,85.36c11.16-19.28,62.58-12.32,131.64,14.09">
            </path>
        </svg>
    </div>

    <!-- Main content -->
    <div class="maintenance-card text-white p-6 md:p-10 max-w-2xl w-full text-center animate__animated animate__fadeIn">
        <div class="flex justify-center mb-8">
            <svg class="spinner h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Sedang Dalam Pemeliharaan</h1>
        <p class="text-lg md:text-xl mb-6 md:mb-8">Kami sedang melakukan peningkatan sistem mohon tunngu sebentar</p>

        <div class="progress-bar">
            <div class="progress"></div>
        </div>

        <div class="icon-grid">
            <div class="icon-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="text-xs md:text-sm">Performa</span>
            </div>
            <div class="icon-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span class="text-xs md:text-sm">Keamanan</span>
            </div>
            <div class="icon-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span class="text-xs md:text-sm">Stabilitas</span>
            </div>
            <div class="icon-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-xs md:text-sm">Optimasi</span>
            </div>
        </div>

        <div class="bg-white bg-opacity-10 rounded-xl p-4 md:p-5 mb-6 md:mb-8">
            <p class="font-medium mb-2">Kami akan segera kembali!</p>
            <p class="text-sm opacity-90">Tim kami sedang bekerja keras untuk menyelesaikan pemeliharaan.</p>
        </div>

        <p class="text-sm opacity-80 mb-5">lakukan refresh halaman setiap 5 menit sekali</p>
        <p class="text-sm opacity-80">Terima kasih atas pengertian dan kesabaran Anda.</p>

    </div>
</body>

</html>
