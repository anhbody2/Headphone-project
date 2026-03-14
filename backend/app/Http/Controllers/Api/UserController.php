<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Symfony\Component\Console\Output\ConsoleOutput;
use App\Models\Cart;
class UserController extends Controller
{
    /**
     * GET /api/users
     */
    public function index()
    {
        return response()->json(
            User::all()
        );
    }

    /**
     * POST /api/users
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json($user, 201);
    }

    /**
     * GET /api/users/{id}
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        $orders = Order::where('user_id', $user->id)->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user,
                'orders' => $orders,
            ],
        ]);
    }
    public function me()
    {
        $user = auth('api')->user();
        $orders = Order::with('items.sku')->where('user_id', $user->id)->get();
        $cart = Cart::firstOrCreate([
            'user_id' => $user->id
        ]);
        $items = $cart->items->map(fn($item) => [
            'id'       => $item->id,
            'sku_id'   => $item->sku_id,
            'product_id' => $item->product_id,
            'name'     => $item->sku->name,
            'price'    => $item->sku->price,
            'quantity' => $item->quantity,
            'subtotal' => $item->quantity * $item->sku->price,
            'image'    => $item->sku->img[0] ?? null,
        ]);
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
        return response()->json([
            'auth'  => true,
            'id'    => $user->id,
            'name'  => $user->user_name,
            'email' => $user->email,
            'role'  => $user->role,
            'data' => [
                'orders' => $orders,
                'cart' => $items,
            ],
        ]);
    }

    /**
     * PUT /api/users/{id}
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name'  => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'sometimes|string|min:8',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json($user);
    }
    /**
     * DELETE /api/users/{id}
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
}
