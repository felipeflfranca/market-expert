<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");

header('Content-Type: application/json');

require_once '../../vendor/autoload.php';

/**
 * @return void
 */
function init(): void
{
    if (isset($_GET['api'])) {
        $request = $_GET;
        $api = $request['api'];

        $service = 'App\Services\\' . ucfirst($api) . 'Service';
        $method = strtolower($_SERVER['REQUEST_METHOD']);

        unset($request['api']);

        try {
            $response = call_user_func_array(array(new $service, $method), [$request]);
            http_response_code(200);
            echo json_encode(array('status' => 'success', 'data' => $response), JSON_UNESCAPED_UNICODE);
            exit;
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(array('status' => 'error', 'data' => $e->getMessage()), JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
}

init();