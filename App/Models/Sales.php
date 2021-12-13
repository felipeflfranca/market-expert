<?php
namespace App\Models;

use App\Config\Database;
use App\Helpers\Database\QueryBuilder;
use DateTime;
use PDO;
use Exception;

/** Sales model */
class Sales
{
    /** @var string $table table name */
    private static string $table = 'sales';

    /**
     * List all sales
     * @return array
     * @throws Exception
     */
    public static function getAll(): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT id, to_char(date AT TIME ZONE 'utc' AT TIME ZONE :timezone, 'DD/MM/YYYY HH24:MI:SS') AS date, sales.data FROM ".self::$table, array(
            ':timezone' => date_default_timezone_get()
        ));

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhuma venda encontrada");
        }
    }

    /**
     * Get sale by id
     * @param int $id sale by id
     * @return array
     * @throws Exception
     */
    public static function getById(int $id): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT id, to_char(date AT TIME ZONE 'utc' AT TIME ZONE :timezone, 'DD/MM/YYYY HH24:MI:SS') AS date, sales.data FROM ".self::$table." WHERE id = :id LIMIT 1", array(
            ':id' => $id,
            ':timezone' => date_default_timezone_get()
        ));

        if ($result->rowCount() > 0) return $result->fetch(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhuma venda encontrada");
        }
    }

    /**
     * Get the sale by sale date
     * @param string $saleDate sale date
     * @return array
     * @throws Exception
     */
    public static function getByDate(string $saleDate): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM ".self::$table." WHERE sale_date = :saleDate LIMIT 1", array(
            ':saleDate' => $saleDate
        ));

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhuma venda encontrada");
        }
    }

    /**
     * Insert a new sale
     * @param array $sale sale data
     * @return array
     * @throws Exception
     */
    public static function insert(array $sale): array
    {
        $builder = QueryBuilder::gi()->insertBuilder($sale, self::$table, array(
            'date' => 'date',
            'data' => 'data'
        ));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) {
            return array(
                'message' => 'Venda registrada com sucesso!',
                'id' => $conn->lastInsertId()
            );
        } else {
            throw new Exception("Falha ao registrar a venda");
        }
    }
}