<?php
namespace App\Helpers;

use Exception;

/**
 * Assists in building queries
 */
class QueryBuilder
{
    /**
     * @var QueryBuilder|null $instance hold the class instance
     */
    private static ?QueryBuilder $instance = null;

    /**
     * Prevent initiation with outer code.
     */
    private function __construct()
    {
    }

    /**
     * @return QueryBuilder|null
     */
    public static function gi(): ?QueryBuilder
    {
        if (self::$instance == null) {
            self::$instance = new QueryBuilder();
        }

        return self::$instance;
    }

    /**
     * Builds a query update string
     *
     * @param string $table table name
     * @param array $condition allowed fields in sql construction
     * @param array $data fields
     * @param array $whereCondition conditions to run sql
     * @return string
     */
    private function updateBuilder(string $table, array $condition, array $data, array $whereCondition): string
    {
        $dataKeys = array_keys($data);

        /**
         * Does not allow constructions that are not within the stated conditions ($condition)
         */
        $fields = "";
        $params = [];
        foreach ($dataKeys as $key) {
            if (isset($condition[$key])) {
                $fields .= ($fields ? ', ' : '') . $condition[$key] . ' :'.$key;
            }
        }

        /**
         * Does not allow constructions that are not within the stated conditions ($whereCondition)
         */
        $where = "";
        foreach ($whereCondition as $key) {
            if (isset($whereCondition[$key])) {
                $where .= ($where ? ', ' : '') . $whereCondition[$key] . ' :'.$key;
            }
        }

        $query = "UPDATE ".$table." SET ".$fields.' WHERE '.$where;

        return trim($query);
    }
}