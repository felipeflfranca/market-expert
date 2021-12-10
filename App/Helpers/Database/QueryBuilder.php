<?php
namespace App\Helpers\Database;

use Exception;

/** Assists in building queries */
class QueryBuilder
{
    private static ?QueryBuilder $instance = null;

    private function __construct(){}

    public static function gi(): ?QueryBuilder
    {
        if (self::$instance == null) {
            self::$instance = new QueryBuilder();
        }

        return self::$instance;
    }

    /**
     * Build an insert query template
     * @param array $data data
     * @param string $table table name
     * @param array $condition allowed fields in sql construction
     * @return BuiltModel
     */
    public function insertBuilder(array $data, string $table, array $condition): BuiltModel
    {
        $fields = $this->columnBuilder($condition, $data, [], true);

        $query = "INSERT INTO " . $table . " (" . $fields['columns'] . ")";
        return new BuiltModel($query, $fields['params']);
    }

    /**
     * Build an update query template
     * @param string $table table name
     * @param array $condition allowed fields in sql construction
     * @param array $data data
     * @param array $whereCondition conditions to run sql
     * @return BuiltModel
     * @throws Exception
     */
    public function updateBuilder(array $data, string $table, array $condition, array $whereCondition): BuiltModel
    {
        $fields = $this->columnBuilder($condition, $data);
        $where = $this->columnBuilder($whereCondition, $data, $fields['params']);

        if ($where['columns']) {
            $query = "UPDATE " . $table . " SET " . $fields['columns'] . " WHERE " . $where['columns'];
            return new BuiltModel($query, $where['params']);
        } else {
            $this->setError($whereCondition);
        }
    }

    /**
     * Build an Exclusion Query Template
     * @param array $data data
     * @param string $table table name
     * @param array $condition allowed fields in sql construction
     * @return BuiltModel
     * @throws Exception
     */
    public function deleteBuilder(array $data, string $table, array $condition): BuiltModel
    {
        $where = $this->columnBuilder($condition, $data);

        if ($where['columns']) {
            $query = "DELETE FROM " . $table . " WHERE " . $where['columns'];
            return new BuiltModel($query, $where['params']);
        } else {
            $this->setError($condition);
        }
    }

    /**
     * Builds the structure of the columns and the parameters
     * Does not allow constructions that are not within the stated conditions ($condition)
     * @param array $condition allowed fields in sql construction
     * @param array $data data
     * @param array $params values for the query
     * @param bool $insert
     * @return array
     */
    private function columnBuilder(array $condition, array $data, array $params = [], bool $insert = false): array
    {
        $columns = "";
        $insertParameters = "";

        $dataKeys = array_keys($data);
        foreach ($dataKeys as $key) {
            if (isset($condition[$key])) {
                $parameterKey = trim(':'.$key);

                if ($insert) {
                    if ($columns == '') {
                        $columns = $condition[$key];
                        $insertParameters = $parameterKey;
                    } else {
                        $columns .= ', '.$condition[$key];
                        $insertParameters .= ', '.$parameterKey;
                    }
                } else {
                    $columns .= ($columns ? ', ' : '') . $condition[$key] . ' = ' . $parameterKey;
                }

                $params[$parameterKey] = $data[$key];
                if (!htmlspecialchars($params[$parameterKey])) {
                    $params[$parameterKey] = utf8_encode($params[$parameterKey]);
                }
            }
        }
        if ($insert) {
            $columns = $columns . ') VALUES (' . $insertParameters;
        }

        return array(
            'columns' => trim($columns),
            'params' => $params
        );
    }

    /** @throws Exception */
    private function setError(array $condition)
    {
        $whereKeys = implode(", ", array_keys($condition));

        $message = "O campo ".$whereKeys." não foi informado";
        if (count($condition) > 1) {
            $message = "Os campos ".$whereKeys." não foram informados";
        }

        throw new Exception($message);
    }
}