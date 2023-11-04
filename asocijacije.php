<?php
include('includes/header.php');
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
                    <div class='cell hidden' value='Povratak u glavni meni' id='returnModal'>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src='assets/scripts/asocijacije.js'></script>
</body>

</html>