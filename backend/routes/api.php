<?php
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SkuController;

Route::apiResource('products', ProductController::class);

Route::apiResource('users', UserController::class);

Route::apiResource('skus', SkuController::class);   