<?php

namespace App\Models;

use App\Config\Database;
use PDO;
use Exception;

/**
 * Products model
 */
class Products
{
    /**
     * @var string $table table name
     */
    private static string $table = 'products';


    /**
     * Search product by code, name or type
     *
     * @param string $product request parameters
     * @return array
     * @throws Exception
     */
    public static function search(string $product): array
    {
        $product = strtolower($product);

        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM " . self::$table .
            " INNER JOIN product_types ON product_types.id = products.product_type_id" .
            " WHERE LOWER(products.code) LIKE '%' || :code || '%' OR LOWER(products.description) LIKE '%' || :description || '%' OR LOWER(product_types.name) LIKE '%' || :type_name || '%'", array(
            ':code' => $product,
            ':description' => $product,
            ':type_name' => $product
        ));

        if ($result->rowCount() > 0) {
            return $result->fetchAll(PDO::FETCH_ASSOC);
        } else {
            throw new Exception("Nenhum produto encontrado", 200);
        }
    }

    /**
     * List all products
     *
     * @return array
     * @throws Exception
     */
    public static function getAll(): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM " . self::$table . " INNER JOIN product_types ON product_types.id = products.product_type_id");

        if ($result->rowCount() > 0) {
            return $result->fetchAll(PDO::FETCH_ASSOC);
        } else {
            throw new Exception("Nenhum produto encontrado");
        }
    }

    /**
     * Get product by code
     *
     * @param int $code request parameters
     * @return array
     * @throws Exception
     */
    public static function getByCode(int $code): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM " . self::$table . " INNER JOIN product_types ON product_types.id = products.product_type_id WHERE code = :code LIMIT 1", array(
            ':code' => $code
        ));

        if ($result->rowCount() > 0) {
            return $result->fetchAll(PDO::FETCH_ASSOC);
        } else {
            throw new Exception("Nenhum produto encontrado");
        }
    }

    /**
     * Insert a new product
     *
     * @param array $product product data
     * @return string
     * @throws Exception
     */
    public static function insert(array $product): string
    {
        $conn = new Database();
        $result = $conn->executeQuery("INSERT INTO " . self::$table . " (name) VALUES (:name) ", array(
            ':name' => $product['name']
        ));

        if ($result->rowCount() > 0) {
            return 'Produto cadastrado com sucesso!';
        } else {
            throw new Exception("Falha ao cadastrar o produto");
        }
    }

    /**
     * Update product
     *
     * @param array $product product data
     * @return string
     * @throws Exception
     */
    public static function update(array $product): string
    {
        $conn = new Database();
        $result = $conn->executeQuery("UPDATE " . self::$table . " SET name = :name, taxes = :taxes WHERE id = :id", array(
            ':name' => $product['name'],
            ':id' => $product['id'],
            ':taxes' => $product['taxes']
        ));

        if ($result->rowCount() > 0) {
            return 'Produto alterado com sucesso!';
        } else {
            throw new Exception("Falha ao alterar o produto");
        }
    }

    /**
     * Delete product
     *
     * @param array $product product data
     * @return string
     * @throws Exception
     */
    public static function delete(array $product): string
    {
        $conn = new Database();
        $result = $conn->executeQuery("DELETE FROM " . self::$table . " WHERE id = :id ", array(
            ':id' => $product['id']
        ));

        if ($result->rowCount() > 0) {
            return 'Produto deletado com sucesso!';
        } else {
            throw new Exception("Falha ao deletar o produto");
        }
    }
}