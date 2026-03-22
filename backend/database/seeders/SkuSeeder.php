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
                'name' => 'WH-1000XM6 S Blue',
                'stock' => 96,
                'buyturn' => 15,
                'price' => 19.99,
                'promotion' => 0.00,
                'img' => json_encode([
                    "https://i.pinimg.com/736x/7c/76/9a/7c769abd3fcb9a3daef11f4159402036.jpg"
                ]),
                'product_id' => 1,
                'created_at' => '2026-01-30 07:35:52',
                'updated_at' => '2026-03-10 03:20:57',
                'deleted_at' => null,
            ],
            [
                'id' => 2,
                'name' => 'WH-1000XM6 M Black',
                'stock' => 1,
                'buyturn' => 5,
                'price' => 21.97,
                'promotion' => 2.00,
                'img' => json_encode([
                    "https://i.pinimg.com/736x/b9/35/08/b935082e5f06593a09dc81ef6ca6c29a.jpg"
                ]),
                'product_id' => 1,
                'created_at' => '2026-01-30 07:35:52',
                'updated_at' => '2026-03-10 03:20:57',
                'deleted_at' => null,
            ],
            [
                'id' => 3,
                'name' => 'WH-1000XM6 L Cream',
                'stock' => 0,
                'buyturn' => 0,
                'price' => 4000.00,
                'promotion' => 0.00,
                'img' => json_encode([
                    "https://i.pinimg.com/736x/74/7c/94/747c940a103274b90f5ddced727871c3.jpg"
                ]),
                'product_id' => 1,
                'created_at' => '2026-02-02 02:09:22',
                'updated_at' => '2026-03-12 15:18:27',
                'deleted_at' => null,
            ],
            [
                'id' => 5,
                'name' => 'WH-1000XM4 S Orange',
                'stock' => 3,
                'buyturn' => 0,
                'price' => 40.00,
                'promotion' => 3.40,
                'img' => json_encode([
                    "https://i.pinimg.com/1200x/b9/7c/af/b97caf99965810f36268910c25f07172.jpg"
                ]),
                'product_id' => 3,
                'created_at' => '2026-02-27 08:24:26',
                'updated_at' => '2026-03-08 03:55:36',
                'deleted_at' => null,
            ],
            [
                'id' => 6,
                'name' => 'WH-CH720N L Black',
                'stock' => 5,
                'buyturn' => 0,
                'price' => 120.00,
                'promotion' => 10.00,
                'img' => json_encode([
                    "https://i.pinimg.com/1200x/cf/75/aa/cf75aa1509baea05ea8ae730a94e73db.jpg"
                ]),
                'product_id' => 4,
                'created_at' => '2026-03-13 06:48:04',
                'updated_at' => '2026-03-13 06:48:04',
                'deleted_at' => null,
            ],
            [
                'id' => 7,
                'name' => 'WH-CH720N L Pink',
                'stock' => 10,
                'buyturn' => 0,
                'price' => 120.00,
                'promotion' => 10.00,
                'img' => json_encode([
                    "https://i.pinimg.com/1200x/27/27/ab/2727ab055beb850cbd2ef3e9fd0323f3.jpg"
                ]),
                'product_id' => 4,
                'created_at' => '2026-03-13 06:50:43',
                'updated_at' => '2026-03-13 06:50:43',
                'deleted_at' => null,
            ],
            [
                'id' => 8,
                'name' => 'WH-CH720N M White',
                'stock' => 10,
                'buyturn' => 0,
                'price' => 120.00,
                'promotion' => 10.00,
                'img' => json_encode([
                    "https://i.pinimg.com/736x/c3/46/a0/c346a0fc3dac610e9743316f0b2c3a50.jpg"
                ]),
                'product_id' => 4,
                'created_at' => '2026-03-13 06:52:20',
                'updated_at' => '2026-03-13 06:57:42',
                'deleted_at' => null,
            ],
            [
                'id' => 9,
                'name' => 'ULT WEAR M Green',
                'stock' => 10,
                'buyturn' => 0,
                'price' => 300.00,
                'promotion' => 40.00,
                'img' => json_encode([
                    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6576/6576180cv11d.jpg;maxHeight=1920;maxWidth=900?format=webp"
                ]),
                'product_id' => 5,
                'created_at' => '2026-03-13 07:01:08',
                'updated_at' => '2026-03-13 07:01:08',
                'deleted_at' => null,
            ],
            [
                'id' => 10,
                'name' => 'ULT WEAR L Black',
                'stock' => 10,
                'buyturn' => 0,
                'price' => 250.00,
                'promotion' => 10.00,
                'img' => json_encode([
                    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6576/6576179cv11d.jpg;maxHeight=1920;maxWidth=900?format=webp"
                ]),
                'product_id' => 5,
                'created_at' => '2026-03-13 07:01:43',
                'updated_at' => '2026-03-13 07:01:43',
                'deleted_at' => null,
            ],
            [
                'id' => 11,
                'name' => 'ULT WEAR L White',
                'stock' => 10,
                'buyturn' => 0,
                'price' => 250.00,
                'promotion' => 30.00,
                'img' => json_encode([
                    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6576/6576181cv11d.jpg;maxHeight=1920;maxWidth=900?format=webp"
                ]),
                'product_id' => 5,
                'created_at' => '2026-03-13 07:02:13',
                'updated_at' => '2026-03-13 07:02:13',
                'deleted_at' => null,
            ],
        ]);
    }
}
