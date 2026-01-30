<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductOptionValueSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_option_values')->insert([
            ['id' => 1, 'option_id' => 1, 'value' => 'S'],
            ['id' => 2, 'option_id' => 1, 'value' => 'M'],
            ['id' => 3, 'option_id' => 1, 'value' => 'L'],
            ['id' => 4, 'option_id' => 2, 'value' => 'Blue'],
            ['id' => 5, 'option_id' => 2, 'value' => 'Black'],
            ['id' => 6, 'option_id' => 2, 'value' => 'Cream'],
        ]);
    }
}

