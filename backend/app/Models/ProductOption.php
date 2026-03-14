<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductOption extends Model
{
    protected $table = 'product_options';

    public function values()
    {
        return $this->hasMany(ProductOptionValue::class, 'option_id');
    }
}
