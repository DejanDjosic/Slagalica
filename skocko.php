<?php include('includes/header.php');
$gameName = 'skocko';

if (isset($_SESSION[$gameName])) {
    echo "<script type='text/javascript'>alert('Već ste odigrali ovu igru!')</script>";
    header('Refresh: 0; URL = game-menu.php');
    exit;
}

if (isset($_POST['skocko-povratak']) && isset($_POST['skocko-score'])) {
    $_SESSION[$gameName] = $_POST['skocko-score'];
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
                    <div id="timer">150</div>
                </div>
                <div class='skocko-flex'>
                    <div class='playing-rows'>
                        <div class="flex-row">
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                            <div class="skocko-cell"></div>
                        </div>
                    </div>
                    <div class="guess-rows">
                        <div class="flex-row">
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                        </div>
                        <div class="flex-row">
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                            <div class="color-cell"></div>
                        </div>
                    </div>
                </div>
                <div class="solutionslegend-flex">
                    <div class="available-solutions">
                        <div class="solution-btn background-angular" id="angular"></div>
                        <div class="solution-btn background-css" id="css"></div>
                        <div class="solution-btn background-javascript" id="javascript"></div>
                        <div class="solution-btn background-react" id="react"></div>
                    </div>
                    <div class="legend-col">
                        <div class="color-cell-small red"></div>
                        <div class="color-cell-small green"></div>
                    </div>
                    <div class="legend-col">
                        <div class="legend-paragraph">
                            <p>Pogođeni na pogrešnom mestu</p>
                        </div>

                        <div class="legend-paragraph">
                            <p>Pogođeni na pravom mestu</p>
                        </div>
                    </div>
                </div>
                <div class="flex-left">
                    <form method='post'>
                        <input type='submit' class="cell giveup" name='skocko-odustani' value='Odustani'>
                    </form>
                </div>
                <div class="modal hidden">
                    <div class='flex'>
                        <div class="flex-row ai-solution">
                            <div class='answer-cell'></div>
                            <div class='answer-cell'></div>
                            <div class='answer-cell'></div>
                            <div class='answer-cell'></div>
                        </div>
                        <h1 class="heading"></h1>
                        <div class="link">
                            <form method='post'>
                                <input class='hiddenInput' type='hidden' name='skocko-score'>
                                <input type='submit' class='cell' name='skocko-povratak' value='Povratak u glavni meni'>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src='assets/scripts/skocko.js'></script>
</body>

</html>