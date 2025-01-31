<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'full_name' => 'Admin',
            'email' => 'admin',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'team_name' => 'admin_team',
            'whatsapp_number' => '0000000000',
            'line_id' => 'admin_line',
            'github_id' => 'admin_github',
            'birth_place' => 'System',
            'birth_date' => now(),
            'cv_path' => 'admin_cv',
            'id_path' => 'admin_id',
        ]);
    }
}
