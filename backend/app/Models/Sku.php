<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sku extends Model
{
    protected $fillable = [
        'name',
        'stock',
        'buyturn',
        'price',
        'product_id'
    ];
}
