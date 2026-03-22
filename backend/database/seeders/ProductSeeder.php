<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductSeeder extends Seeder
{
    public function run(): void
    {

        DB::table('products')->insert([
            [
                'id' => 1,
                'name' => 'WH-1000XM6',
                'status' => null,
                'description' => 'The National Football League and Sony announced a partnership naming Sony the Official Headphones of the NFL. Together, Sony and the NFL will work with coaches, players, teams, and leadership to shape the future of football.',
                'created_at' => '2026-01-30 07:35:52',
                'updated_at' => '2026-03-08 03:44:13',
                'deleted_at' => null,
            ],
            [
                'id' => 2,
                'name' => 'WH-1000XM4',
                'status' => null,
                'description' => 'Football League and Sony announced a partnership naming Sony the Official Headphones of the NFL. Together, Sony and the NFL will work with coaches, players, teams, and leadership to shape the future of football.',
                'created_at' => '2026-01-30 07:35:52',
                'updated_at' => '2026-03-08 03:55:00',
                'deleted_at' => null,
            ],
            [
                'id' => 3,
                'name' => 'WH-1000XM7',
                'status' => null,
                'description' => 'Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.',
                'created_at' => '2026-03-06 14:59:57',
                'updated_at' => '2026-03-08 15:36:54',
                'deleted_at' => null,
            ],
            [
                'id' => 4,
                'name' => 'WH-CH720N',
                'status' => null,
                'description' => 'With noise-cancelling technology, a lightweight design and a long-lasting battery life you can enjoy your music for longer and without background interruptions.',
                'created_at' => '2026-03-13 06:33:45',
                'updated_at' => '2026-03-13 06:33:45',
                'deleted_at' => null,
            ],
            [
                'id' => 5,
                'name' => 'ULT WEAR',
                'status' => null,
                'description' => 'Press ULT and feel the incredible power of sound and bass. ULT1 delivers deep low frequency, and ULT2 brings ultra-bass. Set the vibe with 360 Reality Audio, personalized EQs, and premium noise Cancelling sound-technologies for the ultimate audio experience. Find yourself at the center of your music wherever you are.',
                'created_at' => '2026-03-13 06:38:04',
                'updated_at' => '2026-03-13 06:38:04',
                'deleted_at' => null,
            ],
            [
                'id' => 6,
                'name' => 'Sony1A',
                'status' => null,
                'description' => 'Drawing inspiration from a legacy of personal audio reproduction, Sony engineers have developed the perfect balance of premium style and hi-resolution audio performance. Introducing the MDR-1A Stereo Headphone featuring thoughtful design, lush long-term comfort, and ultra-responsive Hi-Res audio response for a sound experience bar-none.',
                'created_at' => '2026-03-13 06:45:44',
                'updated_at' => '2026-03-13 06:45:44',
                'deleted_at' => null,
            ],
        ]);
    }
}

