<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    @viteReactRefresh
    @vite(['resources/sass/app.scss','resources/js/app.js'])

    {{-- <script src={{ asset('js/app.js') }}></script> --}}
    <div id="root"></div>
</body>
</html>