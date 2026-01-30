<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class OrderItemSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('order_items')->insert([
            [
                'id' => 1,
                'order_id' => 1,
                'product_id' => 1,
                'sku_id' => 1,
                'price' => 19.99,
                'quantity' => 2,
            ],
            [
                'id' => 2,
                'order_id' => 1,
                'product_id' => 1,
                'sku_id' => 3,
                'price' => 39.99,
                'quantity' => 1,
            ],
        ]);
    }
}

