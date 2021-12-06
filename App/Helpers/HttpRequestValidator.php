<?php
namespace App\Helpers;

use Exception;

/**
 * Requests Validator
 */
class HttpRequestValidator
{
    /**
     * @var HttpRequestValidator|null $instance hold the class instance
     */
    private static ?HttpRequestValidator $instance = null;

    /**
     * Prevent initiation with outer code.
     */
    private function __construct()
    {
    }

    /**
     * @return HttpRequestValidator|null
     */
    public static function gi(): ?HttpRequestValidator
    {
        if (self::$instance == null) {
            self::$instance = new HttpRequestValidator();
        }

        return self::$instance;
    }

    /**
     * Check for the existence of mandatory fields
     *
     * @param  array $data request data
     * @param array $keys request keys and error messages [key => message]
     * @throws Exception
     */
    public function check(array $data, array $keys): void
    {
        $fields = array_keys($keys);
        foreach ($fields as $field) {
            if (!array_key_exists($field, $data)) {
                throw new Exception($keys[$field]);
            }
        }
    }
}