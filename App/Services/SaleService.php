<?php
namespace App\Services;

use App\Helpers\DateTimeHelper;
use App\Helpers\DataValidator;
use App\Interfaces\HttpRequestService;
use App\Models\Sales;
use Exception;

class SaleService implements HttpRequestService
{
    /**
     * List one or more sales
     *
     * @param array|null $data request parameters
     * @return array
     * @throws Exception
     */
    public function get(?array $data): array
    {
        if (!empty($data)) {
            if(isset($data['id'])) {
                $id = intval($data['id']);
                return Sales::getById($id);
            }

            if(isset($data['sale_date'])) {
                $saleDate = DateTimeHelper::gi()->localToUtc($data['sale_date']);
                return Sales::getByDate($saleDate);
            }

            /**
             * If there is no "id" parameter in the request
             */
            $validationMessages = [
                'id' => 'Você forneceu parâmetro(s) não conhecido(s)',
                'sale_date' => 'Você forneceu parâmetro(s) não conhecido(s)',
            ];

            DataValidator::gi()->checkRequiredFieldsExist($data, $validationMessages);
        } else {
            return Sales::getAll();
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
        $validationMessages = [
            'sale_data' => 'É necessário informar a data da venda',
            'data' => 'É necessário informar os dados da venda'
        ];

        DataValidator::gi()->checkRequiredFieldsExist($_POST, $validationMessages);

        return Sales::insert($_POST);
    }

    /**
     * @throws Exception
     */
    public function put(): string
    {
        throw new Exception('Não foi possível concluir a requisição');
    }

    /**
     * @throws Exception
     */
    public function delete(): string
    {
        throw new Exception('Não foi possível concluir a requisição');
    }
}