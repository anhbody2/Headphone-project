<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Sku;
use App\Models\Product;

class OrderController extends Controller
{
    // GET /api/orders
    public function index()
    {
        return Order::with('items.sku', 'user.orders','payment.orders')->latest()->get();
    }

    // GET /api/orders/{id}
    public function show($id)
    {
        return Order::with('items')->findOrFail($id);
    }

    // POST /api/orders
    public function store(Request $request)
    {
        $request->validate([
            'user_id'            => 'required|integer',
            'items'              => 'required|array|min:1',
            'items.*.name'     => 'string',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.sku_id'     => 'required|integer|exists:skus,id',
            'items.*.price'      => 'required|numeric',
            'items.*.quantity'   => 'required|integer|min:1',
            'total'              => 'required|numeric'
        ]);

        return DB::transaction(function () use ($request) {
            $calculatedTotal = collect($request->items)
                ->sum(fn($i) => $i['price'] * $i['quantity']);

            $order = Order::create([
                'user_id'     => auth()->id ?? $request->user_id,
                'total_price' => $request->total,
                'status'      => 'pending',
            ]);

            foreach ($request->items as $item) {
                $sku = Sku::where('id', $item['sku_id'])
                    ->lockForUpdate()
                    ->first();

                if (!$sku || $sku->stock < $item['quantity']) {
                    throw new \Exception("Item ( {$item['name']}) is out of stock.");
                }

                $sku->decrement('stock', $item['quantity']);

                Sku::where('id', $item['product_id'])->increment('buyturn');
            }

            $order->items()->createMany($request->items);

            return response()->json($order->load('items'), 201);
        });
    }
    // PATCH /api/orders/{id}/status
    public function updateStatus(Request $request, $id)
    {
        // 1. Validate the request
        $request->validate([
            'status' => 'required|string|in:pending,confirmed,shipping,completed,cancelled,refunded'
        ]);

        // 2. Find the order
        $order = Order::findOrFail($id);

        // 3. Update only the status
        $order->update([
            'status' => $request->status
        ]);

        // 4. Return the updated order or a success message
        return response()->json([
            'message' => 'Order status updated successfully.',
            'order'   => $order->only(['id', 'status', 'updated_at'])
        ]);
    }
    // DELETE /api/orders/{id}
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->items()->delete();
        $order->delete();

        return response()->json(['message' => 'Order deleted']);
    }
}
