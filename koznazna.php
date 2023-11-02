<?php

include('includes/header.php');
$gameName = 'koznazna';

if (isset($_SESSION[$gameName])) {
    echo "<script type='text/javascript'>alert('Već ste odigrali ovu igru!')</script>";
    header('Refresh: 0; URL = game-menu.php');
    exit;
}

if (isset($_POST['koznazna-povratak']) && isset($_POST['koznazna-score'])) {
    $_SESSION[$gameName] = $_POST['koznazna-score'];
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
    <title>Slagalica | Skočko</title>
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
                    <div id="timer">20</div>
                </div>
                <div class="flex">
                    <div class="flex question-container">
                        <div class="flex question">Question</div>
                        <div class="btn-grid answer-buttons">
                            <button class="large-cell">Answer 1</button>
                            <button class="large-cell">Answer 2</button>
                            <button class="large-cell">Answer 3</button>
                            <button class="large-cell">Answer 4</button>
                        </div>
                    </div>
                </div>
                <div class='flex'>
                <form method='post'>
                    <input class='hiddenInput' type='hidden' name='koznazna-score'>
                    <input type='submit' class='submit cell hidden' name='koznazna-povratak' value='Povratak u glavni meni'>
                </form>
                </div>
                <div class="flex-left">
                    <form method='post'>
                        <input type='submit' class="cell giveup" name='koznazna-odustani' value='Odustani'>
                    </form>
                </div>
            </div>
            <script src='assets/scripts/koznazna.js'></script>
</body>

</html>