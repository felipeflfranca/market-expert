<?php
namespace App\Services;

use App\Helpers\DataValidator;
use App\Interfaces\HttpRequestService;
use App\Models\ProductTypes;
use Exception;

class ProductTypeService implements HttpRequestService
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

            DataValidator::gi()->checkRequiredFieldsExist($data, $validationMessages);

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

        DataValidator::gi()->checkRequiredFieldsExist($_POST, $validationMessages);
        $data = DataValidator::gi()->handleEncoding($_POST, ['name', 'taxes']);

        return ProductTypes::insert($data);
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
            'id' => 'É necessário informar o id do tipo de produto que deseja alterar',
            'name' => 'É necessário informar o id do tipo de produto que deseja alterar',
            'taxes' => 'É necessário informar o id do tipo de produto que deseja alterar'
        ];

        DataValidator::gi()->checkRequiredFieldsExist($_PUT, $validationMessages);
        $data = DataValidator::gi()->handleEncoding($_PUT, ['name', 'taxes']);

        return ProductTypes::update($data);
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

        DataValidator::gi()->checkRequiredFieldsExist($_DELETE, $validationMessages);

        return ProductTypes::delete($_DELETE);
    }
}