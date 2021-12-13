<?php
namespace App\Services;

use App\Helpers\DataValidator\Validator;
use App\Interfaces\HttpRequestService;
use App\Models\Products;
use Exception;

class ProductService implements HttpRequestService
{
    /**
     * List one or more product
     * @param array|null $data request parameters
     * @return array
     * @throws Exception
     */
    public function get(?array $data): array
    {
        if (!empty($data)) {
            if (isset($data['search'])) {
                return Products::search($data['search']);
            }

            if (isset($data['code'])) {
                $code = intval($data['code']);
                return Products::getByCode(intval($code));
            }

            // If there is no "code" or "search" parameter in the request
            $validationMessages = [
                'search' => 'Você forneceu parâmetro(s) não conhecido(s)',
                'code' => 'Você forneceu parâmetro(s) não conhecido(s)',
            ];

            Validator::gi()->checkRequiredFieldsExist($data, $validationMessages);

            return array();
        } else {
            return Products::getAll();
        }
    }

    /**
     * Insert a new product
     * @return array
     * @throws Exception
     */
    public function post(): array
    {
        return Products::insert($_POST);
    }

    /**
     * Update product
     * @return array
     * @throws Exception
     */
    public function put(): array
    {
        parse_str(file_get_contents('php://input'), $_PUT);
        return Products::update($_PUT);
    }

    /**
     * Delete product
     * @return array
     * @throws Exception
     */
    public function delete(): array
    {
        parse_str(file_get_contents('php://input'), $_DELETE);
        return Products::delete($_DELETE);
    }
}