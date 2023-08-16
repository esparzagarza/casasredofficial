<?php

namespace src\classes;

use \src\core\db;

class JWT
{
    public static function encode(array $payload): string
    {
        $header = self::base64urlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload = self::base64urlEncode(json_encode($payload));
        $signature = self::base64urlEncode(hash_hmac('sha256', $header . '.' . $payload, db::get('JWTKey'), true));

        return $header . '.' . $payload . '.' . $signature;
    }

    public static function decode(string $token): array
    {
        if (preg_match("/^(?<header>.+)\.(?<payload>.+)\.(?<signature>.+)$/", $token, $matches) !== 1) $return = helpers::formatResponse(401, "Invalid Token format", []);
        else if (!hash_equals(hash_hmac("sha256", $matches["header"] . "." . $matches["payload"], db::get('JWTKey'), true), self::base64urlDecode($matches["signature"]))) $return = helpers::formatResponse(401, "Signature doesn\'t match", []);
        else if (json_decode(self::base64urlDecode($matches["payload"]), true)['expire'] < time()) $return = helpers::formatResponse(401, "Token Expired", []);
        else $return = helpers::formatResponse(200, 'Successful Authorization', json_decode(self::base64urlDecode($matches["payload"]), true));

        return $return;
    }

    private static function base64urlEncode(string $text): string
    {
        return str_replace(
            ["+", "/", "="],
            ["-", "_", ""],
            base64_encode($text)
        );
    }

    private static function base64urlDecode(string $text): string
    {
        return base64_decode(
            str_replace(
                ["-", "_"],
                ["+", "/"],
                $text
            )
        );
    }
}
