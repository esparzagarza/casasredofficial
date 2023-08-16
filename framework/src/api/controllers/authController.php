<?php

namespace src\api\controllers;

use src\api\models\accountModel;
use src\api\models\refreshtokenModel;
use src\api\models\staffModel;
use src\classes\helpers;
use src\classes\JWT;
use src\core\db;

class authController extends baseController
{
    public static function  authenticateAccessToken(): array
    {
        if (!preg_match("/^Bearer\s+(.*)$/", $_SERVER["HTTP_AUTHORIZATION"], $matches)) $return = helpers::formatResponse(400, 'Incomplete Authorization Header', $_SERVER);
        else $return = JWT::decode($matches[1]);

        return $return;
    }

    public static function register(array $request): array
    {
        if (!array_key_exists('email', $request) || !array_key_exists('password', $request) || !array_key_exists('name', $request)) $return = helpers::formatResponse(400, 'Missing Account Info', []);
        if (empty($request['email']) || empty($request['password']) || empty($request['name'])) $return = helpers::formatResponse(400, 'All fields must valid', []);
        else if (
            self::checkExistByColumnBase(new accountModel(), ['email' => $request['email']])['status'] == 200
            || self::checkExistByColumnBase(new staffModel(), ['email' => strval($request['email'])])['status'] == 200
        ) $return = helpers::formatResponse(400, 'email already taken', []);
        else {

            $cont = 0;
            $request['_USER']['id'] = 1;
            $slug = helpers::slugify(strval($request['name']), '-');
            $request['slug'] = $slug;

            while (self::checkExistByColumnBase(new accountModel(), ['slug' => $request['slug']])['status'] == 200) {
                $cont++;
                $request['slug'] = $slug . $cont;
            }

            $request['appname'] = $request['slug'];
            $account = self::storeBase(new accountModel(), $request);

            if ($account['status'] == 200) {
                $staffPayload = [
                    'accountid' => $account['data']['id'],
                    'email' => $request['email'],
                    'password' => $request['password'],
                    'role' => 'super',
                    '_USER' => ['id' => 1]
                ];

                $return  = staffController::store($staffPayload)['status'] == 200 ? self::login($request) : helpers::formatResponse(200, 'Not successful created', []);
            } else $return = helpers::formatResponse(200, 'Not successful created', []);
        }

        return $return;
    }

    public static function login(array $request): array
    {
        if (!array_key_exists('email', $request) || !array_key_exists('password', $request)) $return = helpers::formatResponse(400, 'Missing Login Credentials', []);
        else {
            $user = self::getOneByColumnBase(new staffModel(), ['email' => $request['email']]);
            if ($user['status'] == 403) $return = helpers::formatResponse(401, 'Invalid Authentication', []);
            else if (!password_verify($request['password'], $user['data']['password'])) $return = helpers::formatResponse(401, 'Invalid Authentication', []);
            else {

                $expires_at = time() + 432000;
                $at_payload = ['id' => $user['data']['id'], 'lastlogin' => date("Y-m-d H:i:s"), 'expire' => time() + 86400];
                $refresh_token = JWT::encode(['sub' => $user['data']['id'], 'expire' => $expires_at]);
                $hash = hash_hmac("sha256", $refresh_token, db::get('JWTKey'));
                $rt_payload = ['accountid' => $user['data']['accountid'], 'hash' => $hash, 'expires_at' => $expires_at, '_USER' => ['id' => $user['data']['id']]];

                self::deleteExpiredTokens();
                self::modifyBase(new staffModel(), $at_payload);
                self::storeBase(new refreshtokenModel(), $rt_payload);

                $response = [
                    'access_token' => JWT::encode($at_payload),
                    'refresh_token' => $refresh_token,
                    'id' => $user['data']['id'],
                    'accountid' => $user['data']['accountid'],
                    'email' => $user['data']['email'],
                    'image' => $user['data']['image'],
                    'name' => $user['data']['name'],
                    'role' => $user['data']['role']
                ];

                $return = helpers::formatResponse(200, 'Successful Authentication', $response);
            }
        }

        return $return;
    }

    public static function refresh(array $request): array
    {
        if (!array_key_exists('refresh_token', $request)) $return = helpers::formatResponse(400, 'Missing Token', []);
        else if (self::getByToken($request['refresh_token'])['status'] != 200) $return = helpers::formatResponse(400, 'Token not exist on whitelist', []);
        else {
            $return = JWT::decode($request['refresh_token']);
            if ($return['status'] == 200) {
                $user = self::getOneByIdBase(new staffModel(), ['id' => $return['data']['sub']]);
                if ($user['status'] == 403) $return = helpers::formatResponse(401, 'Invalid Authentication', []);
                else {;

                    $expires_at = time() + 432000;
                    $at_payload = ['id' => $user['data']['id'], 'lastlogin' => $user['data']['lastlogin'], 'expire' => time() + 86400];
                    $refresh_token = JWT::encode(['sub' => $user['data']['id'], 'expire' => $expires_at]);
                    $hash = hash_hmac("sha256", $refresh_token, db::get('JWTKey'));
                    $rt_payload = ['accountid' => $user['data']['accountid'], 'hash' => $hash, 'expires_at' => $expires_at, '_USER' => ['id' => $user['data']['id']]];

                    self::deleteExpiredTokens();
                    self::deleteToken($request['refresh_token']);
                    self::storeBase(new refreshtokenModel(), $rt_payload);

                    $response = [
                        'access_token' => JWT::encode($at_payload),
                        'refresh_token' => $refresh_token,
                        'id' => $user['data']['id'],
                        'accountid' => $user['data']['accountid'],
                        'email' => $user['data']['email'],
                        'image' => $user['data']['image'],
                        'name' => $user['data']['name'],
                        'role' => $user['data']['role']
                    ];

                    $return = helpers::formatResponse(200, 'Successful Authentication', $response);
                }
            }
        }

        return $return;
    }

    public static function logout(array $request): array
    {
        if (!array_key_exists('token', $request)) $return = helpers::formatResponse(400, 'Missing Token', []);
        else $return = self::deleteToken($request['token']);

        return $return;
    }

    public static function details(array $request): array
    {
        if (!array_key_exists('token', $request)) $return = helpers::formatResponse(400, 'Missing Token', []);
        else $return = JWT::decode($request['token']);;

        return $return;
    }

    private static function deleteExpiredTokens()
    {
        return self::hardDeleteByColumnMinorBase(new refreshtokenModel(), ['expires_at' => time()]);
    }
    private static function getByToken(string $token): array
    {
        $hash = hash_hmac("sha256", $token, db::get('JWTKey'));
        return self::getOneByColumnBase(new refreshtokenModel(), ['hash' => $hash]);
    }
    private static function deleteToken(string $token): array
    {
        $hash = hash_hmac("sha256", $token, db::get('JWTKey'));
        return self::hardDeleteAllBase(new refreshtokenModel(), ['hash' => $hash]);
    }
}
