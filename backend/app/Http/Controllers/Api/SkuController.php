<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sku;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class SkuController extends Controller
{
    /**
     * GET /api/skus
     * List all SKUs
     */
    public function index()
    {
        $skus = Sku::all();

        return response()->json([
            'status' => 'success',
            'data' => $skus
        ], Response::HTTP_OK);
    }

    /**
     * POST /api/skus
     * Create a new SKU
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'name'       => 'required|string|unique:skus,name',
            'price'      => 'required|numeric|min:0',
            'promotion'  => 'required|numeric|min:0',   
            'img'        => 'nullable|array',
            'stock'      => 'required|integer|min:0',
        ]);

        // Explicit check for product existence
        $product = Product::find($validated['product_id']);

        if (!$product) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Product not existed'
            ], Response::HTTP_NOT_FOUND);
        }

        $sku = Sku::create($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'SKU created successfully',
            'data'    => $sku
        ], Response::HTTP_CREATED);
    }

    /**
     * GET /api/skus/{id}
     * Show SKU detail
     */
    public function show($keyword)
    {
        $skus = Sku::with(['product', 'values'])
            ->where('name', 'LIKE', '%' . $keyword . '%')
            ->get();

        if ($skus->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No SKUs found matching that product name'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'status' => 'success',
            'count'  => $skus->count(),
            'data'   => $skus
        ], Response::HTTP_OK);
    }
    /**
     * PUT /api/skus/{id}
     * Update SKU
     */


    public function update(Request $request, $id)
    {
        $sku = Sku::find($id);

        if (!$sku) {
            return response()->json([
                'status' => 'error',
                'message' => 'SKU not found'
            ], Response::HTTP_NOT_FOUND);
        }

        // 1. Manually create the validator
        $validator = Validator::make($request->all(), [
            'product_id' => 'sometimes|exists:products,id',
            'name'       => 'sometimes|string|unique:skus,name,' . $sku->id,
            'price'      => 'sometimes|numeric|min:0',
            'promotion'  => 'required|numeric|min:0',   
            'stock'      => 'sometimes|integer|min:0',
            'img'        => 'nullable|array',
            'status'     => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 'error',
                'message' => $validator->errors()->first()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // 3. Update using validated data
        $sku->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'SKU updated successfully',
            'data' => $sku
        ], Response::HTTP_OK);
    }

    /**
     * DELETE /api/skus/{id}
     * Delete SKU
     */
    public function destroy($id)
    {
        $sku = Sku::find($id);

        if (!$sku) {
            return response()->json([
                'status' => 'error',
                'message' => 'SKU not found'
            ], Response::HTTP_NOT_FOUND);
        }

        $sku->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'SKU deleted successfully'
        ], Response::HTTP_OK);
    }
}
