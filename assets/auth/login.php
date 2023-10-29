<?php
include('../../includes/header.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include('../auth/login_process.php');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Slagalica | Prijava</title>
    <link rel="stylesheet" href="../style/main.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DynaPuff&family=Poppins:wght@300;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <div class='main'>
        <div class='form-login'>
            <div class='wrapper'>
                <form method='post'>
                        <h1>Prijavite se</h1>
                    <label>E-mail adresa:</label>
                    <input type='text' id='mejl' name='mejl'>
                    <label>Lozinka:</label>
                    <input type='password' name='sifra'>
                    <a href="../../index.php">
                        <p class='link'>Povratak na početnu</p>
                    </a>
                    <div class='register-cell'>
                        <input type='submit' name='submit' value='Potvrdi'>
                    </div>
                    
                </form>
            </div>
        </div>
</body>

</html>