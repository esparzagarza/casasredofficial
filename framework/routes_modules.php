<?php

use src\api\controllers\accountController;

$router->get('/account', accountController::class . '::getAll');
$router->get('/account/filtered', accountController::class . '::getAllFiltered');
$router->get('/account/listByColumn', accountController::class . '::getAllDataByColumn');
$router->get('/account/getone', accountController::class . '::getOneById');
$router->post('/account', accountController::class . '::store');
$router->put('/account', accountController::class . '::update');
$router->patch('/account', accountController::class . '::modify');
$router->delete('/account', accountController::class . '::hardDelete');


use src\api\controllers\subscribersController;

$router->get('/subscribers', subscribersController::class . '::getAll');
$router->get('/subscribers/filtered', subscribersController::class . '::getAllFiltered');
$router->get('/subscribers/listByColumn', subscribersController::class . '::getAllDataByColumn');
$router->get('/subscribers/getone', subscribersController::class . '::getOneById');
$router->put('/subscribers', subscribersController::class . '::update');
$router->patch('/subscribers', subscribersController::class . '::modify');
$router->delete('/subscribers', subscribersController::class . '::hardDelete');

use src\api\controllers\staffController;

$router->get('/staff', staffController::class . '::getAll');
$router->get('/staff/filtered', staffController::class . '::getAllFiltered');
$router->get('/staff/listByColumn', staffController::class . '::getAllDataByColumn');
$router->get('/staff/getone', staffController::class . '::getOneById');
$router->post('/staff', staffController::class . '::store');
$router->put('/staff', staffController::class . '::update');
$router->patch('/staff', staffController::class . '::modify');
$router->delete('/staff', staffController::class . '::hardDelete');
