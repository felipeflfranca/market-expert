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
        $query = "SELECT pt.id, pt.name, json_agg(taxes.id) AS taxes FROM " . self::$table . " pt ".
            "INNER JOIN product_types_taxes ON product_types_taxes.product_type_id = pt.id ".
            "INNER JOIN taxes ON taxes.id = product_types_taxes.tax_id ".
            "GROUP BY pt.id, pt.name ";

        $conn = new Database();
        $result = $conn->executeQuery($query);

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
        $query = "SELECT pt.id, pt.name, json_agg(taxes.id) AS taxes FROM " . self::$table . " pt ".
            "INNER JOIN product_types_taxes ON product_types_taxes.product_type_id = pt.id ".
            "INNER JOIN taxes ON taxes.id = product_types_taxes.tax_id ".
            "WHERE pt.  id = :id  ".
            "GROUP BY pt.id, pt.name LIMIT 1";

        $conn = new Database();
        $result = $conn->executeQuery($query, array(
            ':id' => $id
        ));

        if ($result->rowCount() > 0) return $result->fetch(PDO::FETCH_ASSOC); else {
            throw new Exception("Nenhum tipo de produto encontrado");
        }
    }

    /**
     * Insert a new product type
     * @param array $productType product type data
     * @return array
     * @throws Exception
     */
    public static function insert(array $productType): array
    {
        $conn = new Database();

        $conn->beginTransaction();
        try {
            $builder = QueryBuilder::gi()->insertBuilder($productType, self::$table, array(
                'name' => 'name'
            ));

            $result = $conn->executeQuery($builder->query(), $builder->parameters());

            $productTypeId = $conn->lastInsertId();

            $taxes = preg_replace('/\s+/', '', $productType['taxes']);
            $taxes = explode(',', $taxes);
            foreach ($taxes as $tax) {
                // Link tax rates to product type
                $result = $conn->executeQuery("INSERT INTO product_types_taxes (product_type_id, tax_id) VALUES (:product_id, :tax_id)", array(
                    ':product_id' => intval($productTypeId),
                    ':tax_id' => $tax
                ));
            }

            if ($result->rowCount() > 0) {
                $conn->commit();
                return array(
                    'message' => 'Tipo de produto cadastrado com sucesso!',
                    'id' => $productTypeId
                );
            } else {
                $conn->rollBack();
                throw new Exception("Falha ao alterar o tipo de produto");
            }
        } catch (Exception $e) {
            $conn->rollBack();
            throw new Exception("Falha ao cadastrar o tipo de produto");
        }
    }

    /**
     * Update product type
     * @param array $productType product type data
     * @return array
     * @throws Exception
     */
    public static function update(array $productType): array
    {
        $conn = new Database();

        $conn->beginTransaction();
        try {
            $builder = QueryBuilder::gi()->updateBuilder($productType, self::$table, array(
                'name' => 'name'
            ), array( 'id' => 'id'));

            $productTypeId = $productType['id'];

            $result = $conn->executeQuery($builder->query(), $builder->parameters());

            // Delete tax rates to product type
            $conn->executeQuery("DELETE FROM product_types_taxes WHERE product_type_id = :product_id", array(
                ':product_id' => intval($productTypeId)
            ));

            $taxes = preg_replace('/\s+/', '', $productType['taxes']);
            $taxes = explode(',', $taxes);
            foreach ($taxes as $tax) {
                // Link tax rates to product type
                $result = $conn->executeQuery("INSERT INTO product_types_taxes (product_type_id, tax_id) VALUES (:product_id, :tax_id)", array(
                    ':product_id' => intval($productTypeId),
                    ':tax_id' => $tax
                ));
            }

            if ($result->rowCount() > 0) {
                $conn->commit();
                return array(
                    'message' => 'Tipo de produto alterado com sucesso!',
                    'id' => $productTypeId
                );
            } else {
                $conn->rollBack();
                throw new Exception("Falha ao alterar o tipo de produto");
            }
        } catch (Exception $e) {
            $conn->rollBack();
            throw new Exception("Falha ao alterar o tipo de produto");
        }
    }

    /**
     * Delete product type
     * @param array $productType product type data
     * @return array
     * @throws Exception
     */
    public static function delete(array $productType): array
    {
        $builder = QueryBuilder::gi()->deleteBuilder($productType, self::$table, array( 'id' => 'id'));

        $conn = new Database();
        $result = $conn->executeQuery($builder->query(), $builder->parameters());

        if ($result->rowCount() > 0) {
            return array(
                'message' => 'Tipo de produto deletado com sucesso!'
            );
        } else {
            throw new Exception("Falha ao deletar o tipo de produto");
        }
    }
}