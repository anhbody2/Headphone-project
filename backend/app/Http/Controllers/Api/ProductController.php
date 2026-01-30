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
        return response()->json([
            'data' => Product::latest()->get()
        ], Response::HTTP_OK);
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
            'sku'   => 'required|string|max:100|unique:products,sku',
            'price' => 'required|numeric|min:0',
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

        $validated = $request->validate([
            'name'  => 'sometimes|required|string|max:255',
            'sku'   => 'sometimes|required|string|max:100|unique:products,sku,' . $id,
            'price' => 'sometimes|required|numeric|min:0',
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
        Product::destroy($id);

        return response()->json([
            'message' => 'Product deleted'
        ], Response::HTTP_NO_CONTENT);
    }
}

