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
        $result = $conn->executeQuery("SELECT * FROM ".self::$table);

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
        $result = $conn->executeQuery("SELECT * FROM ".self::$table." WHERE code = :id LIMIT 1", array(
            ':id' => $id
        ));

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
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
     * @return string
     * @throws Exception
     */
    public static function insert(array $sale): string
    {
        $builder = QueryBuilder::gi()->insertBuilder($sale, self::$table, array(
            'sale_date' => 'sale_date',
            'data' => 'data'
        ));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) return 'Venda registrada com sucesso!'; else {
            throw new Exception("Falha ao registrar a venda");
        }
    }
}