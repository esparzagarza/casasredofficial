<?php

namespace src\classes\mailer;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use src\classes\helpers;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

class mailerServiceClass
{
    public static function sendAMail(array $request): bool
    {
        $body = '<b>Datos de Contacto</b> ' . "<br />" .
        'Nombre: ' . $request['name'] . "<br />" .
        'Correo: ' . $request['email'] . "<br />" .
        'Telefono: ' . $request['phone'] . "<br />" .
        'Asunto: ' . $request['subject'] . "<br />" .
        'Mensaje: ' . $request['message']; 

        $service = $request['formType'] == 'Sell' ? 'Venta' : 'Renta';

        $property = '';
        if ($request['formType'] != 'Contact') {
            $property = '<br /><br />
            <b>Datos de la Propiedad</b> ' . "<br />" .
            'Servicio: ' . $service . "<br />" .
            'Tipo: ' . $request['propertyType'] . "<br />" .
            'Documentacion: ' . $request['documentation'] . "<br />" .
            'Predial: ' . $request['predial'] . "<br />" .
            'Rango de Precio: ' . $request['pricesRange']; 
        }

        $signature = '<br /><br />
        <b>CASASRED</b>
        <br />Promotora de Vivienda<br />
        +52 (664) 439 2448<br />
        <a href="https://casasred.com">https://casasred.com</a>';

        $mail = new PHPMailer(true);

        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'casasred.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'no-reply@casasred.com';
        $mail->Password = 'IGa*$H{X.#D]';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->setFrom('no-reply@casasred.com', 'CASASRED Agencia Inmobiliaria Comercial');
        $mail->addAddress($request['email'], $request['name']);
        $mail->addCC('asesordeventas@casasred.com', 'Asesor CASASRED');

        $mail->isHTML(true);
        $mail->Subject = 'CASASRED :: Ponerse en Contacto';
        $mail->Body = 'De acuerdo a su amable solicitud, hemos recibido sus datos de contacto' . "<br /><br />" . $body . $property . $signature;

        return $mail->Send() ? true : false;
    }
}
