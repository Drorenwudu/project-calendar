<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::get('/', [EventController::class, 'show']);
Route::post('/event', [EventController::class, 'store']);
