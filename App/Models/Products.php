<?php

namespace App\Models;

use App\Config\Database;
use App\Helpers\Database\QueryBuilder;
use PDO;
use Exception;

/** Products model */
class Products
{
    /** @var string $table table name */
    private static string $table = 'products';

    /**
     * Search product by code, name or type
     * @param string $product request parameters
     * @return array
     * @throws Exception
     */
    public static function search(string $product): array
    {
        $product = strtolower($product);

        $query = "SELECT p.id, p.code, p.description, p.value, json_agg(json_build_object(taxes.name, taxes.value)) AS taxes FROM " . self::$table . " p ".
            "INNER JOIN product_types ON product_types.id = p.product_type_id ".
            "INNER JOIN product_types_taxes ON product_types_taxes.product_type_id = product_types.id ".
            "INNER JOIN taxes ON taxes.id = product_types_taxes.tax_id ".
            "WHERE LOWER(p.code) LIKE '%' || :code || '%' OR LOWER(p.description) LIKE '%' || :description || '%' OR LOWER(product_types.name) LIKE '%' || :type_name || '%' ".
            "GROUP BY p.id, p.code, p.description, p.value";

        $conn = new Database();
        $result = $conn->executeQuery($query, array(
            ':code' => $product,
            ':description' => $product,
            ':type_name' => $product
        ));

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhum produto encontrado", 200);
        }
    }

    /**
     * List all products
     * @return array
     * @throws Exception
     */
    public static function getAll(): array
    {
        $query = "SELECT p.id, p.code, p.description, p.value, json_agg(json_build_object(taxes.name, taxes.value)) AS taxes FROM " . self::$table . " p ".
            "INNER JOIN product_types ON product_types.id = p.product_type_id ".
            "INNER JOIN product_types_taxes ON product_types_taxes.product_type_id = product_types.id ".
            "INNER JOIN taxes ON taxes.id = product_types_taxes.tax_id GROUP BY p.id, p.code, p.description, p.value";

        $conn = new Database();
        $result = $conn->executeQuery($query);

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhum produto encontrado");
        }
    }

    /**
     * Get product by code
     * @param int $code request parameters
     * @return array
     * @throws Exception
     */
    public static function getByCode(int $code): array
    {
        $query = "SELECT p.id, p.code, p.description, p.value, json_agg(json_build_object(taxes.name, taxes.value)) AS taxes FROM " . self::$table . " p ".
            "INNER JOIN product_types ON product_types.id = p.product_type_id ".
            "INNER JOIN product_types_taxes ON product_types_taxes.product_type_id = product_types.id ".
            "INNER JOIN taxes ON taxes.id = product_types_taxes.tax_id WHERE p.code = :code GROUP BY p.id, p.code, p.description, p.value";

        $conn = new Database();
        $result = $conn->executeQuery($query, array(
            ':code' => $code
        ));

        if ($result->rowCount() > 0) return $result->fetchAll(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhum produto encontrado");
        }
    }

    /**
     * Insert a new product
     * @param array $product product data
     * @return array
     * @throws Exception
     */
    public static function insert(array $product): array
    {
        $builder = QueryBuilder::gi()->insertBuilder($product, self::$table, array(
            'code' => 'code',
            'description' => 'description',
            'value' => 'value',
            'type_id' => 'product_type_id'
        ));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) {
            return array(
                'message' => 'Produto cadastrado com sucesso!',
                'id' => $conn->lastInsertId()
            );
        } else {
            throw new Exception("Falha ao cadastrar o produto");
        }
    }

    /**
     * Update product
     * @param array $product product data
     * @return array
     * @throws Exception
     */
    public static function update(array $product): array
    {
        $builder = QueryBuilder::gi()->updateBuilder($product, self::$table, array(
            'code' => 'code',
            'description' => 'description',
            'value' => 'value',
            'type_id' => 'product_type_id'
        ), array( 'id' => 'id'));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) {
            return array(
                'message' => 'Produto alterado com sucesso!',
                'id' => $product['id']
            );
        } else {
            throw new Exception("Falha ao alterar o produto");
        }
    }

    /**
     * Delete product
     * @param array $product product data
     * @return array
     * @throws Exception
     */
    public static function delete(array $product): array
    {
        $builder = QueryBuilder::gi()->deleteBuilder($product, self::$table, array( 'id' => 'id'));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) {
            return array(
                'message' => 'Produto deletado com sucesso!'
            );
        } else {
            throw new Exception("Falha ao deletar o produto");
        }
    }
}