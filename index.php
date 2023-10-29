<?php
include("includes/header.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  include("assets/auth/login_process.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Slagalica</title>
  <link rel="stylesheet" href="assets/style/main.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DynaPuff&family=Poppins:wght@300;600;700&display=swap" rel="stylesheet">
</head>

<body>
  <div class="main flex">
    <div class="wrapper margin25">
      <div class="game-container">
        <div class="main-menu flex">
          <?php include("assets/auth/login_index_form.php"); ?>
          <img src="assets/img/skocko.png" alt="skocko">
          <div>
            <a href="game-menu.php">
              <div class="cell" id="start">Počni igru</div>
            </a>
            <div class="cell" id="login">Prijava</div></a>
            <div class="cell" id="quit">Odustani</div></a>
          </div>
        </div>
      </div>
    </div>
    <script src="assets/scripts/main.js"></script>
</body>
</html>