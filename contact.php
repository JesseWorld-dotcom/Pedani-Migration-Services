<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| PEDANI MIGRATION SERVICES
| Contact Form → Resend
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Store your Resend API key in your hosting environment as:
|
| RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
|
| Do NOT put the API key inside your HTML or JavaScript.
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Configuration
|--------------------------------------------------------------------------
*/

const RECIPIENT_EMAIL = 'info@pedanimigration.com';
const FROM_EMAIL = 'info@pedanimigration.com';
const COMPANY_NAME = 'Pedani Migration Services';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 40;


/*
|--------------------------------------------------------------------------
| Response helper
|--------------------------------------------------------------------------
*/

function respond(bool $success, string $message, int $statusCode = 200, array $extra = []): never
{
    http_response_code($statusCode);

    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');

    echo json_encode(
        array_merge(
            [
                'success' => $success,
                'message' => $message
            ],
            $extra
        ),
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| Only accept POST
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(
        false,
        'Invalid request method.',
        405
    );
}


/*
|--------------------------------------------------------------------------
| Basic security headers
|--------------------------------------------------------------------------
*/

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');


/*
|--------------------------------------------------------------------------
| Honeypot anti-spam field
|--------------------------------------------------------------------------
|
| Real users never see this field.
| Bots often fill every field they find.
|
*/

$honeypot = trim((string)($_POST['website'] ?? ''));

if ($honeypot !== '') {

    /*
     * Pretend the message was accepted.
     * This avoids telling bots exactly what stopped them.
     */

    respond(
        true,
        'Thanks for contacting PEDANI. Your message has been received.'
    );
}


/*
|--------------------------------------------------------------------------
| Get Resend API key
|--------------------------------------------------------------------------
*/

$resendApiKey = getenv('RESEND_API_KEY');

if (!$resendApiKey) {

    respond(
        false,
        'The email service is not configured correctly. Please try again later.',
        500
    );
}


/*
|--------------------------------------------------------------------------
| Read submitted values
|--------------------------------------------------------------------------
*/

$fullName = trim((string)($_POST['fullName'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$service = trim((string)($_POST['service'] ?? ''));
$destination = trim((string)($_POST['destination'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));


/*
|--------------------------------------------------------------------------
| Normalize input
|--------------------------------------------------------------------------
*/

$fullName = preg_replace('/\s+/', ' ', $fullName) ?? $fullName;
$email = strtolower($email);
$phone = preg_replace('/\s+/', ' ', $phone) ?? $phone;


/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

if ($fullName === '') {
    respond(false, 'Please enter your full name.', 422);
}

if (mb_strlen($fullName) > MAX_NAME_LENGTH) {
    respond(false, 'Your name is too long.', 422);
}


if ($email === '') {
    respond(false, 'Please enter your email address.', 422);
}

if (
    mb_strlen($email) > MAX_EMAIL_LENGTH ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    respond(false, 'Please enter a valid email address.', 422);
}


if ($phone !== '' && mb_strlen($phone) > MAX_PHONE_LENGTH) {
    respond(false, 'Please enter a valid phone number.', 422);
}


if ($service === '') {
    respond(false, 'Please select a service.', 422);
}


if ($message === '') {
    respond(false, 'Please enter your message.', 422);
}

if (mb_strlen($message) > MAX_MESSAGE_LENGTH) {
    respond(false, 'Your message is too long.', 422);
}


/*
|--------------------------------------------------------------------------
| Allowed service values
|--------------------------------------------------------------------------
|
| Prevents someone from submitting arbitrary unexpected values.
|
*/

$allowedServices = [
    'study-visa'       => 'Study Visa',
    'work-visa'        => 'Work Visa',
    'visitor-visa'     => 'Visitor / Tourist Visa',
    'admission'        => 'School Admission',
    'tuition'          => 'Tuition Fee Payment',
    'flight'           => 'Flight Booking',
    'accommodation'    => 'Accommodation',
    'other'            => 'Other'
];


if (!array_key_exists($service, $allowedServices)) {
    respond(false, 'Please select a valid service.', 422);
}

$serviceLabel = $allowedServices[$service];


/*
|--------------------------------------------------------------------------
| Allowed destinations
|--------------------------------------------------------------------------
*/

$allowedDestinations = [
    ''             => 'Not specified',
    'uk'           => 'United Kingdom',
    'canada'       => 'Canada',
    'australia'    => 'Australia',
    'ireland'      => 'Ireland',
    'spain'        => 'Spain',
    'italy'        => 'Italy',
    'switzerland'  => 'Switzerland',
    'sweden'       => 'Sweden',
    'belgium'      => 'Belgium',
    'bulgaria'     => 'Bulgaria',
    'qatar'        => 'Qatar',
    'kuwait'       => 'Kuwait',
    'other'        => 'Other'
];


if (!array_key_exists($destination, $allowedDestinations)) {
    respond(false, 'Please select a valid destination.', 422);
}

$destinationLabel = $allowedDestinations[$destination];


/*
|--------------------------------------------------------------------------
| Sanitize output for HTML email
|--------------------------------------------------------------------------
*/

function escapeHtml(string $value): string
{
    return htmlspecialchars(
        $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}


$safeName = escapeHtml($fullName);
$safeEmail = escapeHtml($email);
$safePhone = escapeHtml($phone !== '' ? $phone : 'Not provided');
$safeService = escapeHtml($serviceLabel);
$safeDestination = escapeHtml($destinationLabel);
$safeMessage = nl2br(
    escapeHtml($message),
    false
);


/*
|--------------------------------------------------------------------------
| Create email
|--------------------------------------------------------------------------
*/

$subject = 'New Website Enquiry — ' . $serviceLabel;


/*
|--------------------------------------------------------------------------
| HTML email
|--------------------------------------------------------------------------
*/

$emailHtml = '
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>New Pedani Website Enquiry</title>

</head>

<body
style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;
    color:#17202a;
"
>

<div
style="
    max-width:680px;
    margin:30px auto;
    padding:0 15px;
"
>

    <div
    style="
        background:#ffffff;
        border:1px solid #e4e9ef;
        border-radius:16px;
        overflow:hidden;
    "
    >

        <div
        style="
            background:#164e8c;
            padding:28px 30px;
            color:#ffffff;
        "
        >

            <div
            style="
                font-size:12px;
                font-weight:bold;
                letter-spacing:1px;
                text-transform:uppercase;
                opacity:.85;
                margin-bottom:8px;
            "
            >
                New Website Enquiry
            </div>

            <h1
            style="
                margin:0;
                font-size:24px;
                line-height:1.3;
            "
            >
                Pedani Migration Services
            </h1>

        </div>


        <div
        style="
            padding:30px;
        "
        >

            <p
            style="
                margin:0 0 24px;
                color:#475467;
                font-size:14px;
                line-height:1.6;
            "
            >
                Someone has submitted a new enquiry through the
                Pedani Migration Services website.
            </p>


            <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
                border-collapse:collapse;
                font-size:14px;
            "
            >

                <tr>
                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                        color:#667085;
                        width:150px;
                    "
                    >
                        Full Name
                    </td>

                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                        font-weight:bold;
                        color:#17202a;
                    "
                    >
                        ' . $safeName . '
                    </td>
                </tr>


                <tr>
                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                        color:#667085;
                    "
                    >
                        Email
                    </td>

                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                    "
                    >
                        <a
                        href="mailto:' . $safeEmail . '"
                        style="
                            color:#164e8c;
                            text-decoration:none;
                        "
                        >
                            ' . $safeEmail . '
                        </a>
                    </td>
                </tr>


                <tr>
                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                        color:#667085;
                    "
                    >
                        Phone
                    </td>

                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                    "
                    >
                        ' . $safePhone . '
                    </td>
                </tr>


                <tr>
                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                        color:#667085;
                    "
                    >
                        Service
                    </td>

                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                        font-weight:bold;
                    "
                    >
                        ' . $safeService . '
                    </td>
                </tr>


                <tr>
                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                        color:#667085;
                    "
                    >
                        Destination
                    </td>

                    <td
                    style="
                        padding:12px 0;
                        border-bottom:1px solid #e4e9ef;
                    "
                    >
                        ' . $safeDestination . '
                    </td>
                </tr>

            </table>


            <div
            style="
                margin-top:28px;
            "
            >

                <div
                style="
                    font-size:12px;
                    font-weight:bold;
                    color:#667085;
                    text-transform:uppercase;
                    letter-spacing:.5px;
                    margin-bottom:10px;
                "
                >
                    Message
                </div>


                <div
                style="
                    padding:18px;
                    background:#f8fafc;
                    border:1px solid #e4e9ef;
                    border-radius:10px;
                    color:#17202a;
                    font-size:14px;
                    line-height:1.7;
                "
                >
                    ' . $safeMessage . '
                </div>

            </div>


            <div
            style="
                margin-top:28px;
                padding-top:18px;
                border-top:1px solid #e4e9ef;
                color:#667085;
                font-size:11px;
                line-height:1.6;
            "
            >
                This enquiry was submitted through the
                Pedani Migration Services contact form.
            </div>

        </div>

    </div>

</div>

</body>

</html>
';


/*
|--------------------------------------------------------------------------
| Plain-text fallback
|--------------------------------------------------------------------------
*/

$emailText =
    "New Pedani Migration Services Website Enquiry\n\n" .
    "Full Name: {$fullName}\n" .
    "Email: {$email}\n" .
    "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n" .
    "Service: {$serviceLabel}\n" .
    "Destination: {$destinationLabel}\n\n" .
    "Message:\n{$message}\n";


/*
|--------------------------------------------------------------------------
| Send through Resend API
|--------------------------------------------------------------------------
|
| Resend's email API endpoint:
| https://api.resend.com/emails
|
|--------------------------------------------------------------------------
*/

$payload = [
    'from' => COMPANY_NAME . ' <' . FROM_EMAIL . '>',
    'to' => [
        RECIPIENT_EMAIL
    ],
    'reply_to' => [
        $email
    ],
    'subject' => $subject,
    'html' => $emailHtml,
    'text' => $emailText
];


$ch = curl_init('https://api.resend.com/emails');

if ($ch === false) {
    respond(
        false,
        'Unable to initialize the email service.',
        500
    );
}


curl_setopt_array(
    $ch,
    [
        CURLOPT_POST => true,

        CURLOPT_RETURNTRANSFER => true,

        CURLOPT_TIMEOUT => 20,

        CURLOPT_CONNECTTIMEOUT => 10,

        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $resendApiKey,
            'Content-Type: application/json',
            'Accept: application/json'
        ],

        CURLOPT_POSTFIELDS => json_encode(
            $payload,
            JSON_UNESCAPED_SLASHES |
            JSON_UNESCAPED_UNICODE |
            JSON_THROW_ON_ERROR
        )
    ]
);


$response = curl_exec($ch);

$curlError = curl_error($ch);

$httpCode = (int)curl_getinfo(
    $ch,
    CURLINFO_HTTP_CODE
);

curl_close($ch);


/*
|--------------------------------------------------------------------------
| Handle cURL failure
|--------------------------------------------------------------------------
*/

if ($response === false) {

    error_log(
        'Pedani contact form Resend cURL error: ' .
        $curlError
    );

    respond(
        false,
        'We could not send your message right now. Please try again later.',
        502
    );
}


/*
|--------------------------------------------------------------------------
| Decode Resend response
|--------------------------------------------------------------------------
*/

$responseData = json_decode(
    $response,
    true
);


/*
|--------------------------------------------------------------------------
| Handle Resend failure
|--------------------------------------------------------------------------
*/

if (
    $httpCode < 200 ||
    $httpCode >= 300
) {

    error_log(
        'Pedani contact form Resend API error: HTTP ' .
        $httpCode .
        ' — ' .
        $response
    );

    respond(
        false,
        'We could not send your message right now. Please try again later.',
        502
    );
}


/*
|--------------------------------------------------------------------------
| Success
|--------------------------------------------------------------------------
*/

respond(
    true,
    'Thanks for contacting PEDANI. Your message has been received and our team will get back to you soon.'
);