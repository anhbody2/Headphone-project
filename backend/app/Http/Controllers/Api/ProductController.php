<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    // GET /api/products
    public function index()
    {
        return Product::with([
            'skus.values.option'
        ])
            ->whereNull('deleted_at')
            ->get()
            ->map(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'skus' => $product->skus->map(fn($sku) => [
                    'id' => $sku->id,
                    'name' => $sku->name,
                    'price' => $sku->price,
                    'promotion' =>$sku->promotion,
                    'img' => $sku->img,
                    'stock' => $sku->stock,
                    'buyturn' => $sku->buyturn,
                    'options' => $sku->values->mapWithKeys(fn($v) => [
                        $v->option->name => $v->value
                    ])
                ])
            ]);
    }

    // GET /api/products/{id}
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'data' => $product
        ], Response::HTTP_OK);
    }

    // POST /api/products
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created',
            'data'    => $product
        ], Response::HTTP_CREATED);
    }

    // PUT /api/products/{id}
    public function update(Request $request, $id)
    {

        $product = Product::findOrFail($id);
        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], Response::HTTP_NOT_FOUND);
        }
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        
        $product->update($validated);

        return response()->json([
            'message' => 'Product updated',
            'data'    => $product
        ], Response::HTTP_OK);
    }

    // DELETE /api/products/{id}
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], Response::HTTP_NOT_FOUND);
        }

        $product->delete();
        return response()->json([
            'message' => 'Product deleted'
        ], Response::HTTP_NO_CONTENT);
    }
}
