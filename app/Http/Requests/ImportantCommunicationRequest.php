<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ImportantCommunicationRequest extends FormRequest
{
    /**
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'ic_title'          => ['required', 'string', 'max:255'],
            'ic_content'        => ['required', 'string', 'max:2000'],
            'ic_image_url'      => ['nullable', 'string', 'max:255'],
            'ic_target_json'    => ['nullable', 'string', 'max:2000'],
        ];
    }
}
