<?php

namespace src\api\controllers;

use src\api\models\enteModel;
use \src\api\models\staffModel;
use src\classes\helpers;

class staffController extends baseController
{
    public static function getAll(): array
    {
        return self::getAllBase(new staffModel());
    }
    public static function getAllFiltered(array $request): array
    {
        return self::getAllFilteredBase(new staffModel(), $request);
    }
    public static function getOneById(array $request): array
    {
        return self::getOneByIdBase(new staffModel(), $request);
    }
    public static function getAllDataByColumn(array $request): array
    {
        return self::getAllDataByColumnBase(new staffModel(), $request);
    }

    public static function store(array $request)
    {
        if (!array_key_exists('email', $request)) return helpers::formatResponse(409, 'Email must be valid', []);
        if (isset($request['enteid'])) if (self::checkExistByIdBase(new enteModel(), ['id' => intval($request['enteid'])])['status'] != 200) return helpers::formatResponse(409, 'Ente Not found', []);
        if (self::checkExistByColumnBase(new staffModel(), ['email' => strval($request['email'])])['status'] == 200) return helpers::formatResponse(409, 'Email not available', []);

        $valid_apikey = false;
        while (!$valid_apikey) {
            $request['api_key'] = bin2hex(random_bytes(16));
            if (self::checkExistByColumnBase(new staffModel(), ['api_key' => strval($request['api_key'])])['status'] == 404) $valid_apikey = true;
        }

        $request['password'] = password_hash(strval($request['password']), PASSWORD_DEFAULT);

        return self::storeBase(new staffModel(), $request);
    }
    public static function update(array $request)
    {
        if (isset($request['password'])) unset($request['password']);
        if (isset($request['email']))
            if (self::checkExistByColumnBase(new staffModel(), ['email' => strval($request['email'])])['status'] == 200)
                return helpers::formatResponse(409, 'Email not available', []);

        return self::updateBase(new staffModel(), $request);
    }
    public static function modify(array $request)
    {
        if (isset($request['email']))
            if (self::checkExistByColumnBase(new staffModel(), ['email' => strval($request['email'])])['status'] == 200)
                return helpers::formatResponse(409, 'Email not available', []);

        if (isset($request['password'])) $request['password'] = password_hash(strval($request['password']), PASSWORD_DEFAULT);

        return self::modifyBase(new staffModel(), $request);
    }
    public static function hardDelete(array $request)
    {
        return self::hardDeleteByIdBase(new staffModel(), $request);
    }
}
