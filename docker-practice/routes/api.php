<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/hello', function() {
  return response()->json(['message' => 'やっほー Laravelからにゃ！']);
});

Route::resource('users', UserController::class)->only('index');