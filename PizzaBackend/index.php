<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE');

/* fogadja az url kéréseket és megválaszolja azokat
  GET http://localhost/PizzaBackend/index.php?vevo -> minden vevő
  GET http://localhost/PizzaBackend/index.php?vevo/{id} -> adott ügyfél
  POST http://localhost/PizzaBackend/index.php?vevo -> létrehoz vevőt
  PUT http://localhost/PizzaBackend/index.php?vevo/{id} -> modosit adott vevot
  DELETE http://localhost/PizzaBackend/index.php?vevo/{id} -> torol adott vevot
 */

$keresSzoveg = explode('/', $_SERVER['QUERY_STRING']);
if($keresSzoveg[0] === "vevo"){
    require_once 'vevo/index.php';
} else{
    http_response_code(404);
    $errorJson = array("message" => "Nincs ilyen api!");
    return json_encode($errorJson);
}