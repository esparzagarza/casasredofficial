<?php

namespace src\api\models;

class subscribersModel extends baseModel
{
    private static $table_name = 'subscribers';
    protected $id;
    protected $accountid;
    protected $sellfulladdress;
    protected $buyfulladdress;
    protected $timeline;
    protected $motivations;
    protected $pricerange;
    protected $downpayment;
    protected $ownahome;
    protected $buyahome;
    protected $mortgage;
    protected $typeofhome;
    protected $features;
    protected $lookingtomove;
    protected $email;
    protected $phonenumber;
    protected $firstname;
    protected $lastname;
    protected $service;
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
