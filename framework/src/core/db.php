<?php

namespace src\core;

use PDO;

class db
{
    public static $_instance;
    private static $DB_HOST = 'localhost';
    private static $DB_NAME = 'casasredsubscribers';
    private static $DB_USER = 'root';
    private static $DB_PASS = 'toor';
    private static $DB_PORT = '3306';
    private static $DB_DSN;
    private static $JWTKey = '28482B4D6251655468576D5A7133743677397A24432646294A404E635266556A';


    private static $DB_OPTIONS =         [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
    ];

    private static function getDSN()
    {
        return 'mysql:host=' . self::get('DB_HOST') . '; port=' . self::get('DB_PORT') . '; dbname=' . self::get('DB_NAME');
    }

    public static function get($key)
    {
        return self::${$key};
    }

    public static function connect()
    {
        try {

            self::$_instance = new PDO(self::getDSN(), self::get('DB_USER'), self::get('DB_PASS'), self::get('DB_OPTIONS'));
        } catch (\PDOException $exception) {

            self::$_instance = 'Connection error: ' . $exception->getMessage();
        }

        return self::$_instance;
    }
}
