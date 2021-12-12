<?php
namespace App\Services;

use App\Helpers\DateTime\Formatter;
use App\Helpers\DataValidator\Validator;
use App\Interfaces\HttpRequestService;
use App\Models\Products;
use App\Models\ProductTypes;
use App\Models\Sales;
use App\Models\Tax;
use Exception;

class TaxService implements HttpRequestService
{
    /**
     * List one or more sales
     * @param array|null $data request parameters
     * @return array
     * @throws Exception
     */
    public function get(?array $data): array
    {
        if (!empty($data)) {
            if (isset($data['search'])) {
                return Tax::search($data['search']);
            }

            if (isset($data['id'])) {
                $code = intval($data['id']);
                return Tax::getById(intval($code));
            }

            // If there is no "name" or "id" parameter in the request
            $validationMessages = [
                'search' => 'Você forneceu parâmetro(s) não conhecido(s)',
                'id' => 'Você forneceu parâmetro(s) não conhecido(s)',
            ];

            Validator::gi()->checkRequiredFieldsExist($data, $validationMessages);

            return array();
        } else {
            return Products::getAll();
        }
    }

    /**
     * Insert a new sale
     *
     * @return string
     * @throws Exception
     */
    public function post(): string
    {
        return Sales::insert($_POST);
    }

    /** @throws Exception */
    public function put(): string
    {
        parse_str(file_get_contents('php://input'), $_PUT);
        return ProductTypes::update($_PUT);
    }

    /** @throws Exception */
    public function delete(): string
    {
        parse_str(file_get_contents('php://input'), $_DELETE);
        return ProductTypes::delete($_DELETE);
    }
}