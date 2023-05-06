<?php

namespace Database\Factories\Communication;

use App\Models\Communication\ImportantCommunication;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ImportantCommunication>
 */
class ImportantCommunicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ic_title' => fake()->sentence,
            'ic_content' => fake()->realText(2000),
            'ic_deadline_at' => fake()->dateTimeBetween('-1 month', '+1 month'),
            'ic_category_id' => fake()->numberBetween(1, 7),
            'ic_created_by_email' => User::factory()->create()->email,
            'ic_updated_by_email' => User::factory()->create()->email,
            'ic_image_url' => fake()->imageUrl,
            'ic_target_json' => json_encode(['target1', 'target2']),
            'ic_draft_flag' => fake()->boolean,
            'ic_created_at' => now(),
            'ic_updated_at' => now(),
        ];
    }

}
