<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkuSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('skus')->insert([
            [
                'id' => 1,
                'name' => 'WH-1000XM6 S Red',
                'stock' => 100,
                'buyturn' => 10,
                'price' => 19.99,
                'product_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'WH-1000XM6 M Black',
                'stock' => 80,
                'buyturn' => 5,
                'price' => 21.99,
                'product_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'WH-1000XM6 L Cream',
                'stock' => 50,
                'buyturn' => 2,
                'price' => 39.99,
                'product_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
