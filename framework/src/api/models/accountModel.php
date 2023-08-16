<?php

namespace src\api\models;

class accountModel extends baseModel
{
    private static $table_name = 'account';
    protected $id;
    protected $email;
    protected $name;
    protected $appname;
    protected $description;
    protected $slug;
    protected $image;
    protected $type;
    protected $status;
    protected $created_by;
    protected $created_at;
    protected $modified_by;
    protected $modified_at;

    public static function getTableName()
    {
        return self::$table_name;
    }
}
