<?php
namespace App\Helpers;

use Exception;

/**
 * Data Validator
 */
class DataValidator
{
    /**
     * @var DataValidator|null $instance hold the class instance
     */
    private static ?DataValidator $instance = null;

    /**
     * Prevent initiation with outer code.
     */
    private function __construct()
    {
    }

    /**
     * @return DataValidator|null
     */
    public static function gi(): ?DataValidator
    {
        if (self::$instance == null) {
            self::$instance = new DataValidator();
        }

        return self::$instance;
    }

    /**
     * Checks if the sent keys exist in the array $data
     *
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