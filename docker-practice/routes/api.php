<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

Route::get('/hello', function() {
  return response()->json(['message' => 'やっほー Laravelからにゃ！']);
});

Route::apiResource('users', UserController::class);