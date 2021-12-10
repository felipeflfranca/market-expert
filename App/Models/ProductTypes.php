<?php
namespace App\Models;

use App\Config\Database;
use App\Helpers\Database\QueryBuilder;
use PDO;
use Exception;

/** Product Types model */
class ProductTypes
{
    /** @var string $table table name */
    private static string $table = 'product_types';

    /**
     * List all product types
     * @return array
     * @throws Exception
     */
    public static function getAll(): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM ".self::$table);

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhum tipo de produto encontrado");
        }
    }

    /**
     * Get product type by id
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
            throw new Exception("Nenhum tipo de produto encontrado");
        }
    }

    /**
     * Insert a new product type
     * @param array $productType product type data
     * @return string
     * @throws Exception
     */
    public static function insert(array $productType): string
    {
        $builder = QueryBuilder::gi()->insertBuilder($productType, self::$table, array(
            'name' => 'name',
            'taxes' => 'taxes'
        ));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) return 'Tipo de produto cadastrado com sucesso!'; else {
            throw new Exception("Falha ao cadastrar o tipo de produto");
        }
    }

    /**
     * Update product type
     * @param array $productType product type data
     * @return string
     * @throws Exception
     */
    public static function update(array $productType): string
    {
        $builder = QueryBuilder::gi()->updateBuilder($productType, self::$table, array(
            'name' => 'name',
            'taxes' => 'taxes'
        ), array( 'id' => 'id'));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) return 'Tipo de produto alterado com sucesso!'; else {
            throw new Exception("Falha ao alterar o tipo de produto");
        }
    }

    /**
     * Delete product type
     * @param array $productType product type data
     * @return string
     * @throws Exception
     */
    public static function delete(array $productType): string
    {
        $builder = QueryBuilder::gi()->deleteBuilder($productType, self::$table, array( 'id' => 'id'));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) return 'Tipo de produto deletado com sucesso!'; else {
            throw new Exception("Falha ao deletar o tipo de produto");
        }
    }
}