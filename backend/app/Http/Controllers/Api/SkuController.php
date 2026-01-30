<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sku;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
            'product_id' => 'required|exists:products,id',
            'sku_code'   => 'required|string|unique:skus,sku_code',
            'price'      => 'required|numeric|min:0',
            'stock'      => 'required|integer|min:0',
            'status'     => 'nullable|boolean',
        ]);

        $sku = Sku::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'SKU created successfully',
            'data' => $sku
        ], Response::HTTP_CREATED);
    }

    /**
     * GET /api/skus/{id}
     * Show SKU detail
     */
    public function show($id)
    {
        $sku = Sku::with(['product', 'values'])->find($id);

        if (!$sku) {
            return response()->json([
                'status' => 'error',
                'message' => 'SKU not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'status' => 'success',
            'data' => $sku
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

        $validated = $request->validate([
            'product_id' => 'sometimes|exists:products,id',
            'sku_code'   => 'sometimes|string|unique:skus,sku_code,' . $sku->id,
            'price'      => 'sometimes|numeric|min:0',
            'stock'      => 'sometimes|integer|min:0',
            'status'     => 'nullable|boolean',
        ]);

        $sku->update($validated);

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
