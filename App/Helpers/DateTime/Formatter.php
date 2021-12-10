<?php

namespace App\Helpers\DateTime;

use DateTime;
use DateTimeZone;
use Exception;

/** Helper with date and time */
class Formatter
{
    private static ?Formatter $instance = null;

    private function __construct() {}

    public static function gi(): ?Formatter
    {
        if (self::$instance == null) {
            self::$instance = new Formatter();
        }

        return self::$instance;
    }

    /**
     * Convert date from "string" type to "DateTime" type
     * @param string $dateTime
     * @param string $format
     * @return string
     * @throws Exception
     */
    public function localToUtc(string $dateTime, string $format = 'Y-m-d H:i:s'): string
    {
        try {
            $utc = new DateTimeZone("UTC");
            $newTimezone = new DateTimeZone(date_default_timezone_get());
            $date = new DateTime($dateTime, $utc);
            $date->setTimezone($newTimezone);
            return $date->format($format);
        } catch (Exception $e) {
            throw new Exception("Erro ao converter data e hora");
        }
    }
}