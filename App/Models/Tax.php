<?php
namespace App\Models;

use App\Config\Database;
use App\Helpers\Database\QueryBuilder;
use PDO;
use Exception;

/** Taxes model */
class Tax
{
    /** @var string $table table name */
    private static string $table = 'taxes';

    /**
     * Search tax
     * @param string $tax request parameters
     * @return array
     * @throws Exception
     */
    public static function search(string $tax): array
    {
        $search = strtolower($tax);

        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM " . self::$table . " WHERE LOWER(name) LIKE '%' || :name || '%' ", array(
            ':name' => $search,
        ));

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhuma taxa de imposto encontrada", 200);
        }
    }

    /**
     * List all taxes
     * @return array
     * @throws Exception
     */
    public static function getAll(): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM ".self::$table);

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhuma taxa de imposto encontrada");
        }
    }

    /**
     * Get tax by id
     * @param int $id id of product type
     * @return array
     * @throws Exception
     */
    public static function getById(int $id): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM ".self::$table." WHERE id = :id LIMIT 1", array(
            ':id' => $id
        ));

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Taxa de imposto não encontrada");
        }
    }

    /**
     * Enter a new tax
     * @param array $tax tax data
     * @return string
     * @throws Exception
     */
    public static function insert(array $tax): string
    {
        $builder = QueryBuilder::gi()->insertBuilder($tax, self::$table, array(
            'name' => 'name',
            'value' => 'value'
        ));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) return 'Taxa de imposto cadastrada com sucesso!'; else {
            throw new Exception("Falha ao cadastrar a taxa de imposto");
        }
    }

    /**
     * Update tax
     * @param array $tax tax data
     * @return string
     * @throws Exception
     */
    public static function update(array $tax): string
    {
        $builder = QueryBuilder::gi()->updateBuilder($tax, self::$table, array(
            'name' => 'name',
            'value' => 'value'
        ), array( 'id' => 'id'));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) return 'Taxa de imposto atualizada com sucesso!'; else {
            throw new Exception("Falha ao alterar a taxa de imposto");
        }
    }

    /**
     * Delete tax
     * @param array $tax tax data
     * @return string
     * @throws Exception
     */
    public static function delete(array $tax): string
    {
        $builder = QueryBuilder::gi()->deleteBuilder($tax, self::$table, array( 'id' => 'id'));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) return 'Taxa de imposto deletada com sucesso!'; else {
            throw new Exception("Falha ao deletar a taxa de imposto");
        }
    }
}