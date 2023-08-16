<?php

namespace src\api\models;

class staffModel extends baseModel
{
    private static $table_name = 'staff';
    protected $id;
    protected $accountid;
    protected $name;
    protected $api_key;
    protected $email;
    protected $password;
    protected $role;
    protected $lastlogin;
    protected $image;
    protected $status;
    protected $created_by;
    protected $modified_by;

    public static function getTableName()
    {
        return self::$table_name;
    }
}
