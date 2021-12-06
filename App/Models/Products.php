<?php
namespace App\Models;

use App\Config\Database;
use PDO;
use Exception;

/**
 * Products
 */
class Products
{
    /**
     * @var string $table table name
     */
    private static string $table = 'products';

    /**
     * List all products
     *
     * @return array
     * @throws Exception
     */
    public static function getAll(): array
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM ".self::$table." INNER JOIN product_types ON product_types.id = products.product_type_id");

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
        $result = $conn->executeQuery("SELECT * FROM ".self::$table." INNER JOIN product_types ON product_types.id = products.product_type_id WHERE code = :code LIMIT 1", array(
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
     * @param array $data
     * @return string
     * @throws Exception
     */
    public static function insert(array $data): string
    {
        $conn = new Database();
        $result = $conn->executeQuery("INSERT INTO ".self::$table." (name) VALUES (:name) ", array(
            ':name' => $data['name']
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
     * @param array $data
     * @return string
     * @throws Exception
     */
    public static function update(array $data): string
    {
        $conn = new Database();
        $result = $conn->executeQuery("UPDATE ".self::$table." SET name = :name, taxes = :taxes WHERE id = :id", array(
            ':name' => $data['name'],
            ':id' => $data['id'],
            ':taxes' => $data['taxes']
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
     * @param array $data
     * @return string
     * @throws Exception
     */
    public static function delete(array $data): string
    {
        $conn = new Database();
        $result = $conn->executeQuery("DELETE FROM ".self::$table." WHERE id = :id ", array(
            ':id' => $data['id']
        ));

        if ($result->rowCount() > 0) {
            return 'Produto deletado com sucesso!';
        } else {
            throw new Exception("Falha ao deletar o produto");
        }
    }
}