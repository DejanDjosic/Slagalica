<?php
include('../../includes/header.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Slagalica | Registracija</title>
    <link rel="stylesheet" href="../style/main.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DynaPuff&family=Poppins:wght@300;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <div class='main'>
        <div class='form-register'>
            <div class='wrapper'>
                <form method='post'>
                    <h1>Registrujte se</h1>
                    <label>Korisničko ime:</label>
                    <input type='text' name='ime'>
                    <label>E-mail adresa:</label>
                    <input type='text' name='mejl'>
                    <label>Lozinka:</label>
                    <input type='password' name='lozinka1'>
                    <label>Potvrda lozinke:</label>
                    <input type='password' name='lozinka2'>
                    <a href='../../index.php'><p class='link'>Povratak na početnu</p></a>
                    <input type='submit' name='dodavanje' value='Potvrdi'>
                </form>
            </div>
        </div>
    </div>
    <div class="modal hidden">
        <h1>Uspešna registracija</h1>
        <a href='login.php'>
            <button class='cell'>Prijavite se</button>
        </a>
    </div>
</body>
</html>
<?php include('../auth/registration_process.php'); ?>