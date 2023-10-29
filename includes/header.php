<?php
session_start();

include("connection.php");

try {
    $headerContent = "<div class='header'>";
    $base_url = 'http://localhost/slagalica/';

    if (isset($_SESSION['korIme']) && isset($_SESSION['session_id'])) {
        $username = $_SESSION['korIme'];

        $headerContent .= "
            <h1>Dobrodošli, $username!</h1>
            <form action='{$base_url}profile.php' method='post'>
                <button>Profil</button>
            </form> 
            <form action='{$base_url}assets/auth/logout.php' method='post'>
                <button>Odjava</button>
            </form>";
    } else {
        $headerContent .= "
            <form action='{$base_url}assets/auth/login.php'>
                <button id='btnsHeader'>Prijavi se</button>
            </form>
            <form action='{$base_url}assets/auth/register.php'>
                <button id='btnsHeader'>Registruj se</button>
            </form>";
    }

    $headerContent .= "</div>";

    echo $headerContent;
} catch (Exception $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
}
