<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Cart;
use App\Models\Sku;
use Illuminate\Database\Eloquent\SoftDeletes;

class CartItem extends Model
{
    use SoftDeletes;
    protected $fillable = ['cart_id', 'product_id', 'sku_id', 'quantity'];
    protected $dates = ['deleted_at'];
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
    public function sku()
    {
        return $this->belongsTo(Sku::class);
    }
}
