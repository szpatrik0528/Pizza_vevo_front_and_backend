<?php

//$azon=$_POST["azon"];
$nev = $_POST["vnev"];
$cim = $_POST["vcim"];
require_once("./databaseconnect.php");
$sql = 'INSERT INTO vevo(vazon, vnev, vcim) VALUES (NULL,?,?)';
$stmt = $connection->prepare($sql);
$stmt->bind_param("ss", $nev, $cim);
if ($stmt->execute()) {
    http_response_code(201);
    echo 'Sikeresen hozzáadva';
} else {
    http_response_code(404);
    echo 'Sikertelen hozzáadás!';
}

