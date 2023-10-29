<?php include('includes/header.php');?>
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
    <header>
      <h1 id='slagalica-naslov'>S L A G A L I C A</h1>
    </header>
    <div class="wrapper">
      <div class="game-container flex ">
       <div class="gamemgrid">
        <div class="gamesAndPoints">
          <div class="margin25">
            <div class="numbercell">0</div>
          </div>

          <a href="slagalica.php"><div class="large-cell">Slagalica</div></a>
        </div>
        <div class="gamesAndPoints">
          <div class="margin25">

            <div class="numbercell mojbroj">0</div>
          </div>

          <a href="mojbroj.php"><div class="large-cell">Moj broj</div></a>
        </div>
        <div class="gamesAndPoints">
          <div class="margin25">

            <div class="numbercell">0</div>
          </div>

          <a href="skocko.php"><div class="large-cell">Skočko</div></a>
        </div>
        <div class="gamesAndPoints">
          <div class="margin25">

            <div class="numbercell">0</div>
          </div>

          <a href="koznazna.php"><div class="large-cell">Ko zna zna</div></a>
        </div>
        <div class="gamesAndPoints">
          <div class="margin25">

            <div class="numbercell">0</div>
          </div>

          <a href="spojnice.php"><div class="large-cell">Spojnice</div></a>
        </div>
        <div class="gamesAndPoints">
          <div class="margin25">

            <div class="numbercell">0</div>
          </div>
          <a href="asocijacije.php"><div class="large-cell">Asocijacije</div></a>
        </div>

      </div>
      <div class="totalPoints">0</div>
      <div class="endButton">KRAJ</div>
      <div class='modal flex hidden'>
        <h1> Da li ste sigurni da želite da završite igru?</h1>
        <div class='flex-row'> 
        <form  method='post'> 
        <input type='hidden' name='hiddenInput' class='hiddenInput'>

          <button type='submit' class='cell btnYes' name='yes'>Da</button>
          
      </form>
        <button type='submit' class='cell btnNo'>Ne</button>
</div>
        </div>
      </div>
    </div>
  </div>
</div></body>

</html>