<?php

$connection = new mysqli("localhost","root","","slagalica");

if($connection->error){

    die("Greška:".$connection->error);
}

$date = date('Y-m-d H:i:s');



?>