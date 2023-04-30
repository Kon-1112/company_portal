<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => hash::make('password'),
            'initial_password_flag' => fake()->boolean,
            'google_id' => null,
            'slack_id' => null,
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            'first_name_kana' => fake()->firstName,
            'last_name_kana' => fake()->lastName,
            'nick_name' => fake()->name,
            'blood_type_id' => fake()->numberBetween(1, 3),
            'gender_id' => fake()->numberBetween(1, 2),
            'birthday' => fake()->dateTimeBetween('-50 years', '-20 years'),
            'introduction' => fake()->realText(2000),
            'avatar_url' => fake()->imageUrl(),
            'department_id' => fake()->numberBetween(1, 10),
            'hire_date' => fake()->dateTimeBetween('-10 years', '-1 years'),
            'retire_date' => null,
            'delete_flag' => fake()->boolean,
            'login_failure_lock_flag' => fake()->boolean,
            'receive_mail_flag' => fake()->boolean,
            'receive_slack_flag' => fake()->boolean,
            'show_notification_area_flag' => fake()->boolean,
            'attendance_flag' => fake()->boolean,
            'attendance_auto_register_flag' => fake()->boolean,
            'attendance_status_id' => fake()->numberBetween(1, 4),
            'seat_flag' => fake()->boolean,
            'seat_id' => fake()->numberBetween(1, 10),
            'normal_seat_id' => fake()->numberBetween(1, 10),
            'telework_flag' => fake()->boolean,
            'normal_workplace_flag' => fake()->numberBetween(1, 2),
            'telework_request_flag' => fake()->boolean,
            'peer_bonus_flag' => fake()->boolean,
            'evaluation_flag' => fake()->boolean,
            'position_id' => fake()->numberBetween(1, 5),
            'stage_id' => fake()->numberBetween(1, 4),
            'evaluation_period_id' => fake()->numberBetween(1, 4),
            'first_evaluation_period_start_date' => fake()->dateTimeBetween('-10 years', '-1 years'),
            'meeting_flag' => fake()->boolean,
            'role_id' => fake()->numberBetween(1, 3),
            'created_at' => fake()->dateTimeBetween('-10 years', '-1 years'),
            'updated_at' => fake()->dateTimeBetween('-10 years', '-1 years'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
