<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sku;
use App\Models\ProductOption;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    protected $table = 'products';
    protected $fillable = [
        'name',
        'description',
    ];
    public function skus()
    {
        return $this->hasMany(Sku::class);
    }

    public function options()
    {
        return $this->hasMany(ProductOption::class);
    }
    protected $dates = ['deleted_at'];
}
