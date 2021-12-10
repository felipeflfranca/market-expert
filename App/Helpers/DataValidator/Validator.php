<?php

namespace App\Helpers\DataValidator;

use Exception;

/** Data Validator */
class Validator
{
    private static ?Validator $instance = null;

    private function __construct() {}

    public static function gi(): ?Validator
    {
        if (self::$instance == null) {
            self::$instance = new Validator();
        }

        return self::$instance;
    }

    /**
     * Checks if the sent keys exist in the array $data
     * @param  array $data request data
     * @param array $keys request keys and error messages [key => message]
     * @throws Exception
     */
    public function checkRequiredFieldsExist(array $data, array $keys): void
    {
        $fields = array_keys($keys);
        foreach ($fields as $field) {
            if (!array_key_exists($field, $data)) {
                throw new Exception($keys[$field]);
            }
        }
    }
}