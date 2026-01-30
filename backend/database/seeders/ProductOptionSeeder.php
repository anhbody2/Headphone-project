<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductOptionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_options')->insert([
            ['id' => 1, 'product_id' => 1, 'name' => 'Size'],
            ['id' => 2, 'product_id' => 1, 'name' => 'Color'],
        ]);
    }
}

