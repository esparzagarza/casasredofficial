<?php

declare(strict_types=1);

namespace integrationapi;




/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

spl_autoload_register(function ($class) {
  $file = __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';
  if (is_readable($file)) require __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';
});


use src\classes\helpers;
use src\api\controllers\baseController;
use src\api\controllers\repositoryController;
use src\api\controllers\authController;
use src\api\controllers\subscribersController;



/*
|--------------------------------------------------------------------------
| Get Contents
|--------------------------------------------------------------------------
*/


$jsondata = file_get_contents('php://input');
$request = isset($jsondata) && !empty($jsondata) ? @json_decode($jsondata, TRUE) : array();

if (!empty($jsondata) && json_last_error() !== JSON_ERROR_NONE) return helpers::returnToAction(helpers::formatResponse(404, 'Incorrect JSON Format', []));


/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/


//if ($_SERVER['REQUEST_URI'] != '/api/auth') {

if (
  implode('', array_filter(explode('/', $_SERVER['REQUEST_URI']))) != 'auth'
  &&
  implode('', array_filter(explode('/', $_SERVER['REQUEST_URI']))) != 'subscriber'
  &&
  implode('', array_filter(explode('/', $_SERVER['REQUEST_URI']))) != 'sendAMail'
  ) {
  $auth = authController::authenticateAccessToken();
  if ($auth['status'] != 200) {
    helpers::returnToAction($auth);
    exit;
  }

  if (strtoupper($_SERVER['REQUEST_METHOD']) == 'GET' || strtoupper($_SERVER['REQUEST_METHOD']) == 'DELETE') {

    $parts = array_filter(explode('&', $_SERVER['QUERY_STRING']));

    foreach ($parts as $column) {
      $query = array_filter(explode('=', $column));
      $request[$query[0]] = $query[1];
    }
  } else {

    $request['_FILES'] = isset($_FILES) ? $_FILES : array();
    $request['_REQUEST'] = isset($_REQUEST) ? $_REQUEST : array();
    $request['_USER'] = isset($auth['data']) ? $auth['data'] : array();
  }
}



/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

$router = new \src\core\router();
$router->any(baseController::class . '::noActionFound');
$router->get('/', baseController::class . '::indexAction');
$router->post('/uploadFile', baseController::class . '::postUploadFile');
$router->post('/subscriber', subscribersController::class . '::store');
$router->post('/sendAMail', baseController::class . '::postSendAMail');


require_once 'routes_auth.php';
require_once 'routes_modules.php';

$router->run($request, $_SERVER['REQUEST_METHOD']);
$router = null;
