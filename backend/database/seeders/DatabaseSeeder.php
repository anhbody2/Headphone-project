<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    $this->call([
        UserSeeder::class,
        ProductSeeder::class,
        ProductOptionSeeder::class,
        ProductOptionValueSeeder::class,
        SkuSeeder::class,
        SkuValueSeeder::class,
        CartSeeder::class,
        CartItemSeeder::class,
        PaymentSeeder::class,
        OrderSeeder::class,
        OrderItemSeeder::class,
    ]);
}

}
