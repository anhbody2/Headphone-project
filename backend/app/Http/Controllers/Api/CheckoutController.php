<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Payment;

class CheckoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'user_name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
        ]);

        return DB::transaction(function () use ($request) {

            // 1️⃣ Find or create guest user
            $user = User::firstOrCreate(
                ['email' => $request->email],
                [
                    'user_name' => $request->user_name,
                    'role' => 'guest'
                ]
            );

            // 2️⃣ Create payment record
            $payment = Payment::create([
                'user_id' => $user->id,
                'phone_number' => $request->phone,  
                'address' => $request->address
            ]);
            return response()->json([
                'user_id' => $user->id,
                'payment_id' => $payment->id
            ]);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
