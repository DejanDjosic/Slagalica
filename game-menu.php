<?php include('includes/header.php');

$games = [
  'slagalica' => 0,
  'mojbroj' => 0,
  'skocko' => 0,
  'koznazna' => 0,
  'spojnice' => 0,
  'asocijacije' => 0
];


foreach ($games as $game => &$score) {
  if (isset($_SESSION[$game])) {
    $score = $_SESSION[$game];
  }
}
unset($score);

$total = array_sum($games);

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Slagalica | Meni</title>
  <link rel="stylesheet" href="assets/style/main.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DynaPuff&family=Poppins:wght@300;600;700&display=swap" rel="stylesheet">
</head>

<body>
  <div class="main flex">
    <h1 id='slagalica-naslov'>SLAGALICA</h1>
    <div class="wrapper">
      <div class="game-container flex ">
        <div class="gamemgrid">
          <div class="gamesAndPoints">
            <div class="numbercell margin25"><?php echo $games['slagalica'] ?></div>
            <a href="slagalica.php">
              <div class="large-cell">Slagalica</div>
            </a>
          </div>
          <div class="gamesAndPoints">
            <div class="numbercell margin25"><?php echo $games['mojbroj'] ?></div>
            <a href="mojbroj.php">
              <div class="large-cell">Moj broj</div>
            </a>
          </div>
          <div class="gamesAndPoints">
            <div class="numbercell margin25"><?php echo $games['skocko'] ?></div>
            <a href="skocko.php">
              <div class="large-cell">Skočko</div>
            </a>
          </div>

          <div class="gamesAndPoints">
            <div class="numbercell margin25"><?php echo $games['koznazna'] ?></div>
            <a href="koznazna.php">
              <div class="large-cell">Ko zna zna</div>
            </a>
          </div>
          <div class="gamesAndPoints">
            <div class="numbercell margin25"><?php echo $games['spojnice'] ?></div>
            <a href="spojnice.php">
              <div class="large-cell">Spojnice</div>
            </a>
          </div>
          <div class="gamesAndPoints">
            <div class="numbercell margin25"><?php echo $games['asocijacije'] ?></div>
            <a href="asocijacije.php">
              <div class="large-cell">Asocijacije</div>
            </a>
          </div>
        </div>
        <div class="totalPoints"><?php echo $total ?></div>
        <div class="btnEnd">KRAJ</div>
        <div class='modal flex hidden'>
          <h1> Da li ste sigurni da želite da završite igru?</h1>
          <div class='flex-row'>
            <form method='post'>
              <input type='hidden' name='hiddenInput' class='hiddenInput'>
              <button type='submit' class='cell btnYes' name='yes'>Da</button>
            </form>
            <button type='submit' class='cell btnNo'>Ne</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>

<script src='assets/scripts/gamemenu.js'></script>
</body>

</html>

</html>

<?php

if (isset($_POST['yes'])) {

  if (isset($_SESSION['session_id'])) {
    $userID = $_SESSION['id_korisnika'];

    function getMaxID($connection, $table, $idField)
    {
      $maxIDQuery = "SELECT MAX($idField) AS maxID FROM $table";
      $result = $connection->query($maxIDQuery);

      if (!$result) {
        die("Error: " . $connection->error);
      } else {
        $row = $result->fetch_assoc();
        return $row['maxID'] ? $row['maxID'] + 1 : 1;
      }
    }

    $partyID = getMaxID($connection, 'partija', 'partijaID');
    $roundID = getMaxID($connection, 'runda', 'rundaID');


    $partyQuery = "INSERT INTO partija (partijaID, ukupnoPoena, korisnikID,datum) 
    VALUES ('$partyID','$total','$userID','$date')";
    $resultParty = $connection->query($partyQuery);


    $gameID = 1;
    foreach ($games as $game => $score) {
      $roundQuery = "INSERT INTO runda(rundaID, korisnikID, igraID, poeni, partijaID) VALUES
      ('$roundID','$userID','$gameID','$score','$partyID')";
      $resultRound = $connection->query($roundQuery);
      $roundID++;
      $gameID++;
    }

    foreach (array_keys($games) as $game) {
      unset($_SESSION[$game]);
  }
    header('Refresh: 0; URL = index.php');
  } else {
    $_SESSION = array();
    session_destroy();
    header('Refresh: 0; URL = index.php');
  }
}
?>