<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Order;
use App\Models\Sku;
class OrderItem extends Model
{
    protected $table = 'order_items';
    protected $fillable = ['order_id', 'product_id', 'sku_id', 'price', 'quantity'];
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    public function sku(): BelongsTo
    {
        return $this->belongsTo(Sku::class, 'sku_id');
    }
}
