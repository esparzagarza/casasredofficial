<?php

namespace src\classes\mailer;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

class mailerServiceClass
{
    public static function sendAMail(string $filename, string $email): bool
    {
        $mail = new PHPMailer(true);

        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'casasred.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'no-reply@casasred.com';
        $mail->Password = '7z&D5^SL#bX*';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->setFrom('no-reply@casasred.com', 'CASASRED Agencia Inmobiliaria Comercial');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Get in touch Subject';
        $mail->Body = 'De acuerdo a su amable solicitud, permitame presentarle la siguiente información';

        return $mail->Send() ? true : false;
    }
}