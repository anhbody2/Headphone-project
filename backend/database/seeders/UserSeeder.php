<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'user_name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => '$2y$10$examplehash',
                'role' => 'admin',
                'image' => null,
            ],
            [
                'id' => 2,
                'user_name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => '$2y$10$examplehash',
                'role' => 'user',
                'image' => null,
            ],
        ]);
    }
}

