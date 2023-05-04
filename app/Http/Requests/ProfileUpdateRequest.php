<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * プロフィール更新リクエスト
 * @package App\Http\Requests
 */
class ProfileUpdateRequest extends FormRequest
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'email'             => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'first_name'        => ['string', 'min:1', 'max:20'],
            'last_name'         => ['string', 'min:1', 'max:20'],
            'first_name_kana'   => ['string', 'min:1', 'max:20'],
            'last_name_kana'    => ['string', 'min:1', 'max:20'],
            'nick_name'         => ['string', 'min:1', 'max:20'],
            'birthday'          => ['date'],
            'blood_type_id'     => ['numeric', 'min:1'],
            'gender_id'         => ['numeric', 'min:1'],
            'introduction'      => ['string', 'max:2000'],
            'font_name'         => ['string', 'max:255'],
            'theme_mode'        => ['string', 'max:255'],
        ];
    }
}
