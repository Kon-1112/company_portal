<?php

namespace Database\Factories\Communication;

use App\Models\Communication\ImportantCommunication;
use App\Models\Communication\ImportantCommunicationReadFlg;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ImportantCommunicationReadFlg>
 */
class ImportantCommunicationReadFlgFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'icrf_read_at' => fake()->dateTimeBetween('-14 day', '0 day'),
            'icrf_email' => User::factory()->create()->email,
            'icrf_ic_id' => ImportantCommunication::factory()->create()->ic_id,
        ];
    }
}
