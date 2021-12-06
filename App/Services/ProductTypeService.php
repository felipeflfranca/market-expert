<?php
namespace App\Services;

use App\Helpers\HttpRequestValidator;
use App\Models\ProductTypes;
use Exception;

class ProductTypeService
{
    /**
     * List one or more product types
     *
     * @param array|null $data request parameters
     * @return array
     * @throws Exception
     */
    public function get(?array $data): array
    {
        if (!empty($data)) {
            /**
             * If there is no "id" parameter in the request
             */
            $validationMessages = [
                'id' => 'Você forneceu parâmetro(s) não conhecido(s)',
            ];

            HttpRequestValidator::gi()->checkRequiredFieldsExist($data, $validationMessages);

            $id = intval($data['id']);
            return ProductTypes::getById(intval($id));
        } else {
            return ProductTypes::getAll();
        }
    }

    /**
     * Insert a new product type
     *
     * @return string
     * @throws Exception
     */
    public function post(): string
    {
        $validationMessages = [
            'name' => 'É necessário informar o nome do tipo de produto',
            'taxes' => 'É necessário informar os percentuais de imposto dos tipos de produto'
        ];

        HttpRequestValidator::gi()->checkRequiredFieldsExist($_POST, $validationMessages);

        return ProductTypes::insert($_POST);
    }

    /**
     * Update product type
     *
     * @return string
     * @throws Exception
     */
    public function put(): string
    {
        parse_str(file_get_contents('php://input'), $_PUT);

        $validationMessages = [
            'id' => 'É necessário informar o id do tipo de produto que deseja alterar'
        ];

        HttpRequestValidator::gi()->checkRequiredFieldsExist($_PUT, $validationMessages);

        return ProductTypes::update($_PUT);
    }

    /**
     * Delete product type
     *
     * @return string
     * @throws Exception
     */
    public function delete(): string
    {
        parse_str(file_get_contents('php://input'), $_DELETE);

        $validationMessages = [
            'id' => 'É necessário informar o id do tipo de produto que deseja deletar',
        ];

        HttpRequestValidator::gi()->checkRequiredFieldsExist($_DELETE, $validationMessages);

        return ProductTypes::delete($_DELETE);
    }
}