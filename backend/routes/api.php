<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SkuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;

Route::apiResource('products', ProductController::class);

Route::apiResource('users', UserController::class);

Route::apiResource('skus', SkuController::class);
Route::get('/skus/{id}', [SkuController::class, 'show']);

Route::post('/checkout', [CheckoutController::class, 'store']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/changepassword', [AuthController::class, 'changePasswordByEmail']);

Route::middleware('auth:api')->group(function () {
    //Order routes api
    Route::apiResource('orders', OrderController::class);
    Route::patch('orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    // cart routes
    Route::get('/cart', [CartController::class, 'show']);
    Route::patch('/cart/item/{id}', [CartController::class, 'updateQty']);
    Route::delete('/cart/item/{id}', [CartController::class, 'remove']);
    Route::post('/cart/merge', [CartController::class, 'merge']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
});
