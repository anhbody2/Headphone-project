<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class CartItemSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cart_items')->insert([
            [
                'id' => 1,
                'cart_id' => 1,
                'product_id' => 1,
                'sku_id' => 1,
                'quantity' => 2,
            ],
            [
                'id' => 2,
                'cart_id' => 1,
                'product_id' => 1,
                'sku_id' => 3,
                'quantity' => 1,
            ],
        ]);
    }
}

