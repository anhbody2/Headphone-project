<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sku extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'price',
        'stock',
        'promotion',
        'product_id',
        'img',
    ];

    protected $casts = [
        'img' => 'array',
    ];

    protected $table = 'skus';

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function values()
    {
        return $this->belongsToMany(
            ProductOptionValue::class,
            'sku_values',
            'sku_id',
            'option_value_id'
        );
    }
    protected $dates = ['deleted_at'];
}
