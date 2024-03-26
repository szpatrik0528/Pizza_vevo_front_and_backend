<?php

$putdata = fopen("php://input", "r");
$raw_data= '';
while($chuck = fread($putdata, 1024))
    $raw_data .= $chuck;

fclose($putdata);
//$azon=$_POST["azon"];
$adatJSON = json_decode($raw_data);
$azon = $adatJSON->vazon;
$nev = $adatJSON->vnev;
$vcim = $adatJSON->vcim;
require_once("./databaseconnect.php");
$sql = 'UPDATE vevo SET vnev=?, vcim=? WHERE vazon=?';
$stmt = $connection->prepare($sql);
$stmt->bind_param("ssi", $vnev, $vcim, $vazon);
if ($stmt->execute()) {
    http_response_code(201);
    echo 'Sikeresen update';
} else {
    http_response_code(404);
    echo 'Sikertelen update!';
}
