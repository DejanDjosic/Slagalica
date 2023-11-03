<?php
include('includes/header.php');
$gameName = 'spojnice';

if (isset($_SESSION[$gameName])) {
    echo "<script type='text/javascript'>alert('Već ste odigrali ovu igru!')</script>";
    header('Refresh: 0; URL = game-menu.php');
    exit;
}

if (isset($_POST['spojnice-povratak']) && isset($_POST['spojnice-score'])) {
    $_SESSION[$gameName] = $_POST['spojnice-score'];
    header('Refresh: 0; URL = game-menu.php');
    exit;
}

if (isset($_POST[$gameName . '-odustani'])) {
    $_SESSION[$gameName] = 0;
    header('Refresh: 0; URL = game-menu.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Slagalica | Spojnice</title>
    <link rel="stylesheet" href="assets/style/main.css" />
</head>

<body>
    <div class="main flex">
        <header>
            <h1 id='slagalica-naslov'>SLAGALICA</h1>
        </header>
        <div class="wrapper">
            <div class="game-container" id='spojnice-container'>
                <div class='flex-right'>
                    <div id="js-timer">
                        <div id="timer">120</div>
                    </div>
                </div>
                <div class="flex">
                    <div class='spojniceHeading'>
                        <h2>
                            Povežite odgovarajuće glumce sa ulogama iz filma "Kad porastem
                            biću Kengur".
                        </h2>
                    </div>
                    <div class='matching-cells-grid'></div>
                </div>
                <div class="flex-left">
                    <form method='post'>
                        <input type='submit' class="cell giveup" name='spojnice-odustani' value='Odustani'>
                    </form>
                    <div class='cell hidden flex return-modal'>Povratak u glavni meni
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal hidden">
        <div class="closing flex-right">
            <button class="button-x">&times;</button>
        </div>
        <h1 class='heading'></h1>
        <div class="link margin-auto">
            <form method='post'>
                <div class='heading'></div>
                <input class='hiddenInput' type='hidden' name='spojnice-score'>

                <input type='submit' class='cell' name='spojnice-povratak' value='Povratak u glavni meni'>

            </form>
        </div>
    </div>
    <script src='assets/scripts/spojnice.js'></script>
</body>

</html>