<?php
include('../../includes/header.php');

if(isset($_SESSION['session_id']))
{
if($_SESSION['session_id']!=0){

$_SESSION['session_id']=0;
$_SESSION['id_korisnika']='0';

echo"<strong>Uspešna odjava!</strong> <br>";
            
$_SESSION = array();
session_destroy();

header('Refresh: 0; URL = ../../index.php');


}
}


?>