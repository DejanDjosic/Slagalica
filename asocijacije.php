<?php 
include("includes/header.php");

$gameName = 'asocijacije';

if (isset($_SESSION[$gameName])) {
    echo "<script type='text/javascript'>alert('Već ste odigrali ovu igru!')</script>";
    header('Refresh: 0; URL = game-menu.php');
    exit;
}

if (isset($_POST['asocijacije-povratak']) && isset($_POST['asocijacije-score'])) {
    $_SESSION[$gameName] = $_POST['asocijacije-score'];
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
    <title>Slagalica | Asocijacije</title>
    <link rel="stylesheet" href="assets/style/main.css" />
</head>

<body>
    <div class="main flex">
        <header>
            <h1 id='slagalica-naslov'>SLAGALICA</h1>
        </header>
        <div class="wrapper">
            <div class="game-container" id='asoc-container'>
                <div class='flex-right'>
                    <div id="js-timer">
                        <div id="timer">200</div>
                    </div>
                </div>
                <div class='flex'>
                    <div class='asoc-grid'></div>
                </div>

                <div class="flex-left">
                    <form method='post'>
                        <input type='submit' class="cell giveup" name='asocijacije-odustani' value='Odustani'>
                    </form>
                    <div class='cell hidden return-modal'>Povratak u glavni meni</div>
                </div>
            </div>
            <div class="modal hidden">
                <div class="closing flex-right">
                    <button class="button-x">&times;</button>
                </div>
                <div class='headings'></div>
                <div class="link margin-auto">
                    <form method='post'>
                        <input class='hiddenInput' type='hidden' name='spojnice-score'>

                        <input type='submit' class='cell' name='spojnice-povratak' value='Povratak u glavni meni'>

                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src='assets/scripts/asocijacije.js'></script>
</body>

</html>