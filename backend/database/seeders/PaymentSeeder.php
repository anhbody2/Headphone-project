<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('payments')->insert([
            [
                'id' => 1,
                'user_id' => 2,
                'address' => '123 Nguyen Trai, District 1, HCM City',
            ],
        ]);
    }
}

