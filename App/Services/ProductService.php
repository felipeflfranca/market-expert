<?php
namespace App\Services;

use App\Helpers\DataValidator;
use App\Interfaces\HttpRequestService;
use App\Models\Products;
use Exception;

class ProductService implements HttpRequestService
{
    /**
     * List one or more product
     *
     * @param array|null $data request parameters
     * @return array
     * @throws Exception
     */
    public function get(?array $data): array
    {
        if (!empty($data)) {
            /**
             * If there is no "code" parameter in the request
             */
            $validationMessages = [
                'code' => 'Você forneceu parâmetro(s) não conhecido(s)',
            ];

            DataValidator::gi()->checkRequiredFieldsExist($data, $validationMessages);

            $code = intval($data['code']);
            return Products::getByCode(intval($code));
        } else {
            return Products::getAll();
        }
    }

    /**
     * Insert a new product
     *
     * @return string
     * @throws Exception
     */
    public function post(): string
    {
        $validationMessages = [
            'code' => 'É necessário informar o código produto que deseja cadastrar',
            'description' => 'É necessário informar a descrição do produto que deseja cadastrar',
            'value' => 'É necessário informar o valor do produto que deseja cadastrar',
            'product_type_id' => 'É necessário informar o tipo do produto que deseja cadastrar'
        ];

        DataValidator::gi()->checkRequiredFieldsExist($_POST, $validationMessages);

        return Products::insert($_POST);
    }

    /**
     * Update product
     *
     * @return string
     * @throws Exception
     */
    public function put(): string
    {
        parse_str(file_get_contents('php://input'), $_PUT);

        $validationMessages = [
            'id' => 'É necessário informar o id do produto que deseja alterar',
            'code' => 'É necessário informar o código produto que deseja cadastrar',
            'description' => 'É necessário informar a descrição do produto que deseja cadastrar',
            'value' => 'É necessário informar o valor do produto que deseja cadastrar',
            'product_type_id' => 'É necessário informar o tipo do produto que deseja cadastrar'
        ];

        DataValidator::gi()->checkRequiredFieldsExist($_PUT, $validationMessages);

        return Products::update($_PUT);
    }

    /**
     * Delete product
     *
     * @return string
     * @throws Exception
     */
    public function delete(): string
    {
        parse_str(file_get_contents('php://input'), $_DELETE);

        $validationMessages = [
            'id' => 'É necessário informar o id do produto que deseja deletar',
        ];

        DataValidator::gi()->checkRequiredFieldsExist($_DELETE, $validationMessages);

        return Products::delete($_DELETE);
    }
}