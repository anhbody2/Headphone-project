<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class SkuValueSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('sku_values')->insert([
            ['sku_id' => 1, 'option_value_id' => 1],
            ['sku_id' => 1, 'option_value_id' => 4],

            ['sku_id' => 2, 'option_value_id' => 2],
            ['sku_id' => 2, 'option_value_id' => 5],

            ['sku_id' => 3, 'option_value_id' => 3],
            ['sku_id' => 3, 'option_value_id' => 6],
        ]);
    }
}
