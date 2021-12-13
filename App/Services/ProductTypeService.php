<?php
namespace App\Services;

use App\Helpers\DataValidator\Validator;
use App\Interfaces\HttpRequestService;
use App\Models\ProductTypes;
use App\Models\Tax;
use Exception;

class ProductTypeService implements HttpRequestService
{
    /**
     * List one or more product types
     * @param array|null $data request parameters
     * @return array
     * @throws Exception
     */
    public function get(?array $data): array
    {
        if (!empty($data)) {
            // If there is no "id" parameter in the request
            $validationMessages = [
                'id' => 'Você forneceu parâmetro(s) não conhecido(s)',
            ];

            Validator::gi()->checkRequiredFieldsExist($data, $validationMessages);

            $id = intval($data['id']);
            return ProductTypes::getById(intval($id));
        } else {
            return ProductTypes::getAll();
        }
    }

    /**
     * Insert a new product type
     * @return array
     * @throws Exception
     */
    public function post(): array
    {
        $validationMessages = [
            'name' => 'Você precisa informar o nome do tipo de produto',
            'taxes' => 'Você precisa informar a taxa de imposto'
        ];

        Validator::gi()->checkRequiredFieldsExist($_POST, $validationMessages);
        return ProductTypes::insert($_POST);
    }

    /**
     * Update product type
     * @return array
     * @throws Exception
     */
    public function put(): array
    {
        parse_str(file_get_contents('php://input'), $_PUT);
        return ProductTypes::update($_PUT);
    }

    /**
     * Delete product type
     * @return array
     * @throws Exception
     */
    public function delete(): array
    {
        parse_str(file_get_contents('php://input'), $_DELETE);
        return ProductTypes::delete($_DELETE);
    }
}