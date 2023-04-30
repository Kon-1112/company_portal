<?php

namespace Database\Factories\Communication;

use App\Models\Communication\CompanyCommunication;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CompanyCommunication>
 */
class CompanyCommunicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cc_title' => fake()->sentence,
            'cc_content' => fake()->paragraph,
            'cc_created_by_email' => User::factory()->create()->email,
            'cc_updated_by_email' => User::factory()->create()->email,
            'cc_deleted_by_email' => null,
            'cc_delete_flag' => fake()->boolean,
            'cc_image_url' => fake()->imageUrl,
            'cc_target_json' => json_encode(['target1', 'target2']),
            'cc_draft_flag' => fake()->boolean,
            'cc_created_at' => now(),
            'cc_updated_at' => now(),
            'cc_deleted_at' => null,
        ];
    }
}
