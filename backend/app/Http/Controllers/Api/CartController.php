<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Sku;
use PDO;

class CartController extends Controller
{
    private function cart(int $userId): Cart
    {
        return Cart::firstOrCreate([
            'user_id' => $userId
        ]);
    }
    public function show(Request $request)
    {
        $cart = $this->cart($request->user()->id)
            ->load('items.sku');

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

        return response()->json([
            'items' => $items,
            'total' => $items->sum('subtotal'),
        ]);
    }
    public function merge(Request $request)
    {
        $user = $request->user();

        DB::transaction(function () use ($request, $user) {

            $cart = Cart::firstOrCreate([
                'user_id' => $user->id
            ]);

            foreach ($request->items as $item) {

                if (!isset($item['sku_id']) || !isset($item['quantity'])) {
                    continue;
                }

                // Get SKU
                $sku = Sku::find($item['sku_id']);

                if (!$sku) {
                    continue;
                }

                $existingItem = CartItem::where('cart_id', $cart->id)
                    ->where('sku_id', $sku->id)
                    ->first();

                if ($existingItem) {
                    $existingItem->quantity += $item['quantity'];
                    $existingItem->save();
                } else {
                    CartItem::create([
                        'cart_id' => $cart->id,
                        'product_id' => $sku->product_id,
                        'sku_id' => $sku->id,
                        'quantity' => $item['quantity'],
                    ]);
                }
            }
        });

        return $this->show($request);
    }


    public function updateQty(Request $request, $sku_id)
    {
        $user = $request->user();
        $quantity = $request->input('quantity');
        $sku = Sku::findOrFail($sku_id);
        if ($sku->stock < $quantity) {
            return response()->json([
                'message' => "Only {$sku->stock} units left in stock.",
                'available_stock' => $sku->stock
            ], 422);
        }
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $cartItem = CartItem::updateOrCreate(
            [
                'cart_id' => $cart->id,
                'sku_id'  => $sku_id,
            ],
            [
                'quantity' => $quantity,
            ]
        );

        return response()->json([
            'message' => 'Cart updated',
            'item' => $cartItem
        ]);
    }
    public function remove(Request $request, $id)
    {
        CartItem::where('id', $id)
            ->whereHas(
                'cart',
                fn($q) =>
                $q->where('user_id', $request->user()->id)
            )
            ->delete();

        return $this->show($request);
    }
    public function clear(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)->first();

        if ($cart) {
            CartItem::where('cart_id', $cart->id)->delete();
        }

        return $this->show($request);
    }
}
