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
            if (isset($data['search'])) {
                return Products::search($data['search']);
            }

            if (isset($data['code'])) {
                $code = intval($data['code']);
                return Products::getByCode(intval($code));
            }

            /**
             * If there is no "code" or "search" parameter in the request
             */
            $validationMessages = [
                'search' => 'Você forneceu parâmetro(s) não conhecido(s)',
                'code' => 'Você forneceu parâmetro(s) não conhecido(s)',
            ];

            DataValidator::gi()->checkRequiredFieldsExist($data, $validationMessages);
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
            'type_id' => 'É necessário informar o tipo do produto que deseja cadastrar'
        ];

        DataValidator::gi()->checkRequiredFieldsExist($_POST, $validationMessages);
        $data = DataValidator::gi()->handleEncoding($_POST, ['description']);

        return Products::insert($data);
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

//        $validationMessages = [
//            'id' => 'É necessário informar o id produto que deseja cadastrar',
//            'code' => 'É necessário informar o código produto que deseja cadastrar',
//            'description' => 'É necessário informar a descrição do produto que deseja cadastrar',
//            'value' => 'É necessário informar o valor do produto que deseja cadastrar',
//            'type_id' => 'É necessário informar o tipo do produto que deseja cadastrar'
//        ];
//
//        DataValidator::gi()->checkRequiredFieldsExist($_PUT, $validationMessages);
//        $data = DataValidator::gi()->handleEncoding($_PUT, ['description']);
//
//        return Products::update($data);

        return $this->buildUpdate($_PUT, []);
    }

    private function buildUpdate(array $data, array $condition): string
    {

        $dataKeys = array_keys($data);

        $fields = "";
        foreach ($dataKeys as $key) {
            $fields .= ($fields ? ', ' : ' ') . $key . ' :'.$key;
        }

        return trim($fields);
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