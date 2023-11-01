<?php
include('includes/header.php');
$gameName = 'slagalica';

if (isset($_SESSION[$gameName])) {
    echo "<script type='text/javascript'>alert('Već ste odigrali ovu igru!')</script>";
    header('Refresh: 0; URL = game-menu.php');
    exit;
}

if (isset($_POST['slagalica-povratak']) && isset($_POST['slagalica-score'])) {
    $_SESSION[$gameName] = $_POST['slagalica-score'];
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
    <title>Slagalica | Slagalica</title>
    <link rel="stylesheet" href="assets/style/main.css" />
</head>

<body>
    <div class="main flex">
        <header>
            <h1 id='slagalica-naslov'>SLAGALICA</h1>
        </header>
        <div class="wrapper">
            <div class="game-container">
                <div id="js-timer" class="flex-right">
                    <div id="timer">150</div>
                </div>
                <div class="chars flex-row">
                    <div class="charcell"></div>
                    <div class="charcell"></div>
                    <div class="charcell"></div>
                    <div class="charcell"></div>
                    <div class="charcell"></div>
                    <div class="charcell"></div>
                    <div class="chars flex-row">
                        <div class="charcell"></div>
                        <div class="charcell"></div>
                        <div class="charcell"></div>
                        <div class="charcell"></div>
                        <div class="charcell"></div>
                        <div class="charcell"></div>
                    </div>
                </div>
                <div class="flex-row">
                    <div class="display"></div>
                    <div class="flex">
                        <div class="check-word"></div>
                        <div class="check-word backspace"></div>
                    </div>
                </div>
                <div class="flex">
                    <div class="cell">Potvrdi</div>
                </div>
                <div class="flex-left">
                    <form method='post'>
                        <input type='submit' class="cell giveup" name='slagalica-odustani' value='Odustani'>

                    </form>
                </div>
            </div>
        </div>
        <div class="modal hidden">
            <div class="modal-message">
            </div>
            <form method='post'>
                <input class='hiddenInput' type='hidden' name='slagalica-score'>

                <input type='submit' class='cell' name='slagalica-povratak' value='Povratak u glavni meni'>

            </form>
        </div>
    </div>
    </div>


    <script src='assets/scripts/slagalica.js'></script>
</body>

</html>