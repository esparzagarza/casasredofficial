<?php

namespace src\api\controllers;

use \src\api\models\subscribersModel;

class subscribersController extends baseController
{
    public static function getAll(): array { return self::getAllBase(new subscribersModel()); }
    public static function getAllFiltered(array $request): array { return self::getAllFilteredBase(new subscribersModel(), $request); }
    public static function getOneById(array $request): array { return self::getOneByIdBase(new subscribersModel(), $request); }
    public static function getAllDataByColumn(array $request): array { return self::getAllDataByColumnBase(new subscribersModel(), $request); }
    public static function store(array $request) { return self::storeBase(new subscribersModel(), $request); }
    public static function update(array $request) { return self::updateBase(new subscribersModel(), $request); }
    public static function modify(array $request) { return self::modifyBase(new subscribersModel(), $request); }
    public static function hardDelete(array $request) { return self::hardDeleteByIdBase(new subscribersModel(), $request); }
}