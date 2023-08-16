<?php

use src\api\controllers\authController;

$router->post('/auth', authController::class . '::login');
$router->put('/auth', authController::class . '::register');
$router->patch('/auth', authController::class . '::refresh');
$router->delete('/auth', authController::class . '::logout');
