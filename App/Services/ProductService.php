<?php
namespace App\Services;

use App\Helpers\Validators\Data;
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

            Data::gi()->checkRequiredFieldsExist($data, $validationMessages);

            return array();
        } else {
            return Products::getAll();
        }
    }

    /**
     * Insert a new product
     * @return string
     * @throws Exception
     */
    public function post(): string
    {
        return Products::insert($_POST);
    }

    /**
     * Update product
     * @return string
     * @throws Exception
     */
    public function put(): string
    {
        parse_str(file_get_contents('php://input'), $_PUT);
        return Products::update($_PUT);
    }

    /**
     * Delete product
     * @return string
     * @throws Exception
     */
    public function delete(): string
    {
        parse_str(file_get_contents('php://input'), $_DELETE);
        return Products::delete($_DELETE);
    }
}