<?php include("includes/header.php");
$gameName = 'mojbroj';

if (isset($_SESSION[$gameName])) {
    echo "<script type='text/javascript'>alert('Već ste odigrali ovu igru!')</script>";
    header('Refresh: 0; URL = game-menu.php');
    exit;
}

if (isset($_POST['mojbroj-povratak']) && isset($_POST['mojbroj-score'])) {
    $_SESSION[$gameName] = $_POST['mojbroj-score'];
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
    <title>Slagalica | Moj broj</title>
    <link rel="stylesheet" href="assets/style/main.css" />
</head>

<body>
    <div class="main flex">
        <header>
            <h1 id='slagalica-naslov'>SLAGALICA</h1>
        </header>
        <div class="wrapper">
            <div class="game-container">
                <div id="js-timer">
                    <div id="timer">120</div>
                </div>
                <div class="calculator">
                    <div class="random-number">
                        <div class="numbercell game-number"></div>
                        <div class="numbercell game-number"></div>

                        <div class="numbercell game-number"></div>
                    </div>
                    <div class="allInputs">
                        <div class="input-numbers">
                            <div class="numbercell game-number"></div>
                            <div class="numbercell game-number"></div>
                            <div class="numbercell game-number"></div>
                            <div class="numbercell game-number"></div>

                            <div class="numbercell mid-game-number"></div>
                            <div class="numbercell big-game-number"></div>
                        </div>
                        <div class="operators">
                            <div class="numbercell">+</div>
                            <div class="numbercell">-</div>
                            <div class="numbercell">(</div>
                            <div class="numbercell">*</div>
                            <div class="numbercell">/</div>
                            <div class="numbercell">)</div>
                        </div>

                        <div class="display"></div>
                        <div class="btnBackspace">&larr;</div>
                        <div class='potvrdi'>
                            <div class="cell">Potvrdi</div>
                        </div>
                    </div>
                </div>
                <div class="flex-left">
                    <form method='post'>
                        <input type='submit' class="cell giveup" name='mojbroj-odustani' value='Odustani'>
                </div>
                </form>
            </div>
            <div class="modal hidden">
                <div class='flex'>
                    <div class="headings"></div>
                    <div class="link">
                        <form method='post'>
                            <input class='hiddenInput' type='hidden' name='mojbroj-score'>
                            <input type='submit' class='cell' name='mojbroj-povratak' value='Povratak u glavni meni'>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <script src="assets/scripts/mojbroj.js"></script>
</body>

</html>